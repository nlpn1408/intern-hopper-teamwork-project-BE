import { Router } from 'express';
import userController from '../controllers/user.controller';

const router = Router();

router.get('/', userController.getAllUsers);     // GET danh sách
router.delete('/users/:id', userController.deleteUser); // DELETE theo id

export default router;
