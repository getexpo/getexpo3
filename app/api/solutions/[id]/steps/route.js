import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { solutionStepSchema } from '@/lib/validations'

// POST - Create new solution step (Admin only)
export async function POST(request, { params }) {
  try {
    await requireAuth()
    const { id } = await params
    const body = await request.json()
    
    // Validate input
    const validation = solutionStepSchema.safeParse({
      ...body,
      solutionTypeId: parseInt(id),
    })
    
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.errors },
        { status: 400 }
      )
    }

    const step = await prisma.solutionStep.create({
      data: validation.data,
    })

    return NextResponse.json(step, { status: 201 })
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Create solution step error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

