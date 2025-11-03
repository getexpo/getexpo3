import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { positionSchema } from '@/lib/validations'

// GET - Fetch single position
export async function GET(request, { params }) {
  try {
    const { id } = await params
    const position = await prisma.position.findUnique({
      where: { id: parseInt(id) },
    })

    if (!position) {
      return NextResponse.json(
        { error: 'Position not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(position)
  } catch (error) {
    console.error('Get position error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update position (Admin only)
export async function PUT(request, { params }) {
  try {
    await requireAuth()
    const { id } = await params
    const body = await request.json()
    
    // Validate input
    const validation = positionSchema.partial().safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.errors },
        { status: 400 }
      )
    }

    const position = await prisma.position.update({
      where: { id: parseInt(id) },
      data: validation.data,
    })

    return NextResponse.json(position)
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Update position error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete position (Admin only)
export async function DELETE(request, { params }) {
  try {
    await requireAuth()
    const { id } = await params
    
    await prisma.position.delete({
      where: { id: parseInt(id) },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Delete position error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

