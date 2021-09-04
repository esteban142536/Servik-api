import { PrismaClient } from "@prisma/client";
import createAnalityc from "../Analityc/createAnalityc";
import { makeSchema, objectType, extendType, nonNull, stringArg } from "nexus";
import { floatArg, NexusNonNullDef } from "nexus/dist/core";
const { servise } = new PrismaClient();

const addServise = {
  type: "Mutation",
  definition(t: {
    field: (
      arg0: string,
      arg1: {
        type: string;
        args: {
          servitorID: NexusNonNullDef<any>;
          title: NexusNonNullDef<any>;
          content: NexusNonNullDef<any>;
          category: NexusNonNullDef<any>;
          location: NexusNonNullDef<any>;
        };
        resolve(
          _root: any,
          {
            servitorID,
            title,
            content,
            category,
            location,
          }: {
            servitorID: any;
            title: any;
            content: any;
            category: any;
            location: any;
          },
          ctx: any
        ): any;
      }
    ) => void;
  }) {
    t.field("addServise", {
      type: "Servise",
      args: {
        servitorID: nonNull(stringArg()),
        title: nonNull(stringArg()),
        content: nonNull(stringArg()),
        category: nonNull(stringArg()),
        location: nonNull(floatArg()),
      },
      async resolve(
        _root: any,
        { servitorID, title, content, category, location }: any,
        ctx: any
      ) {
        const addServise = await servise
          .create({
            data: {
              servitorID: servitorID,
              title: title,
              content: content,
              category: category,
              Reviews: 0,
              location: location,
            },
          })
          .catch(console.log);

        return addServise;
      },
    });
  },
};

export default addServise;
