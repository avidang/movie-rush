import z from 'zod';

const ConfigSchema = z.object({
  tmdbApiKey: z.string(),
});

export type Config = z.infer<typeof ConfigSchema>;
export const config = ConfigSchema.parse({
  tmdbApiKey: import.meta.env.VITE_TMDB_API_KEY,
});
