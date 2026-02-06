const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding...");
  
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Ernesto (Utente)
  const mario = await prisma.user.upsert({
    where: { email: 'ernesto@test.com' },
    update: {},
    create: {
      email: 'ernesto@test.com',
      name: 'Ernesto Guevara',
      password: hashedPassword,
      role: 'USER',
    },
  });

  // Fidel (Operatore)
  const luigi = await prisma.user.upsert({
    where: { email: 'fidel@test.com' },
    update: {},
    create: {
      email: 'fidel@test.com',
      name: 'Fidel Castro',
      password: hashedPassword,
      role: 'OPERATOR',
    },
  });
  
  console.log("Seeding completato.");
  console.log("   ernesto@test.com");
  console.log("   fidel@test.com");
  console.log("   Password:  password123");
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
