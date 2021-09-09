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
import User from "../schema/user";
import Contact from "../schema/contact";

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

  const CreateContactInput = inputObjectType({
    name: "CreateContactInput",
    definition(t) {
      t.nonNull.int("number");
      t.nonNull.string("ext");
      t.nonNull.string("userId");
    },
  });

  export default CreateContactInput