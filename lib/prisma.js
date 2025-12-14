import { PrismaClient } from '@prisma/client'

const globalForPrisma = global

// Optimized Prisma Client for serverless environments and Supabase pgBouncer
// IMPORTANT: pgBouncer in transaction mode doesn't support prepared statements
export const prisma = globalForPrisma.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

// Configure Prisma to not use prepared statements (required for Supabase pgBouncer)
prisma.$connect().then(() => {
  // Disable prepared statements by setting pgbouncer=true in connection string
  console.log('✅ Prisma connected to database')
}).catch((error) => {
  console.error('❌ Prisma connection error:', error)
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma

