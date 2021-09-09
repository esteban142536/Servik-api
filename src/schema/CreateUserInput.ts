import { inputObjectType } from "nexus";

const CreateUserInput = inputObjectType({
  name: "CreateUserInput",
  definition(t) {
    t.nonNull.string("email");
    t.nonNull.string("name");
    t.nonNull.string("password");
  },
});

export default CreateUserInput;
