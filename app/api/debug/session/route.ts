import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { AuthService } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    // Get session token from different sources
    const authHeader = request.headers.get('authorization')
    const cookieToken = request.cookies.get('session_token')?.value
    const sessionToken = authHeader?.replace('Bearer ', '') || cookieToken

    console.log('Debug session check:', {
      authHeader,
      cookieToken,
      sessionToken: sessionToken ? 'exists' : 'missing'
    })

    if (!sessionToken) {
      return NextResponse.json({ 
        error: 'No session token found',
        debug: { authHeader, cookieToken }
      }, { status: 401 })
    }

    // Try to validate session
    const user = await AuthService.validateSession(sessionToken)
    
    if (!user) {
      return NextResponse.json({ 
        error: 'Session validation failed',
        debug: { sessionToken: sessionToken.substring(0, 10) + '...' }
      }, { status: 401 })
    }

    return NextResponse.json({ 
      success: true,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        is_staff: user.is_staff,
        has_paid: user.has_paid
      }
    })

  } catch (error: any) {
    console.error('Debug session error:', error)
    return NextResponse.json({ 
      error: 'Session debug failed',
      message: error.message,
      stack: error.stack
    }, { status: 500 })
  }
}
