import { PrismaClient } from "@prisma/client";
import {
  makeSchema,
  objectType,
  extendType,
  nonNull,
  stringArg,
  nullable,
} from "nexus";
import { intArg, NexusNonNullDef, NexusNullDef } from "nexus/dist/core";
const { analityc } = new PrismaClient();

const updateAnalityc = {
  type: "Mutation",
  definition(t: {
    field: (
      arg0: string,
      arg1: {
        type: string;
        args: {
          serviseID: NexusNonNullDef<any>;
          Clicks: NexusNullDef<any>;
          contact: NexusNullDef<any>;
          reports: NexusNullDef<any>;
        };
        resolve(
          _root: any,
          {
            serviseID,
            Clicks,
            contact,
            reports,
          }: { serviseID: any; Clicks: any; contact: any; reports: any },
          ctx: any
        ): any;
      }
    ) => void;
  }) {
    t.field("updateAnalityc", {
      type: "Analityc",
      args: {
        serviseID: nonNull(stringArg()),
        Clicks: nullable(intArg()),
        contact: nullable(intArg()),
        reports: nullable(intArg()),
      },
      async resolve(
        _root: any,
        { serviseID, Clicks, contact, reports }: any,
        ctx: any
      ) {
        const update = await analityc
          .update({
            where: { id: serviseID },
            data: {
              Clicks: +Clicks,
              Contacts: +contact,
              reports: +reports, //do ++(add 1 by 1) to everything
              Views:+1
            },
          })
          .catch(console.log);


        return update;
      },
    });
  },
};
export default updateAnalityc;