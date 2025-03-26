import z from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.string(),
  APP_PORT: z.string(),
  DATABASE_URL: z.string().url(),
  DIRECT_URL: z.string().url(),
});

export type EnvTypes = z.infer<typeof envSchema>;
