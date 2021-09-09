import { inputObjectType } from "nexus";

const CreateServiceInput = inputObjectType({
  name: "CreateServiceInput",
  definition(t) {
    t.nonNull.string("title");
    t.nonNull.string("content");
    t.nonNull.float("location");
    t.nonNull.string("servitorId");
    t.nonNull.string("categoryId");
  },
});

export default CreateServiceInput;
