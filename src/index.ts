import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server";
import fs from "fs";
import path from "path";

import loginResolvers from "./resolvers/User/login";
import signInResolvers from "./resolvers/User/signin";
import addServise from "./resolvers/Servise/addServise";
import seachServise from "./resolvers/Servise/seachServise";
import getServiseId from "./resolvers/Servise/getServiseByID";
import getUserById from "./resolvers/User/getUserByID";
import createAnalityc from "./resolvers/Analityc/createAnalityc";
import updateAnalityc from "./resolvers/Analityc/update";

const prisma = new PrismaClient();

const resolvers = {
  Mutation: {
    Signin: signInResolvers,
    login: loginResolvers,
    addServise: addServise,
    seachServise: seachServise,
    getServiseId: getServiseId,
    getUserById: getUserById,
    createAnalityc: createAnalityc,
    updateAnalityc: updateAnalityc,
  },
};

const Server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "/schema.graphql"), "utf8"),
  resolvers,
  context: {
    prisma,
  },
});

Server.listen().then((data: any) =>
  console.log(`Server is running on ${data.url}`)
);
