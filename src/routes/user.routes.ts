import { Router } from 'express';
import userController from '../controllers/user.controller';

const router = Router();

router.get('/', userController.getAllUsers);    
router.delete('/users/:id', userController.deleteUser); 

export default router;
