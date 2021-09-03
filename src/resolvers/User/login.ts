import { PrismaClient } from "@prisma/client";
const { user } = new PrismaClient();

const loginResolvers = async (
  _: any,
  { email, password }: any,
  context: any
) => {
  const userLog = await user
    .findFirst({
      where: {
        email: email,
        AND: [{ password: password }],
      },
    })
    .catch(console.log);

  if (!userLog) throw new Error("INVALID_EMAIL");

  return userLog;
};

export default loginResolvers;
