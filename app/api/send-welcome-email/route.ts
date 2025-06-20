import { NextRequest, NextResponse } from 'next/server'
import { EmailService } from '@/lib/email'
import { AuthService } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { userEmail, userName, userId } = await request.json()
    
    if (!userEmail || !userName) {
      return NextResponse.json({ error: 'Email and name are required' }, { status: 400 })
    }

    // Send welcome email
    const result = await EmailService.sendWelcomeEmail(userEmail, userName, userId)
    
    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Welcome email sent successfully!' 
      })
    } else {
      return NextResponse.json({ 
        error: `Failed to send welcome email: ${result.error}` 
      }, { status: 500 })
    }
  } catch (error: any) {
    console.error('Welcome email API error:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}