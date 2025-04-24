import { user } from "@prisma/client";
import prisma from "../config/database";
import bcrypt from "bcryptjs"
import { log } from "console";
const apikey = process.env.APIKEY
const jwtExpire = process.env.JWT_EXPIRE
const jwt = require("jsonwebtoken")
import { PrismaClient } from '@prisma/client';
export const loginService = async (email: string, password: string) => {
  try {
    const userLogin = await prisma.user.findUnique({
      where: {
        email: email
      },
    });
    if (!userLogin) {
      return null;
    }

    const isLogin:boolean = await bcrypt.compare(password, userLogin.password)
    if (isLogin) {
      const payload = {
        email,
        username: userLogin.username,
      }
      const accessToken = jwt.sign(payload, apikey, { expiresIn:jwtExpire })
      return accessToken
    }
  } catch (error) {
    throw error
  }
};

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