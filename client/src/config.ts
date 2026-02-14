import z from 'zod';

const ConfigSchema = z.object({
  serverUrl: z.url(),
});

export type Config = z.infer<typeof ConfigSchema>;
export const config = ConfigSchema.parse({
  serverUrl: import.meta.env.VITE_SERVER_URL,
});
