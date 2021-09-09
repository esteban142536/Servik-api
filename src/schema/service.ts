import { ApolloServer, gql } from "apollo-server";
import { PrismaClient } from "@prisma/client";
import {
  inputObjectType,
  makeSchema,
  mutationType,
  nonNull,
  objectType,
  queryType,
} from "nexus";
import { join } from "path";

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

const Service = objectType({
    name: "Service",
    definition(t) {
      t.nonNull.id("id");
      t.nonNull.string("title");
      t.nonNull.string("content");
      t.nonNull.float("reviews");
      t.nonNull.boolean("isValid");
      t.nonNull.float("location");

      t.string("servitorId");
      t.field("servitor", {
        type: "User",
        resolve: (service) =>
          prisma.user
            .findUnique({
              where: { id: service.servitorId || undefined },
            }),
      });

      t.string("categoryId");
      t.field("category", {
        type: "Category",
        resolve: (service) =>
          prisma.category
            .findUnique({
              where: { id: service.categoryId || undefined },
            }),
      });
    },
  });

  export default Service;