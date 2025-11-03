import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { settingsSchema } from '@/lib/validations'

// GET - Fetch settings
export async function GET() {
  try {
    const settings = await prisma.settings.findFirst()
    
    if (!settings) {
      return NextResponse.json(
        { error: 'Settings not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(settings)
  } catch (error) {
    console.error('Get settings error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update settings (Admin only)
export async function PUT(request) {
  try {
    await requireAuth()
    
    const body = await request.json()
    
    // Validate input
    const validation = settingsSchema.partial().safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.errors },
        { status: 400 }
      )
    }

    const settings = await prisma.settings.upsert({
      where: { id: 1 },
      update: validation.data,
      create: { ...validation.data, id: 1 },
    })

    return NextResponse.json(settings)
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Update settings error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

