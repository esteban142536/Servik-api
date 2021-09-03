import { PrismaClient } from "@prisma/client";
const { analityc } = new PrismaClient();

const updateAnalityc = async (_: any, {serviseID,Clicks,contact,reports}: any, context: any) => {

  const update = await analityc
    .update({
        where:{id:serviseID},
        data:{
            Clicks:Clicks,
            Contacts:contact,
            reports:reports,//do ++(add 1 by 1) to views
        }
    }).catch(console.log);

  return update;
};

export default updateAnalityc;
