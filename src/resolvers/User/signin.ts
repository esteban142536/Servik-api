import { PrismaClient } from "@prisma/client";
const { user } = new PrismaClient();

const signInResolvers = async (
  _: any,
  { email, contact, name, password }: any,
  context: any
) => {
  const userSign = await user
    .create({
      data: {
        email: email,
        contact: contact,
        name: name,
        password: password,
      },
    })
    .catch(console.log);

  return userSign;
};

export default signInResolvers;
