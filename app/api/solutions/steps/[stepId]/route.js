import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { solutionStepSchema } from '@/lib/validations'

// PUT - Update solution step (Admin only)
export async function PUT(request, { params }) {
  try {
    await requireAuth()
    const { stepId } = await params
    const body = await request.json()
    
    // Validate input
    const validation = solutionStepSchema.partial().safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.errors },
        { status: 400 }
      )
    }

    const step = await prisma.solutionStep.update({
      where: { id: parseInt(stepId) },
      data: validation.data,
    })

    return NextResponse.json(step)
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Update solution step error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete solution step (Admin only)
export async function DELETE(request, { params }) {
  try {
    await requireAuth()
    const { stepId } = await params
    
    await prisma.solutionStep.delete({
      where: { id: parseInt(stepId) },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Delete solution step error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

