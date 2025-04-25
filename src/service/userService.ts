import prisma from "../config/prisma";

// Lấy chi tiết người dùng theo ID
export const getUserById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      email: true,
      role: true, // Lấy luôn role (kiểu enum)
    },
  });

  if (!user) return null;

  return user; // Trả về chỉ thông tin người dùng mà không có trường giả
};
