import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { AuthService } from '@/lib/auth'

export async function GET(request: NextRequest) {
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

    // Fetch all users with additional info
    const { data: users, error } = await supabase
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
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
    }

    // Get receipt counts for each user (if receipts table exists)
    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        try {
          // Try to get receipt count - adjust table name if needed
          const { count: receiptCount } = await supabase
            .from('receipts')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id)

          return {
            ...user,
            total_receipts: receiptCount || 0
          }
        } catch {
          // If receipts table doesn't exist or there's an error, just return user without receipt count
          return {
            ...user,
            total_receipts: 0
          }
        }
      })
    )

    return NextResponse.json({ users: usersWithStats })

  } catch (error) {
    console.error('Error in admin users API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
