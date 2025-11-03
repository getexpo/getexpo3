import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

// GET - Fetch contact content and contact info
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')

    if (type === 'content') {
      const content = await prisma.contactContent.findFirst()
      return NextResponse.json(content || {})
    }

    if (type) {
      const items = await prisma.contactInfo.findMany({
        where: { type, isActive: true },
        orderBy: { order: 'asc' },
      })
      return NextResponse.json(items)
    }

    // Return all contact data
    const [content, infos, benefits, stats] = await Promise.all([
      prisma.contactContent.findFirst(),
      prisma.contactInfo.findMany({
        where: { type: 'info', isActive: true },
        orderBy: { order: 'asc' },
      }),
      prisma.contactInfo.findMany({
        where: { type: 'benefit', isActive: true },
        orderBy: { order: 'asc' },
      }),
      prisma.contactInfo.findMany({
        where: { type: 'stat', isActive: true },
        orderBy: { order: 'asc' },
      }),
    ])

    return NextResponse.json({
      content,
      infos,
      benefits,
      stats,
    })
  } catch (error) {
    console.error('Get contact data error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update contact content (Admin only)
export async function PUT(request) {
  try {
    await requireAuth()
    const body = await request.json()

    const content = await prisma.contactContent.upsert({
      where: { id: 1 },
      update: body,
      create: { ...body, id: 1 },
    })

    return NextResponse.json(content)
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Update contact content error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

