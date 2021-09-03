import { PrismaClient } from "@prisma/client";
const { servise } = new PrismaClient();

const seachServise = async (_: any, { seach, category }: any, context: any) => {
  const seachServise = await servise.findMany({
    where: {
      content: {
        contains: seach,
      },
      category: category,
    },
  });

  return seachServise;
};

export default seachServise;
