import express, { json, Request, Response } from "express";
import prisma from "./config/database";
import authRoute from "./routes/authRoutes";

const app: express.Application = express();
const port: number = 3001;
const refix: string = String(process.env.PREFIX);
app.use(json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/get_users", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.status(200).json({
    message: "Lấy toàn bộ user thành công",
    data: users,
  });
});

app.use(refix, authRoute);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
