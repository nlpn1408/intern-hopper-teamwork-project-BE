import { Request, Response } from 'express';
import userService from '../service/user.service';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();


export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    return res.json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deleted = await userService.deleteUserById(id);

    if (!deleted) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
        message: "Xóa user thành công",
      });  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: "Invalid user ID" });

  const user = await userService.getUserById(id);
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json(user); // Trả ra: { id, name, email, role }
};

export const updateUser = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  const { username, email, role_id, updatedBy, password } = req.body;

  // Kiểm tra dữ liệu đầu vào
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Cập nhật thông tin người dùng
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        email,
        username,
        password: hashedPassword, 
        role_id,
        updatedAt: new Date(),
        updatedBy: updatedBy || null,
      },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await prisma.$disconnect(); // Đảm bảo đóng kết nối Prisma
  }
};

export default {
    deleteUser,getAllUsers, getUser, updateUser
  };