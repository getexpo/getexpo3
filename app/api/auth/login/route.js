import { NextResponse } from 'next/server'
import { createToken, setAuthCookie } from '@/lib/auth'
import { loginSchema } from '@/lib/validations'

// Hardcoded admin credentials (not linked to database)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

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

    // Check hardcoded admin credentials
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Create JWT token
    const token = await createToken({ 
      id: 'admin-1', 
      username: username 
    })

    // Set cookie
    await setAuthCookie(token)

    return NextResponse.json({
      success: true,
      user: {
        id: 'admin-1',
        username: username,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    })
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
  }
}

