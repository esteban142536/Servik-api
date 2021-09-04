import { PrismaClient } from "@prisma/client";
import { nonNull, stringArg, intArg } from "nexus";
import { NexusNonNullDef } from "nexus/dist/core";
const { user } = new PrismaClient();

const loginResolvers = {
  type: "Mutation",
  definition(t: {
    field: (
      arg0: string,
      arg1: {
        type: string;
        args: { id: NexusNonNullDef<any> };
        resolve(_root: any, { id }: { id: any }, ctx: any): any;
      }
    ) => void;
  }) {
    t.field("getUserByID", {
      type: "User",
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_root: any, { id }: any, ctx: any) {
        const GetUserById = await user
          .findUnique({
            where: {
              id: id,
            },
          })
          .catch(console.log);

        if (!GetUserById) throw new Error("NO_USER");

        return GetUserById;
      },
    });
  },
};

export default loginResolvers;
