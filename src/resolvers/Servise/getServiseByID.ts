import { PrismaClient } from "@prisma/client";
import { exception } from "console";
const { servise } = new PrismaClient();

const getServiseId = async (_: any, { id }: any, context: any) => {
  const seachServise = await servise.findUnique({
    where: {
      id:id
    },
  });

  return seachServise;
};

export default getServiseId;