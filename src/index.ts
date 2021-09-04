import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server";
import fs from "fs";
import path from "path";
import { makeSchema, objectType, extendType, nonNull, stringArg } from "nexus";

import loginResolvers from "./resolvers/User/login";
import signInResolvers from "./resolvers/User/signin";
import addServise from "./resolvers/Servise/addServise";
import seachServise from "./resolvers/Servise/seachServise";
import getServiseId from "./resolvers/Servise/getServiseByID";
import getUserById from "./resolvers/User/getUserByID";
import createAnalityc from "./resolvers/Analityc/createAnalityc";
import updateAnalityc from "./resolvers/Analityc/update";

const prisma = new PrismaClient();

const Server = new ApolloServer({
  /* typeDefs: fs.readFileSync(path.join(__dirname, "/schema.graphql"), "utf8"),
 resolvers,
 */
  context: () => ({ prisma }),

  schema: makeSchema({
    sourceTypes: {
      modules: [{ module: ".prisma/client", alias: "PrismaClient" }],
    },
    contextType: {
      module: path.join(__dirname, "context.ts"),
      export: "Context",
    },
    outputs: {
      typegen: path.join(
        __dirname,
        "node_modules/@types/nexus-typegen/index.d.ts"
      ),
      schema: path.join(__dirname, "./nexusGen.graphql"),
    },

    //work here
    types: [
      objectType({
        name: "User",
        definition(u) {
          u.id("id");
          u.string("email");
          u.string("name");
          u.int("contact");
          u.string("password");
          u.boolean("isValid");
          u.list.field("servise", {
            type: "Servise",
            resolve(x) {
              return x;
            },
          });
        },
      }),

      objectType({
        name: "Servise",
        definition(u) {
          u.id("id");
          u.string("title");
          u.string("content");
          u.float("Reviews");
          u.string("category");
          u.int("location");
          u.list.field("servitor", {
            type: "User",
            resolve(x) {
              return x;
            },
          });
        },
      }),

      objectType({
        name: "Analityc",
        definition(u) {
          u.id("id");
          u.int("Views");
          u.int("Clicks");
          u.int("Contacts");
          u.int("reports");
          u.field("serviseID", {
            type: "Servise",
            resolve(x) {
              return x.id;
            },
          });
        },
      }),

      extendType(loginResolvers),
      extendType(signInResolvers),
      extendType(getUserById),
      extendType(seachServise), //its making the request and bring the result, but its dont showing in the screen
      extendType(addServise),
      extendType(getServiseId),
      extendType(updateAnalityc), //its compared the analityc id, not by serviseID
      extendType(createAnalityc),
    ],
  }),
});

Server.listen().then((data: any) =>
  console.log(`Server is running on ${data.url}`)
);
