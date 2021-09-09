import { inputObjectType } from "nexus";

const CreateCategoryInput = inputObjectType({
  name: "CreateCategoryInput",
  definition(t) {
    t.nonNull.string("name");
    t.nullable.string("description");

  },
});

export default CreateCategoryInput;