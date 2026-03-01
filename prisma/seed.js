const { PrismaClient, UserStatus } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    const password = await bcrypt.hash("password123", 10);

    const users = [
        { email: "admin@clns.com", name: "Admin User", role: "ADMIN", status: "ACTIVE" },
        { email: "advocate@clns.com", name: "Advocate User", role: "ADVOCATE", status: "VERIFIED" },
        { email: "client@clns.com", name: "Client User", role: "CLIENT", status: "ACTIVE" },
        { email: "student@clns.com", name: "Student User", role: "STUDENT", status: "ACTIVE" },
    ];

    for (const user of users) {
        await prisma.user.upsert({
            where: { email: user.email },
            update: {
                password: password,
                status: user.status || "PENDING",
                role: user.role,
            },
            create: {
                email: user.email,
                name: user.name,
                password: password,
                role: user.role,
                status: user.status || "PENDING",
            },
        });
        console.log(`Initialized user: ${user.email}`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
