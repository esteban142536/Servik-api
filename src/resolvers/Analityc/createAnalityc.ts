import { PrismaClient } from "@prisma/client";
import {
  makeSchema,
  objectType,
  extendType,
  nonNull,
  stringArg,
  nullable,
} from "nexus";
import { NexusNonNullDef, NexusNullDef } from "nexus/dist/core";
const { analityc } = new PrismaClient();

const createAnalityc = {
  type: "Mutation",
  definition(t: {
    field: (
      arg0: string,
      arg1: {
        type: string;
        args: {
          id: NexusNonNullDef<any>;
        };
        resolve(_root: any, { id }: any, ctx: any): any;
      }
    ) => void;
  }) {
    t.field("createAnalityc", {
      type: "Analityc",
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_root: any, { id: serviseID }: any, ctx: any) {
        //receive a direct String, in theory, analytics are only created once the service is created
        const createAnalityc = await analityc
          .create({
            data: {
              ServiseID: serviseID,
              Clicks: 0,
              Contacts: 0,
              Views: 0,
              reports: 0,
            },
          })
          .catch(console.log);

        return createAnalityc;
      },
    });
  },
};

export default createAnalityc;
