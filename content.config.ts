import { defineContentConfig, defineCollection } from "@nuxt/content";
import { z } from "zod";

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: "page",
      source: "**/*.mdc",
      schema: z.object({
        date: z.string(),
        author: z.string(),
      }),
    }),
  },
});
