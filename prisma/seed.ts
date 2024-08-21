import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const root = await prisma.usuario.upsert({
    where: { login: 'x392687' },
    create: {
      login: 'x392687',
      nome: 'Marcus Nastasi',
      email: 'mvnastasi@prefeitura.sp.gov.br',
      status: 1,
      permissao: 'DEV',
    },
    update: {
      login: 'x392687',
      nome: 'Marcus Nastasi',
      email: 'mvnastasi@prefeitura.sp.gov.br',
      status: 1,
      permissao: 'DEV',
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
