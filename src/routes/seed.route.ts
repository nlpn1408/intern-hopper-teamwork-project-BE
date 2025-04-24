import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.post('/seed', async (req, res) => {
  try {
    
    await prisma.role.createMany({
      data: [
        { name: 'USER', description: 'Regular user role' },
        { name: 'ADMIN', description: 'Administrator role' }
      ],
      skipDuplicates: true,
    });

    res.status(200).json({ message: 'Seed thành công!' });
  } catch (error) {
    res.status(500).json({ message: 'Seed thất bại', error });
  }
});

export default router;
