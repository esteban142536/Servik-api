import { inputObjectType } from "nexus";

const getServiseIdInput = inputObjectType({
  name: "getServiseIdInput",
  definition(t) {
    t.nonNull.string("id");
  },
});

export default getServiseIdInput;