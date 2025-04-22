import express, { Request, Response } from 'express';

const app: express.Application = express();
const port: number = 3001;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});