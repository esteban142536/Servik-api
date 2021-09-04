import { PrismaClient } from "@prisma/client";
const { servise } = new PrismaClient();
import {
  makeSchema,
  objectType,
  extendType,
  nonNull,
  stringArg,
  nullable,
} from "nexus";
import { NexusNonNullDef, NexusNullDef } from "nexus/dist/core";

const seachServise = {
  type: "Mutation",
  definition(t: {
    field: (
      arg0: string,
      arg1: {
        type: string;
        args: { seach: NexusNonNullDef<any>; category: NexusNullDef<any> };
        resolve(
          _root: any,
          { seach, category }: { seach: any; category: any },
          ctx: any
        ): any;
      }
    ) => void;
  }) {
    t.field("seachServise", {
      type: "Servise",
      args: {
        seach: nonNull(stringArg()),
        category: nullable(stringArg()),
      },
      async resolve(_root: any, { seach, category }: any, ctx: any) {
        const dataServise = await servise.findMany({
          where: {
            content: {
              contains: seach,
            },
            category: category,
          },
        }).catch(console.log);
        return dataServise;
      },
    });
  },
};


export default seachServise;
