import { Router } from "express";
import { getUser } from "../controllers/userController";

const router = Router();

// Route này sẽ được truy cập qua /api/users/:id
router.get("/:id", getUser); // Không cần "/users" nữa vì đã có /api/users ở app.ts

export default router;
