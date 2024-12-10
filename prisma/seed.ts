import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs';  // Changed from bcrypt to bcryptjs

const prisma = new PrismaClient();

async function hashPassword(password: string): Promise<string> {
  const salt = await bcryptjs.genSalt(10);
  return bcryptjs.hash(password, salt);
}

async function main() {
  // Create admin accounts
  const adminPassword = await hashPassword('admin');
  
  for (let i = 1; i <= 10; i++) {
    await prisma.user.upsert({
      where: { email: `admin${i}@smkpedan.com` },
      update: {},
      create: {
        email: `admin${i}@smkpedan.com`,
        name: `Admin ${i}`,
        password: adminPassword,
        role: 'ADMIN'  // Make sure this matches your enum
      }
    });
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
  