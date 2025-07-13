import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { AuthService } from '@/lib/auth'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    // Check authentication and admin privileges
    const sessionToken = request.headers.get('authorization')?.replace('Bearer ', '') || 
                         request.cookies.get('session_token')?.value

    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const currentUser = await AuthService.validateSession(sessionToken)
    if (!currentUser || !currentUser.is_staff) {
      return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 })
    }

    const body = await request.json()
    const { is_staff, has_paid } = body

    // Prevent removing admin privileges from self
    if (currentUser.id === params.userId && is_staff === false) {
      return NextResponse.json({ 
        error: 'Cannot remove admin privileges from your own account' 
      }, { status: 400 })
    }

    // Update user
    const { data, error } = await supabase
      .from('users')
      .update({
        ...(typeof is_staff === 'boolean' && { is_staff }),
        ...(typeof has_paid === 'boolean' && { has_paid }),
        updated_at: new Date().toISOString()
      })
      .eq('id', params.userId)
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
    }

    return NextResponse.json({ user: data })

  } catch (error) {
    console.error('Error in admin user update API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    // Check authentication and admin privileges
    const sessionToken = request.headers.get('authorization')?.replace('Bearer ', '') || 
                         request.cookies.get('session_token')?.value

    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await AuthService.validateSession(sessionToken)
    if (!user || !user.is_staff) {
      return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 })
    }

    // Fetch specific user details
    const { data: userData, error } = await supabase
      .from('users')
      .select(`
        id,
        email,
        username,
        is_staff,
        has_paid,
        subscription_type,
        subscription_status,
        subscription_expires_at,
        email_verified,
        payment_method,
        created_at,
        updated_at
      `)
      .eq('id', params.userId)
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get additional user statistics
    try {
      const { count: receiptCount } = await supabase
        .from('receipts')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', params.userId)

      const { data: lastSession } = await supabase
        .from('user_sessions')
        .select('created_at')
        .eq('user_id', params.userId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      return NextResponse.json({
        user: {
          ...userData,
          total_receipts: receiptCount || 0,
          last_login: lastSession?.created_at || null
        }
      })
    } catch {
      // If tables don't exist, return basic user data
      return NextResponse.json({
        user: {
          ...userData,
          total_receipts: 0,
          last_login: null
        }
      })
    }

  } catch (error) {
    console.error('Error in admin user detail API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
