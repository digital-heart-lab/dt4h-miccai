import {
  CalendarDate,
  Committee,
  EventSchedule,
  Keynote,
  PaperTemplate,
  Sponsors,
  Workshop,
} from "~/models/workshop";

export async function getWorkshopDetail(
  year: number,
): Promise<Workshop | null> {
  const [
    overiew,
    keynotes,
    schedule,
    calendar,
    paperTemplates,
    committee,
    sponsors,
  ] = (await Promise.all([
    useStorage("data").getItem(`./workshops/${year}/overview.json`),
    useStorage("data").getItem(`./workshops/${year}/keynotes.json`),
    useStorage("data").getItem(`./workshops/${year}/schedule.json`),
    useStorage("data").getItem(`./workshops/${year}/calendar.json`),
    useStorage("data").getItem(`./workshops/${year}/templates.json`),
    useStorage("data").getItem(`./workshops/${year}/committee.json`),
    useStorage("data").getItem(`./workshops/${year}/sponsors.json`),
  ])) as [
    Workshop,
    Keynote[],
    EventSchedule[],
    CalendarDate[],
    PaperTemplate[],
    Committee,
    Sponsors,
  ];

  overiew.keynotes = keynotes;
  overiew.schedule = schedule;
  overiew.calendar = calendar;
  overiew.paperTemplates = paperTemplates;
  overiew.committee = committee;
  overiew.sponsors = sponsors;

  return overiew;
}

export async function getWorkshops(): Promise<Workshop[]> {
  const storage = useStorage("data");

  const keys = await storage.getKeys("workshops/");
  const overviewKeys = keys.filter((key) => key.endsWith("overview.json"));

  const workshopsData = (await Promise.all(
    overviewKeys.map(async (key) => storage.getItem(key)),
  )) as Workshop[];

  return workshopsData.toSorted((a, b) => Number(b.year) - Number(a.year));
}
