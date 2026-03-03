import type { Staff } from "./person";

export interface Workshop {
  year: number;
  location: string;
  date: [string, string?, string?];
  status: "completed" | "upcoming" | "ongoing";
  submissions?: number;
  accepted?: number;
  participants?: number;
  countries?: number;
  keynoteSpeakers?: string[];
  bestPapers?: string[];
  proceedingsLink?: string;
  miccaiLink: string;
  cmtLink: string;
  paperRequirementLink: string;

  keynotes: Keynote[];
  schedule: EventSchedule[];
  calendar: CalendarDate[];
  paperTemplates: PaperTemplate[];
  committee: Committee;
  sponsors: Sponsors;
  oralSessions: any[];
}

export interface Keynote {
  name: string;
  affil: string;
  topic: string;
}

export interface EventSchedule {
  time: string;
  event: string;
}

export interface CalendarDate {
  event: string;
  date: number;
  month: string;
}

export interface PaperTemplate {
  label: string;
  type: string;
  link: string;
}

export interface Committee {
  type: string;
  label: string;
  year?: number;
  member: Staff[];
}

export interface Sponsor {
  name: string;
  url: string;
  logo: string;
}

export interface Sponsors {
  platinum: Sponsor[];
  gold: Sponsor[];
  supporting: Sponsor[];
}
