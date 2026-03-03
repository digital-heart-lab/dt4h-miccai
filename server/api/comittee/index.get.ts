import { Committee } from "~/models/person";
import { getAllAnnualCommittee } from "~~/server/services/committee";

export default defineEventHandler(async (event) => {
  const data = (await getAllAnnualCommittee()) as Committee[];

  return data;
});
