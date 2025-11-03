import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { caseStudySchema } from '@/lib/validations'

// GET - Fetch all case studies
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const published = searchParams.get('published')

    const where = published === 'true' ? { isPublished: true } : {}

    const caseStudies = await prisma.caseStudy.findMany({
      where,
      orderBy: { displayOrder: 'asc' },
    })

    return NextResponse.json(caseStudies)
  } catch (error) {
    console.error('Get case studies error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new case study (Admin only)
export async function POST(request) {
  try {
    await requireAuth()
    
    const body = await request.json()
    
    // Validate input
    const validation = caseStudySchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.errors },
        { status: 400 }
      )
    }

    const caseStudy = await prisma.caseStudy.create({
      data: validation.data,
    })

    return NextResponse.json(caseStudy, { status: 201 })
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Create case study error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

