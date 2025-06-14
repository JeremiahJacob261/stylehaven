import { NextRequest, NextResponse } from 'next/server'
import { SimpleEmailService } from '@/lib/simple-email'

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json()
    
    if (!email) {
      return NextResponse.json({ error: 'Email address is required' }, { status: 400 })
    }

    // Test email configuration first
    const configTest = await SimpleEmailService.testEmailConfig()
    if (!configTest.success) {
      return NextResponse.json({ 
        error: `Email configuration failed: ${configTest.error}` 
      }, { status: 500 })
    }

    // Send hello world email
    const result = await SimpleEmailService.sendHelloWorld(email, name)
    
    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Hello World email sent successfully!' 
      })
    } else {
      return NextResponse.json({ 
        error: `Failed to send email: ${result.error}` 
      }, { status: 500 })
    }
  } catch (error: any) {
    console.error('Test email API error:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Just test the configuration
    const result = await SimpleEmailService.testEmailConfig()
    
    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Email configuration is working!' 
      })
    } else {
      return NextResponse.json({ 
        error: `Email configuration failed: ${result.error}` 
      }, { status: 500 })
    }
  } catch (error: any) {
    console.error('Email config test error:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}