import { Router } from "express";
import { loginController } from "../controllers/authController";
import UserController from '../controllers/authController';
import authMiddleware from "../middlewares/auth.middleware";
const authRoute: Router = Router()
authRoute.post('/auth/login', loginController)
authRoute.post('/register', UserController.createUser);
export default authRoute
