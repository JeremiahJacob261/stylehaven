import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    // Get the current user's session token
    const sessionToken = request.headers.get('authorization')?.replace('Bearer ', '') || 
                         request.cookies.get('session_token')?.value

    if (!sessionToken) {
      return NextResponse.json({ error: 'No session token' }, { status: 401 })
    }

    // First, let's check if the session exists
    const { data: session, error: sessionError } = await supabase
      .from('user_sessions')
      .select('*')
      .eq('session_token', sessionToken)
      .single()

    if (sessionError) {
      return NextResponse.json({ 
        error: 'Session query error', 
        details: sessionError.message 
      }, { status: 500 })
    }

    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    // Now let's check the user
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', session.user_id)
      .single()

    if (userError) {
      return NextResponse.json({ 
        error: 'User query error', 
        details: userError.message 
      }, { status: 500 })
    }

    // Return debug info
    return NextResponse.json({
      session: {
        user_id: session.user_id,
        expires_at: session.expires_at,
        expired: new Date(session.expires_at) < new Date()
      },
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        is_staff: user.is_staff,
        has_paid: user.has_paid,
        email_verified: user.email_verified
      }
    })

  } catch (error: any) {
    return NextResponse.json({ 
      error: 'Debug failed', 
      message: error.message 
    }, { status: 500 })
  }
}
