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

const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.string("email");
    t.nonNull.string("name");
    t.nonNull.string("password");
    t.list.field("Contacts", {
      type: "Contact",
      resolve: (user) =>
        prisma.user
          .findUnique({
            where: { id: user.id || undefined },
          })
          .contacts(),
    });
    t.field("services", {
      type: list("Service"),
      resolve: (user) =>
        prisma.user
          .findUnique({
            where: { id: user.id || undefined },
          }).services(),
    });
    
  },
});

export default User;
