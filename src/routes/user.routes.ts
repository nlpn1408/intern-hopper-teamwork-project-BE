import Router from 'express';
const router = Router();
import UserController from '../controllers/user.controller';
router.post('/register', UserController.createUser); 
export default router;