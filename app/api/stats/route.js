import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

// GET - Fetch stats content and items
export async function GET() {
  try {
    const [content, items] = await Promise.all([
      prisma.statsContent.findFirst(),
      prisma.statItem.findMany({
        where: { isActive: true },
        orderBy: { order: 'asc' },
      }),
    ])

    return NextResponse.json({
      content,
      items,
    })
  } catch (error) {
    console.error('Get stats error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update stats content (Admin only)
export async function PUT(request) {
  try {
    await requireAuth()
    const body = await request.json()

    const content = await prisma.statsContent.upsert({
      where: { id: 1 },
      update: body,
      create: { ...body, id: 1 },
    })

    return NextResponse.json(content)
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Update stats content error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

