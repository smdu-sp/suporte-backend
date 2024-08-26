import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const root = await prisma.usuario.upsert({
    where: { login: 'd927014' },
    create: {
      login: 'd927014',
      nome: 'Victor Alexander Menezes de Abreu',
      email: 'vmabreu@prefeitura.sp.gov.br',
      status: 1,
      dev: true,
    },
    update: {
      login: 'd927014',
      nome: 'Victor Alexander Menezes de Abreu',
      email: 'vmabreu@prefeitura.sp.gov.br',
      status: 1,
      dev: true,
    },
  });
  console.log(root);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
