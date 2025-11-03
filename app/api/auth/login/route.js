import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifyPassword, createToken, setAuthCookie } from '@/lib/auth'
import { loginSchema } from '@/lib/validations'

export async function POST(request) {
  try {
    const body = await request.json()
    
    // Validate input
    const validation = loginSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.errors },
        { status: 400 }
      )
    }

    const { username, password } = validation.data

    // Find admin user
    const admin = await prisma.admin.findUnique({
      where: { username },
    })

    if (!admin) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Verify password
    const isValid = await verifyPassword(password, admin.password)
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Create JWT token
    const token = await createToken({ 
      id: admin.id, 
      username: admin.username 
    })

    // Set cookie
    await setAuthCookie(token)

    return NextResponse.json({
      success: true,
      user: {
        id: admin.id,
        username: admin.username,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

