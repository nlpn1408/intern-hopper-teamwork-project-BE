jest.setTimeout(20000);
import request from 'supertest';

import { PrismaClient } from '@prisma/client';
import app from '../service';

const prisma = new PrismaClient();
beforeAll(async () => {
  await prisma.user.deleteMany(); 
});
afterAll(async () => {
  await prisma.$disconnect();
});

describe('POST /api/auth/register', () => {
    it('should register user successfully', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'nguyengocmy123test@example.com',
          password: 'Test1311@@@@',
          username: 'nguyenngocmy1311'
        });
  
      console.log('REGISTER RESPONSE:', res.body); 
  
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('message', 'Tạo tài khoản thành công');
    });
  
    
  });