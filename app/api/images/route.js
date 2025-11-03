import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { saveFile } from '@/lib/upload'

// GET - Fetch all general images (Admin only)
export async function GET() {
  try {
    await requireAuth()
    
    const images = await prisma.generalImage.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(images)
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Get images error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Upload new image (Admin only)
export async function POST(request) {
  try {
    await requireAuth()
    
    const formData = await request.formData()
    const file = formData.get('file')
    const alt = formData.get('alt') || ''

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Save file
    const fileData = await saveFile(file, 'general')

    // Create database record
    const image = await prisma.generalImage.create({
      data: {
        filename: fileData.filename,
        path: fileData.path,
        alt,
        size: fileData.size,
        mimeType: fileData.mimeType,
      },
    })

    return NextResponse.json(image, { status: 201 })
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Upload image error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

