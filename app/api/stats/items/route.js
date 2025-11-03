import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { statItemSchema } from '@/lib/validations'

// POST - Create new stat item (Admin only)
export async function POST(request) {
  try {
    await requireAuth()
    
    const body = await request.json()
    
    // Validate input
    const validation = statItemSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.errors },
        { status: 400 }
      )
    }

    const item = await prisma.statItem.create({
      data: validation.data,
    })

    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Create stat item error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

