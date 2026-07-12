import { defineConfig } from 'prisma/config';

process.loadEnvFile();

export default defineConfig({
  schema: './apps/api/prisma/schema.prisma',
  migrations: {
    path: './apps/api/prisma/migrations',
    seed: 'tsx apps/api/prisma/seed.ts'
  }
});
