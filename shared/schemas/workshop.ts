import { number, z } from "zod";
import { PersonSchema, SponsorSchema } from "./person";

export const KeynoteSchema = z.object({
  name: z.string(),
  affil: z.string(),
  topic: z.string(),
});

export const KeynoteListSchema = z.object({
  year: z.number(),
  keynotes: z.array(KeynoteSchema),
});

export const EventSchema = z.object({
  event: z.string(),
  month: z.string(),
  day: z.number(),
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
});

export type Keynote = z.infer<typeof KeynoteSchema>;
export type Event = z.infer<typeof EventSchema>;
export type Timeline = z.infer<typeof TimelineSchema>;
export type PaperTemplate = z.infer<typeof PaperTemplateSchema>;
export type Committee = z.infer<typeof CommitteeSchema>;
export type SponsorList = z.infer<typeof SponsorListSchema>;
export type CommitteeMember = z.infer<typeof CommitteeMemberSchema>;
export type Workshop = z.infer<typeof WorkshopSchema>;
