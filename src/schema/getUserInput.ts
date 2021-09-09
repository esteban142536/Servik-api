import { inputObjectType } from "nexus";

const getUserInput = inputObjectType({
  name: "getUserInput",
  definition(t) {
    t.nonNull.string("email");
    t.nonNull.string("password");
  },
});

export default getUserInput;