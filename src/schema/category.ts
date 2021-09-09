import { ApolloServer, gql } from "apollo-server";
import { PrismaClient } from "@prisma/client";
import {
  inputObjectType,
  list,
  makeSchema,
  mutationType,
  nonNull,
  objectType,
  queryType,
} from "nexus";
import { join } from "path";

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

const Category = objectType({
  name: "Category",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.string("name");
    t.string("description");

    t.field("service", {
      type: list("Service"),
      resolve: (category) =>
        prisma.category
          .findUnique({
            where: { id: category.id }
          })
          .service(),
    });
  },
});

export default Category;
