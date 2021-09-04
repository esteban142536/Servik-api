import { PrismaClient } from "@prisma/client";
import { makeSchema, objectType, extendType, nonNull, stringArg } from "nexus";
import { NexusNonNullDef } from "nexus/dist/core";
const { user } = new PrismaClient();

const loginResolvers = {
  type: "Mutation",
  definition(t: {
    field: (
      arg0: string,
      arg1: {
        type: string;
        args: { email: NexusNonNullDef<any>; password: NexusNonNullDef<any> };
        resolve(
          _root: any,
          { email, password }: { email: any; password: any },
          ctx: any
        ): any;
      }
    ) => void;
  }) {
    t.field("login", {
      type: "User",
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(_root: any, { email, password }: any, ctx: any) {
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
      },
    });
  },
};

export default loginResolvers;
