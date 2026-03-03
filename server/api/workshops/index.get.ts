import { getWorkshops } from "~~/server/services/workshop";

export default defineEventHandler(async (event) => {
  const data = await getWorkshops();

  return data;
});
