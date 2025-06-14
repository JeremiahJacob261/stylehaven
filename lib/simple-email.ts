import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

export class SimpleEmailService {
  static async sendHelloWorld(
    recipientEmail: string,
    recipientName?: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const mailOptions = {
        from: process.env.SMTP_FROM,
        to: recipientEmail,
        subject: 'Hello World from NateTube!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; margin-bottom: 20px;">
              <h1 style="color: white; margin: 0; font-size: 32px;">Hello World! 🌍</h1>
              <p style="color: white; margin: 10px 0 0 0; opacity: 0.9; font-size: 18px;">
                This is a test email from NateTube
              </p>
            </div>
            
            <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; text-align: center;">
              <h2 style="color: #333; margin-bottom: 20px;">
                ${recipientName ? `Hi ${recipientName}!` : 'Hello there!'}
              </h2>
              
              <p style="color: #666; line-height: 1.6; font-size: 16px; margin-bottom: 20px;">
                This is a simple "Hello World" email to test our email service configuration.
                If you're seeing this, it means our email system is working perfectly! ✅
              </p>
              
              <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea; margin: 20px 0;">
                <h3 style="margin: 0 0 10px 0; color: #333;">Email Service Status:</h3>
                <p style="margin: 5px 0; color: #666;"><strong>Status:</strong> ✅ Working</p>
                <p style="margin: 5px 0; color: #666;"><strong>Sent at:</strong> ${new Date().toLocaleString()}</p>
                <p style="margin: 5px 0; color: #666;"><strong>From:</strong> NateTube Email Service</p>
              </div>
              
              <p style="color: #666; line-height: 1.6; font-size: 14px; margin: 20px 0;">
                This is an automated test email. No action is required from you.
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 20px; padding: 20px; background: #e9ecef; border-radius: 10px;">
              <p style="margin: 0; color: #666; font-size: 14px;">
                This email was sent from NateTube Receipt Generator
              </p>
              <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">
                Test email service - Hello World! 🚀
              </p>
            </div>
          </div>
        `,
        text: `
Hello World!

${recipientName ? `Hi ${recipientName}!` : 'Hello there!'}

This is a simple "Hello World" email to test our email service configuration.
If you're seeing this, it means our email system is working perfectly!

Email Service Status: Working
Sent at: ${new Date().toLocaleString()}
From: NateTube Email Service

This is an automated test email. No action is required from you.

This email was sent from NateTube Receipt Generator
Test email service - Hello World!
        `
      }

      const result = await transporter.sendMail(mailOptions)
      console.log('Hello World email sent successfully:', result.messageId)
      
      return { success: true }
    } catch (error: any) {
      console.error('Hello World email sending failed:', error)
      return { success: false, error: error.message }
    }
  }

  // Test email configuration
  static async testEmailConfig(): Promise<{ success: boolean; error?: string }> {
    try {
      await transporter.verify()
      console.log('Email configuration is valid!')
      return { success: true }
    } catch (error: any) {
      console.error('Email configuration test failed:', error)
      return { success: false, error: error.message }
    }
  }
}