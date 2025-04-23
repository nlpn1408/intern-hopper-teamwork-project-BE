Các bước cài đặt: (chế độ development)
1. clone code
2. cài đặt thư viện: npm i
3. Update file .env (nếu cần thiết)
4. Chạy dự án: npm run dev

tạo table trong db 
    npx prisma migrate dev --name init
tạo prisma client 
    npx prisma generate
chạy localhost prisma (Giao diện quản lý database)
    npx prisma studio

