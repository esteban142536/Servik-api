import { PrismaClient } from "@prisma/client";
const { servise } = new PrismaClient();
import createAnalityc from "../Analityc/createAnalityc";

const addServise = async (
  _: any,
  { servitorID, title, content, category, location }: any,
  context: any
) => {
  const addServise = await servise
    .create({
      data: {
        servitorID: servitorID,
        title: title,
        content: content,
        category: category,
        Reviews: 0,
        location: location,
      },
    })
    .then((x) => createAnalityc(null, x.id, null))
    .catch(console.log);

  return addServise;
};

export default addServise;
