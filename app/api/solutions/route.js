import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { solutionTypeSchema } from '@/lib/validations'

// GET - Fetch all solution types with their steps
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')

    if (slug) {
      const solution = await prisma.solutionType.findUnique({
        where: { slug },
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
    }

    const solutions = await prisma.solutionType.findMany({
      include: {
        steps: {
          orderBy: { stepOrder: 'asc' },
        },
      },
    })

    return NextResponse.json(solutions)
  } catch (error) {
    console.error('Get solutions error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new solution type (Admin only)
export async function POST(request) {
  try {
    await requireAuth()
    
    const body = await request.json()
    
    // Validate input
    const validation = solutionTypeSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.errors },
        { status: 400 }
      )
    }

    const solution = await prisma.solutionType.create({
      data: validation.data,
    })

    return NextResponse.json(solution, { status: 201 })
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Create solution error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

