import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { homeContentSchema } from '@/lib/validations'

// GET - Fetch home content
export async function GET() {
  try {
    const content = await prisma.homeContent.findFirst()
    
    if (!content) {
      return NextResponse.json(
        { error: 'Content not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(content)
  } catch (error) {
    console.error('Get home content error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update home content (Admin only)
export async function PUT(request) {
  try {
    await requireAuth()
    
    const body = await request.json()
    
    // Validate input
    const validation = homeContentSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.errors },
        { status: 400 }
      )
    }

    const content = await prisma.homeContent.upsert({
      where: { id: 1 },
      update: validation.data,
      create: { ...validation.data, id: 1 },
    })

    return NextResponse.json(content)
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Update home content error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

