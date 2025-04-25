import express from 'express';
import { updateUser } from '../controllers/UpdateUserController';

const router = express.Router();

// Route cập nhật người dùng
router.put('/users/:id', updateUser); // PUT /user/:id

export default router;
