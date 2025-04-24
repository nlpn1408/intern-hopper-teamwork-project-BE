
import bcrypt from 'bcryptjs';
import prisma from './../src/config/database';
import ROLE from './../src/enum/ROLE';
async function seed() {
    try {
        // Thêm role "USER"
        const userRole = await prisma.role.upsert({
            where: { name: 'USER' },
            update: {},
            create: {
                name: ROLE.USER,
                description: 'Default user role'
            }
        });
        /// thêm role "ADMIN"
        const adminRole = await prisma.role.upsert({
            where: { name: 'ADMIN' },
            update: {},
            create: {
                name: ROLE.ADMIN,
                description: 'Default admin role'
            }
        });
        console.log('Seeded role: ', userRole , " and ", adminRole);
        const hashPasswordUser1:string = await bcrypt.hash('cang123', 12)
        const hashPasswordUser2:string = await bcrypt.hash('cang1234', 12)
        const user1 = await prisma.user.upsert({
            where: { email: 'cang@example.com' },
            update: {},
            create: {
                username: 'Ngô Tấn Cang',
                email: 'cangngoo123@gmail.com',
                password: hashPasswordUser1,
                role_id: userRole.id,
                createdAt: new Date(),
                updatedAt: new Date(),
                deleted: false
            }
        });

        const user2 = await prisma.user.upsert({
            where: { email: 'cang@example.com' },
            update: {},
            create: {
                username: 'Ngô Tấn Cang 1',
                email: 'cangngoo1234@gmail.com',
                password: hashPasswordUser2,
                role_id: userRole.id,
                createdAt: new Date(),
                updatedAt: new Date(),
                deleted: false
            }
        });
        console.log('Seeded user: ', user1, " and " , user2);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

seed();