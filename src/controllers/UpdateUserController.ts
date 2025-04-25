import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

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
