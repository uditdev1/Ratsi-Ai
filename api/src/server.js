import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user/user.routes.js";
import tutorRoutes from "./routes/tutor/tutor.routes.js";
import solveRoutes from "./routes/tutor/solve.routes.js";
import authMiddleware from "./middleware/auth.middleware.js";

dotenv.config();

const app = express();
app.use(cors({credentials: true , origin: '*'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/" , (req, res) => {
    res.status(200).json({
        "success" : "true",
        "data" : "endpoint working"
    })
})

app.use("/users", userRoutes);
app.use("/tutor", authMiddleware , tutorRoutes);
app.use("/solve", authMiddleware , solveRoutes);

app.listen(8000, () => {
    console.log("Server running on 8000");
});

export default app;