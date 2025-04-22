import { Router } from "express";
import { jwtDecode } from "jwt-decode";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { JWT_SECRET } from "../../constants/constants.js";

const userRoutes = Router();
const prisma = new PrismaClient();

userRoutes.post("/signin", async (req, res) => {
    try {
        const { token } = req.body;
        const decodedData = jwtDecode(token.credential);
        const { email , name } = decodedData;

        let user = await prisma.user.findUnique({
            where: { email }
        });
        if(!user) {
            user = await prisma.user.create({
                data : {
                    email , 
                    name
                }
            })
        }
        const curr_token = jwt.sign(
            { 
                id : user.id
            }, 
            JWT_SECRET,
            {
                expiresIn : '12h'
            }
        );

        res.status(200).json({
            success : true,
            token : curr_token , 
            email : user.email
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message});
    }
});

userRoutes.post("/verify", (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(400).json({ success: false, error: "Token is required" });
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        res.status(200).json({
            success: true,
            user: decoded
        });
    } catch (err) {
        console.error("JWT Verification Error:", err.message);
        res.status(401).json({ 
            success: false,
            error: "Invalid or expired token"
        });
    }
});

export default userRoutes;