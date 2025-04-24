import { z } from 'zod';

export const CreateUserSchema = z.object({
  email: z.string().email({ message: "Email không hợp lệ" }),
  password: z
      .string()
      .min(8)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
        'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số',
      ),
  username: z.string().min(2, { message: "Tên người dùng quá ngắn" }),
});

export type CreateUserInput = z.infer<typeof CreateUserSchema>;