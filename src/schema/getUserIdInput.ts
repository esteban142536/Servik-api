import { inputObjectType } from "nexus";

const getUserIdInput = inputObjectType({
  name: "getUserIdInput",
  definition(t) {
    t.nonNull.string("id");
  },
});

export default getUserIdInput;