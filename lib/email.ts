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

  // Beautiful Welcome Email for New Users
  static async sendWelcomeEmail(
    userEmail: string,
    userName: string,
    userId: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const dashboardUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/`
      const supportEmail = "super@natetube.com"
      
      const mailOptions = {
        from: process.env.SMTP_FROM,
        to: userEmail,
        subject: '🎉 Welcome to NateTube - Your Receipt Generation Journey Starts Here!',
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to NateTube</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
              
              <!-- Header with Gradient -->
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center; border-radius: 0;">
                <div style="width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                  <span style="font-size: 32px; color: white;">👑</span>
                </div>
                <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">Welcome to NateTube!</h1>
                <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 18px; font-weight: 400;">Your professional receipt generation platform</p>
              </div>

              <!-- Welcome Message -->
              <div style="padding: 40px 30px;">
                <h2 style="color: #1a202c; margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">
                  Hello ${userName}! 🎊
                </h2>
                
                <p style="color: #4a5568; line-height: 1.6; font-size: 16px; margin: 0 0 25px 0;">
                  We're absolutely thrilled to have you join the NateTube community! Your account has been successfully created, and you're now ready to generate professional receipts that look authentic and polished.
                </p>

                <!-- Features Grid -->
                <div style="background: #f7fafc; padding: 30px; border-radius: 12px; margin: 25px 0; border-left: 4px solid #667eea;">
                  <h3 style="color: #2d3748; margin: 0 0 20px 0; font-size: 20px; font-weight: 600;">
                    🚀 What you can do with NateTube:
                  </h3>
                  
                  <div style="margin-bottom: 15px;">
                    <div style="display: flex; align-items: flex-start; margin-bottom: 12px;">
                      <span style="background: #667eea; color: white; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 12px; flex-shrink: 0;">✓</span>
                      <span style="color: #4a5568; font-size: 15px; line-height: 1.5;"><strong>Generate Premium Receipts</strong> - Access to all brand templates including Apple, Nike, Bape, and more</span>
                    </div>
                    
                    <div style="display: flex; align-items: flex-start; margin-bottom: 12px;">
                      <span style="background: #667eea; color: white; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 12px; flex-shrink: 0;">✓</span>
                      <span style="color: #4a5568; font-size: 15px; line-height: 1.5;"><strong>Professional Templates</strong> - Pixel-perfect designs that look authentic</span>
                    </div>
                    
                    <div style="display: flex; align-items: flex-start; margin-bottom: 12px;">
                      <span style="background: #667eea; color: white; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 12px; flex-shrink: 0;">✓</span>
                      <span style="color: #4a5568; font-size: 15px; line-height: 1.5;"><strong>Easy Customization</strong> - Personalize with your details in seconds</span>
                    </div>
                    
                    <div style="display: flex; align-items: flex-start; margin-bottom: 12px;">
                      <span style="background: #667eea; color: white; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 12px; flex-shrink: 0;">✓</span>
                      <span style="color: #4a5568; font-size: 15px; line-height: 1.5;"><strong>Instant Email Delivery</strong> - Get your receipts delivered straight to your inbox</span>
                    </div>
                  </div>
                </div>

                <!-- Getting Started -->
                <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 25px; border-radius: 12px; margin: 25px 0; text-align: center;">
                  <h3 style="color: white; margin: 0 0 15px 0; font-size: 20px; font-weight: 600;">
                    🎯 Ready to Get Started?
                  </h3>
                  <p style="color: rgba(255,255,255,0.9); margin: 0 0 20px 0; font-size: 15px; line-height: 1.5;">
                    Access your dashboard and create your first professional receipt in minutes!
                  </p>
                  
                  <a href="${dashboardUrl}" style="background: white; color: #f5576c; padding: 14px 30px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 4px 15px rgba(0,0,0,0.1); transition: all 0.3s ease;">
                    🚀 Go to Dashboard
                  </a>
                </div>

                <!-- Next Steps -->
                <div style="border: 2px dashed #e2e8f0; padding: 25px; border-radius: 12px; margin: 25px 0;">
                  <h3 style="color: #2d3748; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">
                    📋 Your Next Steps:
                  </h3>
                  
                  <ol style="color: #4a5568; padding-left: 20px; margin: 0; line-height: 1.8;">
                    <li style="margin-bottom: 8px;">Choose your subscription plan (Lifetime or Monthly)</li>
                    <li style="margin-bottom: 8px;">Browse our collection of premium receipt templates</li>
                    <li style="margin-bottom: 8px;">Customize your first receipt with your details</li>
                    <li style="margin-bottom: 8px;">Download or email your professional receipt</li>
                  </ol>
                </div>

                <!-- Pricing Reminder -->
                <div style="background: #fff5f5; border: 1px solid #fed7d7; padding: 20px; border-radius: 12px; margin: 25px 0;">
                  <h3 style="color: #c53030; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">
                    💳 Special Pricing
                  </h3>
                  <p style="color: #742a2a; margin: 0; font-size: 14px; line-height: 1.5;">
                    <strong>Lifetime Access:</strong> $25 one-time payment<br>
                    <strong>Monthly Plan:</strong> $5/month (cancel anytime)
                  </p>
                </div>

                <!-- Support Section -->
                <div style="text-align: center; margin: 30px 0;">
                  <h3 style="color: #2d3748; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">
                    Need Help? We're Here for You! 💬
                  </h3>
                  <p style="color: #4a5568; margin: 0 0 15px 0; font-size: 15px; line-height: 1.5;">
                    Our support team is ready to help you get the most out of NateTube.
                  </p>
                  <a href="mailto:${supportEmail}" style="color: #667eea; text-decoration: none; font-weight: 600; font-size: 15px;">
                    📧 ${supportEmail}
                  </a>
                </div>

                <!-- Social Proof -->
                <div style="background: #edf2f7; padding: 20px; border-radius: 12px; text-align: center; margin: 25px 0;">
                  <p style="color: #4a5568; margin: 0; font-size: 14px; line-height: 1.5;">
                    ⭐⭐⭐⭐⭐<br>
                    <em>"NateTube has the most authentic receipt templates I've ever seen. Professional quality!"</em><br>
                    <strong>- Satisfied Customer</strong>
                  </p>
                </div>
              </div>

              <!-- Footer -->
              <div style="background: #2d3748; padding: 30px; text-align: center; color: white;">
                <h4 style="margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">
                  Welcome to the NateTube Family! 🎉
                </h4>
                <p style="margin: 0 0 20px 0; color: #a0aec0; font-size: 14px; line-height: 1.5;">
                  Thank you for choosing NateTube for your receipt generation needs.<br>
                  We're excited to see what you'll create!
                </p>
                
                <div style="border-top: 1px solid #4a5568; padding-top: 20px; margin-top: 20px;">
                  <p style="margin: 0; color: #a0aec0; font-size: 12px;">
                    This email was sent to ${userEmail}<br>
                    NateTube Receipt Generator • Professional Receipt Templates<br>
                    <a href="${process.env.NEXT_PUBLIC_BASE_URL}" style="color: #90cdf4; text-decoration: none;">Visit Website</a>
                  </p>
                </div>
              </div>
            </div>
          </body>
          </html>
        `,
        text: `
Welcome to NateTube, ${userName}!

We're thrilled to have you join our community! Your account has been successfully created.

What you can do with NateTube:
✓ Generate premium receipts with authentic brand templates
✓ Access professional designs for Apple, Nike, Bape, and more
✓ Easy customization with your personal details
✓ Instant email delivery of your receipts

Get started: ${dashboardUrl}

Pricing:
- Lifetime Access: $25 one-time
- Monthly Plan: $5/month

Need help? Contact us at ${supportEmail}

Thank you for choosing NateTube!
        `
      }

      await transporter.sendMail(mailOptions)
      console.log('✅ Welcome email sent successfully to:', userEmail)
      
      return { success: true }
    } catch (error: any) {
      console.error('❌ Welcome email sending failed:', error.message)
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
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
}