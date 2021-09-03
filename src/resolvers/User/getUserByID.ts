import { PrismaClient } from "@prisma/client";
const { user } = new PrismaClient();

const loginResolvers = async (
  _: any,
  { id }: any,
  context: any
) => {
  const GetUserById = await user
    .findUnique({
      where: {
        id:id
      },
    })
    .catch(console.log);

  if (!GetUserById) throw new Error("NO_USER");

  return GetUserById;
};

export default loginResolvers;