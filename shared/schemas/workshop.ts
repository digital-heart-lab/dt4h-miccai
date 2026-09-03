import { number, z } from "zod";
import { PersonSchema, SponsorSchema } from "./person";

export const KeynoteSchema = z.object({
  name: z.string(),
  affil: z.string(),
  topic: z.string(),
  website: z.string().optional(),
  talkTitle: z.string().optional(),
  talkAbstract: z.string().optional(),
  bio: z.string().optional(),
  links: z.array(z.string()).optional(),
  avatar: z.string().optional(),
});

export const KeynoteListSchema = z.object({
  year: z.number(),
  keynotes: z.array(KeynoteSchema),
});

export const EventSchema = z.object({
  event: z.string(),
  month: z.string(),
  day: z.union([z.string(), z.number()]),
  revisedMonth: z.string().optional(),
  revisedDay: z.union([z.string(), z.number()]).optional(),
  highlight: z.enum(["revision"]).optional(),
  time: z.string().optional(),
});

export const TimelineSchema = z.object({
  year: z.number(),
  events: z.array(EventSchema),
});

export const PaperTemplateSchema = z.object({
  label: z.string(),
  format: z.string(),
  link: z.string(),
});

export const PaperTemplateListSchema = z.object({
  year: z.number(),
  templates: z.array(PaperTemplateSchema),
});

export const AcceptedPaperSchema = z.object({
  title: z.string(),
  authors: z.string(),
});

export const AcceptedPaperListSchema = z.object({
  year: z.number(),
  papers: z.array(AcceptedPaperSchema),
});

export const ProgramScheduleItemSchema = z.object({
  time: z.string(),
  activity: z.string(),
  speaker: z.string().optional(),
  talkTitle: z.string().optional(),
  detail: z.string().optional(),
});

export const ProgramPresentationSchema = z.object({
+  number: z.number(),
  presenter: z.string(),
  affiliation: z.string(),
  title: z.string(),
});

export const ProgramOralSessionSchema = z.object({
  title: z.string(),
  time: z.string(),
  chair: z.string(),
  presentations: z.array(ProgramPresentationSchema),
});

export const ProgramListSchema = z.object({
  year: z.number(),
  date: z.string(),
  venue: z.string(),
  room: z.string().optional(),
  schedule: z.array(ProgramScheduleItemSchema),
  oralSessions: z.array(ProgramOralSessionSchema),
});

export const CommitteeMemberSchema = PersonSchema.extend({
  role: z.string(),
});

export const CommitteeSchema = z.object({
  type: z.string(),
  title: z.string().optional(),
  year: z.number().optional(),
  members: z.array(CommitteeMemberSchema),
});

export const SponsorListSchema = z.object({
  year: z.number(),
  platinum: z.array(SponsorSchema),
  gold: z.array(SponsorSchema),
  supporting: z.array(SponsorSchema),
});

export const WorkshopSchema = z.object({
  year: z.number(),
  location: z.string(),
  date: z.tuple([z.string(), z.string().optional(), z.string().optional()]),
  status: z.enum(["completed", "upcoming", "ongoing"]),

  submissionDeadline: z.tuple([
    z.string(),
    z.string().optional(),
    z.string().optional(),
  ]),
  revisedSubmissionDeadline: z
    .tuple([z.string(), z.string().optional(), z.string().optional()])
    .optional(),
  miccaiLink: z.string(),
  cmtLink: z.string(),
  paperRequirementLink: z.string(),

  submissions: z.number().optional(),
  accepted: z.number().optional(),
  oralSessions: z.number().optional(),
  participants: z.number().optional(),
  countries: z.number().optional(),
  keynoteSpeakers: z.array(z.string()).optional(),
  bestPapers: z.array(z.string()).optional(),
  proceedingsLink: z.string().optional(),

  keynotes: KeynoteListSchema.optional(),
  committee: CommitteeSchema.optional(),
  sponsors: SponsorListSchema.optional(),
  timeline: TimelineSchema.optional(),
  paperTemplates: PaperTemplateListSchema.optional(),
  acceptedPapers: AcceptedPaperListSchema.optional(),
  program: ProgramListSchema.optional(),
});

export type Keynote = z.infer<typeof KeynoteSchema>;
export type Event = z.infer<typeof EventSchema>;
export type Timeline = z.infer<typeof TimelineSchema>;
export type PaperTemplate = z.infer<typeof PaperTemplateSchema>;
export type AcceptedPaper = z.infer<typeof AcceptedPaperSchema>;
export type AcceptedPaperList = z.infer<typeof AcceptedPaperListSchema>;
export type ProgramScheduleItem = z.infer<typeof ProgramScheduleItemSchema>;
export type ProgramPresentation = z.infer<typeof ProgramPresentationSchema>;
export type ProgramOralSession = z.infer<typeof ProgramOralSessionSchema>;
export type ProgramList = z.infer<typeof ProgramListSchema>;
export type Committee = z.infer<typeof CommitteeSchema>;
export type SponsorList = z.infer<typeof SponsorListSchema>;
export type CommitteeMember = z.infer<typeof CommitteeMemberSchema>;
export type Workshop = z.infer<typeof WorkshopSchema>;
