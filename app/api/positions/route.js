import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { positionSchema } from '@/lib/validations'

// GET - Fetch all positions
export async function GET() {
  try {
    const positions = await prisma.position.findMany({
      orderBy: { displayOrder: 'asc' },
    })

    return NextResponse.json(positions)
  } catch (error) {
    console.error('Get positions error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new position (Admin only)
export async function POST(request) {
  try {
    await requireAuth()
    
    const body = await request.json()
    
    // Validate input
    const validation = positionSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.errors },
        { status: 400 }
      )
    }

    const position = await prisma.position.create({
      data: validation.data,
    })

    return NextResponse.json(position, { status: 201 })
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Create position error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

