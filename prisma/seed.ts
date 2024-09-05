import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const root = await prisma.usuario.upsert({
    where: { login: 'x398900' },
    create: {
      login: 'x398900',
      nome: 'Gustavo Mendes de Lima',
      email: 'gmlima@prefeitura.sp.gov.br',
      status: 1,
      dev: true,
      avatar: 'https://github.com/github.png',
    },
    update: {
      login: 'x398900',
      nome: 'Gustavo Mendes de Lima',
      email: 'gmlima@prefeitura.sp.gov.br',
      status: 1,
      dev: true,
      avatar: 'https://github.com/github.png',
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
