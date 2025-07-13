import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 })
    }

    // Update user to be staff
    const { data, error } = await supabase
      .from('users')
      .update({ 
        is_staff: true,
        has_paid: true // Staff also get premium access
      })
      .eq('email', email)
      .select('id, email, username, is_staff, has_paid')

    if (error) {
      return NextResponse.json({ 
        error: 'Failed to update user', 
        details: error.message 
      }, { status: 500 })
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ 
      success: true, 
      user: data[0] 
    })

  } catch (error: any) {
    return NextResponse.json({ 
      error: 'Failed to make user staff', 
      message: error.message 
    }, { status: 500 })
  }
}
