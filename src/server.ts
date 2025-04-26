import express, { json, Request, Response } from "express";
import prisma from "./config/database";
import authRoute from "./routes/authRoutes";
import authMiddleware from "./middlewares/auth.middleware";
import userRouter from './routes/user.routes';
import authRouter from './routes/authRoutes';
import cors from "./middlewares/cors";
import logger from "./middlewares/logger";

const app: express.Application = express();
const port: number = 3001;
const prefix: string = String(process.env.PREFIX);
app.use(json());
app.use(cors);
app.use(logger);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
app.use('/api', userRouter);
app.use('/api/auth', authRoute);
app.get("/get_users", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.status(200).json({
    message: "Lấy toàn bộ user thành công",
    data: users,
  });
});

app.use(prefix, authRoute);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
}).on('error', (err: any) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} đã được sử dụng. Vui lòng chọn cổng khác hoặc tắt tiến trình chiếm cổng.`);
    process.exit(1);
  }
});
