import { PrismaClient } from '@prisma/client';
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

export const create = async (email: string, password: string, username: string, role: { id: number } ) => {
        const user = await prisma.user.findUnique({
            where: { email: email }
        });
        const hashedPassword = await bcrypt.hash(password, 12);
        const newuser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                username,
                role_id: role.id,
            }
        })
        return newuser;
    }


export default {
    create,
    };