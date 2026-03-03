import { Committee } from "~/models/workshop";

export async function getAnnualCommittee(year: number): Promise<Committee> {
  const committee = (await useStorage("data").getItem(
    `./workshops/${year}/overview.json`,
  )) as Committee;
  return committee;
}

export async function getStandingCommittee(): Promise<Committee[]> {
  const committee = (await useStorage("data").getItem(
    `./workshops/committee.json`,
  )) as Committee[];

  return committee;
}

export async function getAllAnnualCommittee() {
  const storage = useStorage("data");

  const keys = await storage.getKeys("workshops/");
  const committeeKeys = keys.filter((key) => key.match(/\d{4}:committee.json/));

  const committeeList = (await Promise.all(
    committeeKeys.map(async (key) => storage.getItem(key)),
  )) as Committee[];

  return committeeList.toSorted((a, b) => b.year! - a.year!);
}
