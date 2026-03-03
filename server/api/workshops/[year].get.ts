import { getWorkshopDetail } from "~~/server/services/workshop";

export default defineEventHandler(async (event) => {
  const year = getRouterParam(event, "year");
  const data = await getWorkshopDetail(Number(year));

  return data;
});
