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
import Mutations from "./resolvers/mutations";
import CreateContactInput from "./schema/CreateContactInput";
import CreateUserInput from "./schema/CreateUserInput";
import CreateServiceInput from "./schema/CreateServiseInput";
import CreateCategoryInput from "./schema/CreateCategoryInput";
import getUserInput from "./schema/getUserInput";
import seachServiseInput from "./schema/seachServiseInput";
import Contact from "./schema/contact";
import User from "./schema/user";
import Service from "./schema/service";
import Category from "./schema/category";
import getServiseIdInput from "./schema/getServiseIdInput";
import getCategoryIdInput from "./schema/getCategoryIdInput";

//const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });
const prisma = new PrismaClient();

const Query = queryType({
  definition(t) {
    t.nonNull.list.field("users", {
      type: nonNull(User),
      resolve: () => prisma.user.findMany(),
    });
    t.nonNull.list.field("contacts", {
      type: nonNull(Contact),
      resolve: () => prisma.contact.findMany(),
    });
    t.nonNull.list.field("services", {
        type: nonNull(Service),
        resolve: () => prisma.service.findMany(),
      })
  },
});

const schema = makeSchema({
  types: [
    User,
    Contact,
    Service,
    Category,
    Query,
    Mutations,
  ],
  outputs: {
    typegen: join(__dirname, "./nexus", "nexus-typegen.ts"),
    schema: join(__dirname, "./nexus", "schema.graphql"),
  },
});

const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
