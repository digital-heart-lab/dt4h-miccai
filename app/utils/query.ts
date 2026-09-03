import type { Workshop } from "~~/shared/schemas/workshop";

export async function getWorkshopDetail(year: number): Promise<Workshop> {
  const [
    overiew,
    committee,
    sponsors,
    timeline,
    paperTemplates,
    keynotes,
    acceptedPapers,
    program,
  ] = await Promise.all([
    queryCollection("workshop").where("year", "=", year).first(),
    queryCollection("committee").where("year", "=", year).first(),
    queryCollection("sponsor").where("year", "=", year).first(),
    queryCollection("timeline").where("year", "=", year).first(),
    queryCollection("paperTemplate").where("year", "=", year).first(),
    queryCollection("keynotes").where("year", "=", year).first(),
    queryCollection("acceptedPapers").where("year", "=", year).first(),
    queryCollection("program").where("year", "=", year).first(),
  ]);
  return {
    ...overiew!,
    committee: committee!,
    sponsors: sponsors!,
    timeline: timeline!,
    paperTemplates: paperTemplates!,
    keynotes: keynotes ?? undefined,
    acceptedPapers: acceptedPapers ?? undefined,
    program: program ?? undefined,
  } as Workshop;
}

export function getWorkshops(): Promise<Workshop[]> {
  return queryCollection("workshop").order("year", "DESC").all() as Promise<
    Workshop[]
  >;
}
