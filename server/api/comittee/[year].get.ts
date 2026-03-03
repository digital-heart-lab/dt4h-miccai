import { getAnnualCommittee } from "~~/server/services/committee";

export default defineEventHandler(async (event) => {
  const year = getRouterParam(event, "year");
  const data = await getAnnualCommittee(Number(year));

  return data;
});
