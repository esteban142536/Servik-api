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

const Contact = objectType({
    name: "Contact",
    definition(t) {
      t.nonNull.id("id");
      t.nonNull.int("number");
      t.nonNull.string("ext");
      t.string("userId");
      
      t.field("User", {
        type: "User",
        resolve: (contact) =>
          prisma.user.findUnique({
            where: { id: contact.userId || undefined },
          }),
      });
    },
  });

  export default Contact;