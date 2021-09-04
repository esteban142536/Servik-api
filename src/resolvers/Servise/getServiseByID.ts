import { PrismaClient } from "@prisma/client";
import { makeSchema, objectType, extendType, nonNull, stringArg } from "nexus";
import { NexusNonNullDef } from "nexus/dist/core";
const { servise } = new PrismaClient();

const getServiseId = {
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
    t.field("getServiseId", {
      type: "Servise",
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_root: any, { id }: any, ctx: any) {
        const getServise = await servise.findUnique({
          where: {
            id: id,
          },
        });

        return getServise;
      },
    });
  },
};

export default getServiseId;
