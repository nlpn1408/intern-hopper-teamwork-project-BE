import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import * as userService from "../service/userService";

// Lấy chi tiết user
export const getUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: "Invalid user ID" });

  const user = await userService.getUserById(id);
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json(user); // Trả ra: { id, name, email, role }
};


