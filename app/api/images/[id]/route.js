import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { unlink } from 'fs/promises'
import path from 'path'

// DELETE - Delete image (Admin only)
export async function DELETE(request, { params }) {
  try {
    await requireAuth()
    const { id } = await params
    
    // Get image to find file path
    const image = await prisma.generalImage.findUnique({
      where: { id: parseInt(id) },
    })

    if (!image) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      )
    }

    // Delete from database
    await prisma.generalImage.delete({
      where: { id: parseInt(id) },
    })

    // Try to delete file (don't fail if file doesn't exist)
    try {
      const filepath = path.join(process.cwd(), 'public', image.path)
      await unlink(filepath)
    } catch (fileError) {
      console.warn('Could not delete file:', fileError)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Delete image error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

