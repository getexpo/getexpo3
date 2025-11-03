import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { saveFile } from '@/lib/upload'

// GET - Fetch all logos
export async function GET() {
  try {
    const logos = await prisma.logoImage.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(logos)
  } catch (error) {
    console.error('Get logos error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Upload new logo (Admin only)
export async function POST(request) {
  try {
    await requireAuth()
    
    const formData = await request.formData()
    const file = formData.get('file')
    const alt = formData.get('alt') || ''
    const order = parseInt(formData.get('order') || '0')

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Save file
    const fileData = await saveFile(file, 'brands')

    // Create database record
    const logo = await prisma.logoImage.create({
      data: {
        filename: fileData.filename,
        path: fileData.path,
        alt,
        order,
      },
    })

    return NextResponse.json(logo, { status: 201 })
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Upload logo error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

