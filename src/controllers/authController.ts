import { log } from "console";
import { Request, Response } from "express";
import { loginService } from "../service/authService";

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const isLogin = await loginService(email, password);
  if (isLogin) {
    res.status(200).json({
      message: "login thành công",
      data: {
        email,
        password,
      },
    });
  } else {
    res.status(200).json({
      message: "Email/Pasword không đúng ",
    });
  }
  log(email, password);
};
