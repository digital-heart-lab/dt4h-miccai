import type { Workshop } from "~~/shared/schemas/workshop";

export async function getWorkshopDetail(year: number): Promise<Workshop> {
  const [overiew, committee, sponsors, timeline, paperTemplates] =
    await Promise.all([
      queryCollection("workshop").where("year", "=", year).first(),
      queryCollection("committee").where("year", "=", year).first(),
      queryCollection("sponsor").where("year", "=", year).first(),
      queryCollection("timeline").where("year", "=", year).first(),
      queryCollection("paperTemplate").where("year", "=", year).first(),
    ]);
  return {
    ...overiew!,
    committee: committee!,
    sponsors: sponsors!,
    timeline: timeline!,
    paperTemplates: paperTemplates!,
  } as Workshop;
}

export function getWorkshops(): Promise<Workshop[]> {
  return queryCollection("workshop").all() as Promise<Workshop[]>;
}
