import nodemailer from 'nodemailer'
import puppeteer from 'puppeteer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
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
      // Get the actual receipt HTML content
      const receiptHTML = await this.getReceiptHTML(receiptUrl)

      const mailOptions = {
        from: process.env.SMTP_FROM,
        to: userEmail,
        subject: `Your ${receiptType} Receipt - NateTube`,
        html: receiptHTML, // Send the actual receipt HTML directly
        text: `Hi ${userName}, your ${receiptType} receipt is ready. Please view this email in HTML format to see your receipt.`
      }

      await transporter.sendMail(mailOptions)
      return { success: true }
    } catch (error: any) {
      console.error('Email sending failed:', error)
      return { success: false, error: error.message }
    }
  }

  static async getReceiptHTML(url: string): Promise<string> {
    let browser = null
    try {
      browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
          '--no-first-run',
          '--no-zygote',
          '--single-process'
        ]
      })

      const page = await browser.newPage()
      
      // Set viewport for proper rendering
      await page.setViewport({ width: 1200, height: 800 })
      
      // Navigate to the receipt page
      await page.goto(url, { 
        waitUntil: 'networkidle0',
        timeout: 30000 
      })
      
      // Wait for any dynamic content to load
      await page.waitForTimeout(3000)

      // Get the full HTML content of the page
      const htmlContent = await page.content()

      // Clean up the HTML for email compatibility
      const emailHTML = this.prepareHTMLForEmail(htmlContent)

      return emailHTML
    } catch (error: any) {
      console.error('HTML extraction error:', error)
      throw new Error(`Failed to get receipt HTML: ${error.message}`)
    } finally {
      if (browser) {
        await browser.close()
      }
    }
  }

  static prepareHTMLForEmail(html: string): string {
    // Remove scripts, head elements that cause issues in emails
    let emailHTML = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove all scripts
      .replace(/<link[^>]*>/gi, '') // Remove external stylesheets
      .replace(/<meta[^>]*>/gi, '') // Remove meta tags
      .replace(/<!DOCTYPE[^>]*>/gi, '') // Remove DOCTYPE

    // Add email-specific meta tags and make styles inline-friendly
    emailHTML = `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Your Receipt</title>
        <style type="text/css">
          /* Email client compatibility styles */
          table { border-collapse: collapse; }
          img { display: block; border: 0; outline: none; text-decoration: none; }
          .no-print { display: none !important; }
          
          /* Responsive styles */
          @media only screen and (max-width: 600px) {
            .container { width: 100% !important; }
            .mobile-padding { padding: 10px !important; }
          }
        </style>
      </head>
      ${emailHTML.substring(emailHTML.indexOf('<body'))}
    `

    return emailHTML
  }

  // Simple Hello World email sender
  static async sendHelloWorld(
    toEmail: string,
    userName: string = 'User'
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const mailOptions = {
        from: process.env.SMTP_FROM || 'akpomoshix@gmail.com',
        to: toEmail,
        subject: 'Hello World from NateTube!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Hello World!</h1>
              <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">NateTube Email Service Test</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 30px; background: white;">
              <h2 style="color: #333; margin-bottom: 20px;">Hi ${userName}!</h2>
              
              <p style="color: #666; line-height: 1.6; margin-bottom: 20px; font-size: 16px;">
                🎉 <strong>Hello World!</strong> This is a test email from your NateTube email service.
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
              <p style="margin: 0;">This is a test email from NateTube Receipt Generator</p>
              <p style="margin: 5px 0 0 0;">Email service is working perfectly! 🎯</p>
            </div>
          </div>
        `,
        text: `Hello World from NateTube! Hi ${userName}! This is a test email from your NateTube email service.`
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