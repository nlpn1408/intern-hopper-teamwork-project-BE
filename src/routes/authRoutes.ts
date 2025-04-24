import { Router } from "express";
import { loginController } from "../controllers/authController";

const authRoute: Router = Router()

authRoute.post('/auth/login', loginController)

export default authRoute