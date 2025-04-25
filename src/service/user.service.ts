import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllUsers = async () => {
  return prisma.user.findMany({
    where: { deleted: false },
    select: {
      id: true,
      username: true,
      email: true,
      role_id: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const deleteUserById = async (id: string): Promise<boolean> => {
  const user = await prisma.user.findUnique({ where: { id: Number(id) } });

  if (!user || user.deleted) return false;

  await prisma.user.update({
    where: { id: Number(id) },
    data: {
      deleted: true,
      updatedAt: new Date(),
    },
  });

  return true;
};

export const getUserById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      email: true,
      role: true, 
    },
  });

  if (!user) return null;

  return user; 
};

export default {
  deleteUserById,
  getAllUsers,
  getUserById,
};
