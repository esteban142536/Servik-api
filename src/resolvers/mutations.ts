import { PrismaClient } from "@prisma/client";
import { inputObjectType, list, mutationType, nonNull, nullable } from "nexus";
import User from "../schema/user";
import Contact from "../schema/contact";
import CreateContactInput from "../schema/CreateContactInput";
import CreateUserInput from "../schema/CreateUserInput";
import CreateServiceInput from "../schema/CreateServiseInput";
import CreateCategoryInput from "../schema/CreateCategoryInput";
import Service from "../schema/service";
import Category from "../schema/category";
import getUserInput from "../schema/getUserInput";
import seachServiseInput from "../schema/seachServiseInput";
import getServiseIdInput from "../schema/getServiseIdInput";
import getUserIdInput from "../schema/getUserIdInput";
import getCategoryIdInput from "../schema/getCategoryIdInput";

//const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });
const prisma = new PrismaClient();

const Mutation = mutationType({
  definition(t) {
    t.field("createUser", {
      args: { user: nonNull(CreateUserInput) },
      type: nonNull(User),
      resolve: (_, args) => prisma.user.create({ data: args.user }),
    });
    t.field("getUser", {
      args: { user: nonNull(getUserInput) },
      type: nullable(User),
      resolve: (_, args) =>
        prisma.user.findFirst({
          where: {
            email: args.user.email,
            AND: [{ password: args.user.password }],
          },
        }),
    });

    t.field("getUserId", {
      args: { user: nonNull(getUserIdInput) },
      type: nullable(User),
      resolve: (_, args) =>
        prisma.user.findUnique({
          where: { id: args.user.id },
        }),
    });

    t.field("createContact", {
      args: { contact: nonNull(CreateContactInput) },
      type: nonNull(Contact),
      resolve: (_, args) => prisma.contact.create({ data: args.contact }),
    });

    t.field("createServise", {
      args: { service: nonNull(CreateServiceInput) },
      type: nonNull(Service),
      resolve: (_, args) => prisma.service.create({ data: args.service }),
    });

    t.field("getServiseId", {
      args: { service: nonNull(getServiseIdInput) },
      type: nullable(Service),
      resolve: (_, args) =>
        prisma.service.findUnique({
          where: { id: args.service.id },
        }),
    });

    t.field("seachServise", {
      args: { service: nonNull(seachServiseInput) },
      type: list(Service),
      resolve: (_, args) =>
        prisma.service.findMany({
          where: {
            content: {
              contains: args.service.content, //this is not working
            },
          },
        }),
    });
    t.field("createCategory", {
      args: { category: nonNull(CreateCategoryInput) },
      type: nonNull(Category),
      resolve: (_, args) => prisma.category.create({ data: args.category }),
    });

    t.field("getCategoryId", {
      args: { category: nonNull(getCategoryIdInput) },
      type: nullable(Category),
      resolve: (_, args) =>
        prisma.category.findUnique({
          where: { id: args.category.id },
        }),
    });
  },
});

export default Mutation;
