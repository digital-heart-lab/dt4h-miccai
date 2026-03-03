import { Committee } from "~/models/person";
import { getStandingCommittee } from "~~/server/services/committee";

export default defineEventHandler(async (event) => {
  const data = (await getStandingCommittee()) as Committee[];

  return data;
});
