import { Request, Response } from 'express';
import userService from '../service/user.service';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const users = await userService.getAllUsers(skip, limit);
    const totalUsers = await userService.countUsers(); 

    return res.json({
      data: users,
      pagination: {
        total: totalUsers,
        page,
        limit,
        totalPages: Math.ceil(totalUsers / limit),
      },
    });
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

  res.json(user); 
};

export const updateUser = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  const { username, email, role_id, updatedBy, password } = req.body;
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
    await prisma.$disconnect(); 
  }
};

export default {
    deleteUser,getAllUsers, getUser, updateUser
  };