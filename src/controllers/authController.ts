import { log } from "console";
import { Request, Response } from "express";
import { loginService } from "../service/authService";
import UserService from '../service/authService';
import prisma from '../config/database';
import { CreateUserSchema } from "../validations/user.validation";
export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const accessToken = await loginService(email, password);
  if (accessToken) {
    res.status(200).json({
      message: "login thành công",
      data: {
        accessToken
      },
    });
  } else {
    res.status(200).json({
      message: "Email/Pasword không đúng ",
    });
  }
};
export const createUser = async (req: Request, res: Response)=> {
    try {
      const parsed = CreateUserSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          message: 'Dữ liệu không hợp lệ',
          errors: parsed.error.flatten().fieldErrors,
        });
      }
      const { email, password, username } = parsed.data;
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(409).json({
          message: 'Email đã được sử dụng',
        });
      }
      const role = await prisma.role.findUnique({
        where: { name: 'USER' },
      });
      if (!role) {
        return res.status(400).json({
          message: 'Không tìm thấy role USER',
        });
      }
      const newUser = await UserService.create(email, password, username, role);
      return res.status(201).json({
        message: 'Tạo tài khoản thành công',
        data: newUser,
      });
    } catch (error: any) {
      console.error('Lỗi khi tạo user:', error);
      return res.status(500).json({
        message: 'Tạo tài khoản thất bại',
        error: error?.message || 'Unknown error',
      });
    }
  }
export default {
  createUser,
};
