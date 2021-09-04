import { PrismaClient } from "@prisma/client";
import { nonNull, stringArg, intArg } from "nexus";
import { NexusNonNullDef } from "nexus/dist/core";
const { user } = new PrismaClient();

const signInResolvers = {
  type: "Mutation",
  definition(t: {
    field: (
      arg0: string,
      arg1: {
        type: string;
        args: {
          email: NexusNonNullDef<any>;
          password: NexusNonNullDef<any>;
          contact: NexusNonNullDef<any>;
          name: NexusNonNullDef<any>;
        };
        resolve(
          _root: any,
          {
            email,
            password,
            contact,
            name,
          }: { email: any; password: any; contact: any; name: any },
          ctx: any
        ): any;
      }
    ) => void;
  }) {
    t.field("signin", {
      type: "User",
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
        contact: nonNull(intArg()),
        name: nonNull(stringArg()),
      },
      async resolve(
        _root: any,
        { email, contact, name, password }: any,
        context: any
      ) {
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
      },
    });
  },
};

export default signInResolvers;
