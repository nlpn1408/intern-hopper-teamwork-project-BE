import { Router } from 'express';
import userController from '../controllers/user.controller';
const router = Router();
router.get('/', userController.getAllUsers);     
router.delete('/users/:id', userController.deleteUser); 
router.get("/:id",  userController.getUser); 
router.put('/users/:id', userController.updateUser);
export default router;
