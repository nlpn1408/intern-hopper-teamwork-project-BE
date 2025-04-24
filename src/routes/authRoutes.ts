import Router from 'express';
const router = Router();
import UserController from '../controllers/authController';
router.post('/register', UserController.createUser);
export default router;