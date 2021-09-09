import { inputObjectType } from "nexus";

const getCategoryIdInput = inputObjectType({
  name: "getCategoryIdInput",
  definition(t) {
    t.nonNull.string("id");
  },
});

export default getCategoryIdInput;