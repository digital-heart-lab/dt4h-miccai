import { z } from "zod";

export const PersonSchema = z.object({
  name: z.string(),
  link: z.string().optional(),
  institution: z.string(),
  avatar: z.string().optional(),
  country: z.string(),
});

export type Person = z.infer<typeof PersonSchema>;

export const SponsorSchema = z.object({
  name: z.string(),
  url: z.string(),
  logo: z.string(),
});

export type Sponsor = z.infer<typeof SponsorSchema>;
