import { inputObjectType } from "nexus";

const seachServiseInput = inputObjectType({
  name: "seachServiseInput",
  definition(t) {
    t.nonNull.string("content");
  },
});

export default seachServiseInput;