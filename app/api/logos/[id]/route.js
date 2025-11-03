import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { unlink } from 'fs/promises'
import path from 'path'

// PUT - Update logo (Admin only)
export async function PUT(request, { params }) {
  try {
    await requireAuth()
    const { id } = await params
    const body = await request.json()

    const logo = await prisma.logoImage.update({
      where: { id: parseInt(id) },
      data: body,
    })

    return NextResponse.json(logo)
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Update logo error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete logo (Admin only)
export async function DELETE(request, { params }) {
  try {
    await requireAuth()
    const { id } = await params
    
    // Get logo to find file path
    const logo = await prisma.logoImage.findUnique({
      where: { id: parseInt(id) },
    })

    if (!logo) {
      return NextResponse.json(
        { error: 'Logo not found' },
        { status: 404 }
      )
    }

    // Delete from database
    await prisma.logoImage.delete({
      where: { id: parseInt(id) },
    })

    // Try to delete file (don't fail if file doesn't exist)
    try {
      const filepath = path.join(process.cwd(), 'public', logo.path)
      await unlink(filepath)
    } catch (fileError) {
      console.warn('Could not delete file:', fileError)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Delete logo error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

