import { defineContentConfig, defineCollection } from "@nuxt/content";
import { z } from "zod";
import {
  WorkshopSchema,
  CommitteeSchema,
  SponsorListSchema,
  TimelineSchema,
  PaperTemplateListSchema,
} from "./shared/schemas/workshop";

export default defineContentConfig({
  collections: {
    workshop: defineCollection({
      type: "data",
      source: "workshop/*.json",
      schema: WorkshopSchema,
    }),
    sponsor: defineCollection({
      type: "data",
      source: "workshop/sponsor/*.json",
      schema: SponsorListSchema,
    }),
    committee: defineCollection({
      type: "data",
      source: "workshop/committee/*.json",
      schema: CommitteeSchema,
    }),
    timeline: defineCollection({
      type: "data",
      source: "workshop/timeline/*.json",
      schema: TimelineSchema,
    }),
    paperTemplate: defineCollection({
      type: "data",
      source: "workshop/paper-template/*.json",
      schema: PaperTemplateListSchema,
    }),
    blog: defineCollection({
      type: "page",
      source: "blog/*.mdc",
      schema: z.object({
        date: z.string(),
        author: z.string(),
      }),
    }),
  },
});
