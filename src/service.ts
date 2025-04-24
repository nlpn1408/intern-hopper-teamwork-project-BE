import express, { Request, Response } from 'express';
import prisma from './config/database';
import userRouter from './routes/authRoutes';


const app: express.Application = express();
const port: number = Number(process.env.PORT) || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
app.use('/api/auth', userRouter);
app.get('/get_users', async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({
      message: "Lấy toàn bộ user thành công",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy danh sách user",
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
}).on('error', (err: any) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} đã được sử dụng. Vui lòng chọn cổng khác hoặc tắt tiến trình chiếm cổng.`);
    process.exit(1);
  }
});
export default app;
