import { Router } from 'express';
import userController from '../controllers/user.controller';
const router = Router();
router.get('/getall', userController.getAllUsers);     
router.delete('/delete/:id', userController.deleteUser); 
router.get("/:id",  userController.getUser); 
router.put('/update/:id', userController.updateUser);
export default router;
