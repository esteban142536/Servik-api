import { PrismaClient } from "@prisma/client";
const { analityc } = new PrismaClient();

const createAnalityc = async (_: any, args: any, context: any) => {
  //receive a direct String, in theory, analytics are only created once the service is created
  const createAnalityc = await analityc
    .create({
      data: {
        ServiseID: args,
        Clicks: 0,
        Contacts: 0,
        Views: 0,
        reports: 0,
      },
    })
    .catch(console.log);

  return createAnalityc;
};

export default createAnalityc;
