const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const db = new PrismaClient();

async function test() {
    try {
        const hash = await bcrypt.hash('test123456', 10);
        const user = await db.user.create({
            data: {
                email: 'directtest777@test.com',
                name: 'Direct Test',
                password: hash,
                role: 'CLIENT',
            }
        });
        console.log('USER CREATED OK:', user.id);
        await db.systemLog.create({ data: { action: 'TEST', description: 'test', userId: user.id } });
        console.log('LOG CREATED OK');
    } catch (e) {
        console.error('ERROR:', e.message);
        console.error('CODE:', e.code);
        console.error('META:', JSON.stringify(e.meta));
    } finally {
        await db.$disconnect();
    }
}
test();
