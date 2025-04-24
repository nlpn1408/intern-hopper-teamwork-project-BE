import { user } from "@prisma/client";
import prisma from "../config/database";
import bcrypt from "bcryptjs"
const jwt = require("jsonwebtoken")
import { log } from "console";
const apikey = process.env.APIKEY
const jwtExpire = process.env.JWT_EXPIRE

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
