import { log } from "console";
import { Request, Response } from "express";
import { loginService } from "../service/authService";

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
