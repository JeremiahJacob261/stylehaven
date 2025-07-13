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

    // Get current date for monthly calculations
    const now = new Date()
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    // Fetch analytics data
    const [
      usersResult,
      monthlySignupsResult,
      paymentsResult
    ] = await Promise.allSettled([
      // Total users, free, paid, and staff counts
      supabase
        .from('users')
        .select('id, is_staff, has_paid, created_at')
        .order('created_at', { ascending: false }),

      // Monthly signups
      supabase
        .from('users')
        .select('id')
        .gte('created_at', firstDayOfMonth.toISOString()),

      // Revenue data (try to get from payments table)
      supabase
        .from('payments')
        .select('amount, created_at')
        .eq('status', 'completed')
        .gte('created_at', firstDayOfMonth.toISOString())
    ])

    // Initialize default values
    let totalUsers = 0
    let freeUsers = 0
    let paidUsers = 0
    let staffUsers = 0
    let monthlySignups = 0
    let revenueThisMonth = 0
    let totalReceipts = 0

    // Process users data
    if (usersResult.status === 'fulfilled' && usersResult.value.data) {
      const users = usersResult.value.data
      totalUsers = users.length

      users.forEach(user => {
        if (user.is_staff) {
          staffUsers++
        } else if (user.has_paid) {
          paidUsers++
        } else {
          freeUsers++
        }
      })
    }

    // Process monthly signups
    if (monthlySignupsResult.status === 'fulfilled' && monthlySignupsResult.value.data) {
      monthlySignups = monthlySignupsResult.value.data.length
    }

    // Process revenue data
    if (paymentsResult.status === 'fulfilled' && paymentsResult.value.data) {
      revenueThisMonth = paymentsResult.value.data.reduce((total, payment) => {
        return total + (payment.amount || 0)
      }, 0)
    }

    // Try to get receipt count
    try {
      const { count } = await supabase
        .from('receipts')
        .select('*', { count: 'exact', head: true })

      totalReceipts = count || 0
    } catch (error) {
      // If receipts table doesn't exist, keep default value
      console.log('Receipts table not found or accessible:', error)
    }

    const analytics = {
      totalUsers,
      freeUsers,
      paidUsers,
      staffUsers,
      monthlySignups,
      totalReceipts,
      revenueThisMonth: Number((revenueThisMonth / 100).toFixed(2)) // Convert from cents if stored as cents
    }

    return NextResponse.json(analytics)

  } catch (error) {
    console.error('Error in admin analytics API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
