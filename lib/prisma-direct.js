import { PrismaClient } from '@prisma/client'

const globalForPrismaDirect = global

// Direct Prisma Client for build-time queries and migrations
// Uses DIRECT_URL (port 5432) which supports prepared statements
// Use this for: sitemap generation, build-time data fetching, migrations
export const prismaDirect = globalForPrismaDirect.prismaDirect || new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL || process.env.DATABASE_URL,
    },
  },
  log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') globalForPrismaDirect.prismaDirect = prismaDirect

export default prismaDirect
