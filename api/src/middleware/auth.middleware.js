import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants/constants.js";

export default (req, res, next) => {
    const token = req.headers.access_token;
    if(!token) return res.status(401).send();

    try {
        const decoded = jwt.verify(token , JWT_SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(401).json({
            success : false,
            message : "Token expired"
        });
    }
    return next();
}