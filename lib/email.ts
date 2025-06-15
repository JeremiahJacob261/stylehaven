import nodemailer from 'nodemailer'
import axios from 'axios'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export class EmailService {
  static async sendReceiptEmail(
    userEmail: string,
    userName: string,
    receiptType: string,
    receiptUrl: string,
    receiptData?: any
  ): Promise<{ success: boolean; error?: string }> {
    try {
      console.log('🚀 Fetching receipt HTML from:', receiptUrl)
      
      // Fetch the HTML content using axios (just like your working script)
      const response = await axios.get(receiptUrl)
      const htmlContent = response.data

      console.log('📧 Sending email...')
      
      // Send email with the fetched HTML content
      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: userEmail,
        subject: `Your ${receiptType} Receipt - StyleHaaven`,
        html: htmlContent,
      })

      console.log('✅ Email sent successfully!')
      return { success: true }
    } catch (error: any) {
      console.error('❌ Email sending failed:', error.message)
      return { success: false, error: error.message }
    }
  }

  // Simple Hello World email sender
  static async sendHelloWorld(
    toEmail: string,
    userName: string = 'User'
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const mailOptions = {
        from: process.env.SMTP_FROM,
        to: toEmail,
        subject: 'Hello World from StyleHaaven!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Hello World!</h1>
              <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">StyleHaaven Email Service Test</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 30px; background: white;">
              <h2 style="color: #333; margin-bottom: 20px;">Hi ${userName}!</h2>
              
              <p style="color: #666; line-height: 1.6; margin-bottom: 20px; font-size: 16px;">
                🎉 <strong>Hello World!</strong> This is a test email from your StyleHaaven email service.
              </p>
              
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea; margin: 20px 0;">
                <h3 style="margin: 0 0 10px 0; color: #333;">Email Service Status:</h3>
                <p style="margin: 5px 0; color: #666;"><strong>✅ SMTP Connection:</strong> Working</p>
                <p style="margin: 5px 0; color: #666;"><strong>✅ Email Delivery:</strong> Successful</p>
                <p style="margin: 5px 0; color: #666;"><strong>✅ HTML Rendering:</strong> Active</p>
                <p style="margin: 5px 0; color: #666;"><strong>📧 From:</strong> ${process.env.SMTP_FROM}</p>
                <p style="margin: 5px 0; color: #666;"><strong>📅 Sent:</strong> ${new Date().toLocaleString()}</p>
              </div>
              
              <p style="color: #666; line-height: 1.6; margin: 20px 0;">
                Your email service is configured correctly and ready to send receipt emails!
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <div style="background: #667eea; color: white; padding: 12px 30px; border-radius: 6px; display: inline-block; font-weight: bold;">
                  🚀 Email Service Ready!
                </div>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background: #e9ecef; padding: 20px; text-align: center; color: #666; font-size: 14px;">
              <p style="margin: 0;">This is a test email from StyleHaaven Receipt Generator</p>
              <p style="margin: 5px 0 0 0;">Email service is working perfectly! 🎯</p>
            </div>
          </div>
        `,
        text: `Hello World from StyleHaaven! Hi ${userName}! This is a test email from your StyleHaaven email service.`
      }

      const info = await transporter.sendMail(mailOptions)
      console.log('Email sent successfully:', info.messageId)
      
      return { success: true }
    } catch (error: any) {
      console.error('Email sending failed:', error)
      return { success: false, error: error.message }
    }
  }

  // Test SMTP connection
  static async testConnection(): Promise<{ success: boolean; error?: string }> {
    try {
      await transporter.verify()
      console.log('SMTP connection verified successfully')
      return { success: true }
    } catch (error: any) {
      console.error('SMTP connection failed:', error)
      return { success: false, error: error.message }
    }
  }
}