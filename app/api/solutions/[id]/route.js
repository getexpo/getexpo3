import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { solutionTypeSchema } from '@/lib/validations'

// GET - Fetch single solution type with steps
export async function GET(request, { params }) {
  try {
    const { id } = await params
    const solution = await prisma.solutionType.findUnique({
      where: { id: parseInt(id) },
      include: {
        steps: {
          orderBy: { stepOrder: 'asc' },
        },
      },
    })

    if (!solution) {
      return NextResponse.json(
        { error: 'Solution not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(solution)
  } catch (error) {
    console.error('Get solution error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update solution type (Admin only)
export async function PUT(request, { params }) {
  try {
    await requireAuth()
    const { id } = await params
    const body = await request.json()
    
    // Validate input
    const validation = solutionTypeSchema.partial().safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.errors },
        { status: 400 }
      )
    }

    const solution = await prisma.solutionType.update({
      where: { id: parseInt(id) },
      data: validation.data,
    })

    return NextResponse.json(solution)
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Update solution error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete solution type (Admin only)
export async function DELETE(request, { params }) {
  try {
    await requireAuth()
    const { id } = await params
    
    await prisma.solutionType.delete({
      where: { id: parseInt(id) },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Delete solution error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

