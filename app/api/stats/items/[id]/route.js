import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { statItemSchema } from '@/lib/validations'

// PUT - Update stat item (Admin only)
export async function PUT(request, { params }) {
  try {
    await requireAuth()
    const { id } = await params
    const body = await request.json()
    
    // Validate input
    const validation = statItemSchema.partial().safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.errors },
        { status: 400 }
      )
    }

    const item = await prisma.statItem.update({
      where: { id: parseInt(id) },
      data: validation.data,
    })

    return NextResponse.json(item)
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Update stat item error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete stat item (Admin only)
export async function DELETE(request, { params }) {
  try {
    await requireAuth()
    const { id } = await params
    
    await prisma.statItem.delete({
      where: { id: parseInt(id) },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Delete stat item error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

