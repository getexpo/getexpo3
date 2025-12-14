#!/usr/bin/env node
/**
 * Database Connection Diagnostic Script
 * Tests Supabase/PostgreSQL connection and provides troubleshooting info
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['query', 'error', 'warn', 'info'],
})

async function testConnection() {
  console.log('🔍 Testing Database Connection...\n')
  
  // Check environment variables
  console.log('📋 Environment Variables:')
  console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✅ Set' : '❌ Not set')
  console.log('DIRECT_URL:', process.env.DIRECT_URL ? '✅ Set' : '❌ Not set')
  
  if (process.env.DATABASE_URL) {
    // Mask password for security
    const maskedUrl = process.env.DATABASE_URL.replace(/:([^@]+)@/, ':****@')
    console.log('Connection string:', maskedUrl)
  }
  console.log('')

  // Test database connection
  try {
    console.log('🔌 Attempting to connect to database...')
    await prisma.$connect()
    console.log('✅ Database connection successful!\n')

    // Test query
    console.log('📊 Testing query execution...')
    const result = await prisma.$queryRaw`SELECT current_database(), current_user, version()`
    console.log('✅ Query successful!')
    console.log('Result:', result)
    console.log('')

    // Check if tables exist
    console.log('📁 Checking tables...')
    try {
      const homeContent = await prisma.homeContent.findFirst()
      console.log('✅ HomeContent table accessible')
      console.log('   Data exists:', homeContent ? 'Yes' : 'No (table is empty)')
    } catch (e) {
      console.log('❌ HomeContent table error:', e.message)
    }

    try {
      const logos = await prisma.logoImage.findMany({ take: 1 })
      console.log('✅ LogoImage table accessible')
      console.log('   Data exists:', logos.length > 0 ? 'Yes' : 'No (table is empty)')
    } catch (e) {
      console.log('❌ LogoImage table error:', e.message)
    }

  } catch (error) {
    console.log('❌ Database connection failed!\n')
    console.log('Error Code:', error.code)
    console.log('Error Message:', error.message)
    console.log('')
    
    // Provide troubleshooting tips
    console.log('🔧 Troubleshooting Tips:')
    
    if (error.code === 'P1001') {
      console.log('  • P1001: Cannot reach database server')
      console.log('  • Check if your Supabase project is paused (free tier)')
      console.log('  • Verify your DATABASE_URL is correct')
      console.log('  • Check your internet connection')
      console.log('  • Verify firewall/network settings')
    } else if (error.code === 'P1002') {
      console.log('  • P1002: Database server timeout')
      console.log('  • Your database might be slow or overloaded')
    } else if (error.code === 'P1003') {
      console.log('  • P1003: Database does not exist')
      console.log('  • Check your database name in DATABASE_URL')
    } else if (error.code === 'P1008') {
      console.log('  • P1008: Operations timed out')
      console.log('  • Increase connection timeout or check network')
    } else if (error.code === 'P1010') {
      console.log('  • P1010: Access denied')
      console.log('  • Check your database credentials')
    }
    
    console.log('\n📚 Supabase-specific checks:')
    console.log('  1. Go to https://supabase.com/dashboard')
    console.log('  2. Check if your project is paused (Settings > General)')
    console.log('  3. Get fresh connection strings (Settings > Database > Connection String)')
    console.log('  4. Use "Transaction" mode for DATABASE_URL (port 6543)')
    console.log('  5. Use "Session" mode for DIRECT_URL (port 5432)')
  } finally {
    await prisma.$disconnect()
    console.log('\n✅ Disconnected from database')
  }
}

testConnection()
  .catch(console.error)
  .finally(() => process.exit())
