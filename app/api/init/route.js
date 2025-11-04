import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { hashPassword } from '@/lib/auth'

export async function POST(request) {
  try {
    const body = await request.json()
    
    // Security: Only allow if secret matches
    if (body.secret !== process.env.INIT_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if admin already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { username: 'admin' }
    })

    if (existingAdmin) {
      return NextResponse.json({
        success: true,
        message: 'Database already initialized',
        adminExists: true
      })
    }

    // Create admin user
    const hashedPassword = await hashPassword('admin123')
    const admin = await prisma.admin.create({
      data: {
        username: 'admin',
        password: hashedPassword,
      }
    })

    // Create default home content
    await prisma.homeContent.upsert({
      where: { id: 1 },
      update: {},
      create: {
        heroTitle1: 'Transform Your Ad Spend',
        heroTitle2: 'Into Real',
        typedWords: 'Customers,Revenue,Profit',
        subHeadline: 'And Bring The Growth You Deserve',
        description: "We'll pinpoint where you are in your advertising journey and deliver customized solutions that maximize your ROI",
        ctaText: 'Work With Us',
        ctaLink: 'https://calendly.com/rohittangri/just-starting-out',
        bigStat: '$600K',
        statsText1: 'Get Exposure has profitably spent over',
        statsText2: '$600K in Ad spend',
        statsText3: 'and generated over $2.4M.',
        journeyTitle1: 'Where Are You in Your',
        journeyTitle2: 'Advertising Journey',
        journeyDesc: 'We start by pinpointing exactly where you are in your advertising journey. Every business is unique, and your challenges require tailored solutions.',
      },
    })

    // Create default settings
    await prisma.settings.upsert({
      where: { id: 1 },
      update: {},
      create: {
        defaultCalendlyLink: 'https://calendly.com/rohittangri/just-starting-out',
        siteTitle: 'GetExposure - Transform Your Ad Spend Into Real Customers',
        siteDescription: "Stop wasting money on ads that don't convert. Our data-driven approach optimizes your campaigns for maximum ROI, turning every dollar spent into measurable growth.",
      },
    })

    // Create contact content
    const contactContent = await prisma.contactContent.upsert({
      where: { id: 1 },
      update: {},
      create: {
        headerTitle1: "Ready to Scale",
        headerTitle2: "Your Advertising?",
        headerDescription: "Book a free consultation to discover how we can transform your ad campaigns into a profitable growth engine.",
        whatYoullGetTitle: "What You'll Get",
        getInTouchTitle: "Get in Touch",
        trustBadgeText: "Join 50+ businesses who've scaled their advertising with our proven strategies",
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Database initialized successfully',
      admin: {
        id: admin.id,
        username: admin.username
      }
    })

  } catch (error) {
    console.error('Initialization error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to initialize database',
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}

// GET endpoint to check initialization status
export async function GET() {
  try {
    const adminCount = await prisma.admin.count()
    const homeContent = await prisma.homeContent.findFirst()
    const settings = await prisma.settings.findFirst()

    return NextResponse.json({
      initialized: adminCount > 0,
      adminCount,
      hasHomeContent: !!homeContent,
      hasSettings: !!settings,
      databaseUrl: process.env.DATABASE_URL ? 'Set' : 'Not set',
      nodeEnv: process.env.NODE_ENV
    })
  } catch (error) {
    console.error('Status check error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to check database status',
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}

