import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { supabase } from './supabase'
import { v4 as uuidv4 } from 'uuid'

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key'

export interface User {
  has_paid: any
  id: string
  email: string
  username: string
  is_staff: boolean
  subscription_type: 'free' | 'monthly' | 'yearly'
  subscription_status: 'active' | 'inactive' | 'cancelled' | 'expired'
  subscription_expires_at: string | null
  email_verified: boolean
  payment_method?: string
}

export interface AuthResult {
  success: boolean
  user?: User
  token?: string
  error?: string
}

export class AuthService {
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 12
    return bcrypt.hash(password, saltRounds)
  }

  static async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
  }

  static generateToken(userId: string): string {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' })
  }

  static verifyToken(token: string): { userId: string } | null {
    try {
      return jwt.verify(token, JWT_SECRET) as { userId: string }
    } catch {
      return null
    }
  }

  static async createSession(userId: string): Promise<string> {
    const sessionToken = uuidv4()
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7) // 7 days

    await supabase
      .from('user_sessions')
      .insert({
        user_id: userId,
        session_token: sessionToken,
        expires_at: expiresAt.toISOString()
      })

    return sessionToken
  }

  static async validateSession(sessionToken: string): Promise<User | null> {
    const { data: session } = await supabase
      .from('user_sessions')
      .select(`
        user_id,
        expires_at,
        users (
          id,
          email,
          username,
          is_staff,
          subscription_type,
          subscription_status,
          subscription_expires_at,
          email_verified
        )
      `)
      .eq('session_token', sessionToken)
      .single()

    if (!session || new Date(session.expires_at) < new Date()) {
      return null
    }

    return session.users as unknown as User
  }

  static async register(email: string, username: string, password: string, isStaff: boolean = false): Promise<AuthResult> {
    try {
      // Check if user exists
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .or(`email.eq.${email},username.eq.${username}`)
        .single()

      if (existingUser) {
        return { success: false, error: 'User already exists' }
      }

      // Hash password
      const passwordHash = await this.hashPassword(password)
      const verificationToken = uuidv4()

      // Create user
      const { data: user, error } = await supabase
        .from('users')
        .insert({
          email,
          username,
          password_hash: passwordHash,
          is_staff: isStaff,
          has_paid: isStaff, // Staff get free access
          verification_token: verificationToken
        })
        .select('id, email, username, is_staff, has_paid, payment_method, email_verified')
        .single()

      if (error) {
        return { success: false, error: error.message }
      }

      // Create session
      const sessionToken = await this.createSession(user.id)

      // Send welcome email
      try {
        await fetch('/api/send-welcome-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userEmail: user.email,
            userName: user.username || user.email.split('@')[0],
            userId: user.id
          })
        })
      } catch (error) {
        console.error('Failed to send welcome email:', error)
        // Don't fail the signup if email fails
      }

      return {
        success: true,
        user: user as unknown as User,
        token: sessionToken
      }


      
    } catch (error: any) {
      return { success: false, error: error.message }
    }
    //send welcome email

  
  }

  static async login(email: string, password: string): Promise<AuthResult> {
    try {
      // Get user
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single()

      if (error || !user) {
        return { success: false, error: 'Invalid credentials' }
      }

      // Verify password
      const isValidPassword = await this.verifyPassword(password, user.password_hash)
      if (!isValidPassword) {
        return { success: false, error: 'Invalid credentials' }
      }

      // Create session
      const sessionToken = await this.createSession(user.id)

      return {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          is_staff: user.is_staff,
          has_paid: user.has_paid,
          payment_method: user.payment_method,
          email_verified: user.email_verified,
          subscription_type: 'free',
          subscription_status: 'active',
          subscription_expires_at: null
        },
        token: sessionToken
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  static async logout(sessionToken: string): Promise<void> {
    await supabase
      .from('user_sessions')
      .delete()
      .eq('session_token', sessionToken)
  }

  static async updatePaymentStatus(userId: string, paymentMethod: string): Promise<void> {
    await supabase
      .from('users')
      .update({
        has_paid: true,
        payment_method: paymentMethod,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
  }

  static async updateSubscription(
    userId: string, 
    subscriptionType: string,
    subscriptionStatus: string,
    expiresAt: Date,
    paymentId?: string
  ): Promise<void> {
    const expirationDate = new Date()
    expirationDate.setDate(expirationDate.getDate() + 30) // 30 days from now
    
    await supabase
      .from('users')
      .update({
        subscription_type: subscriptionType,
        subscription_status: subscriptionStatus,
        subscription_expires_at: expirationDate.toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
  }

  static async createPaymentRecord(paymentData: {
    user_id: string
    payment_method: string
    payment_provider: string
    payment_id: string
    amount: number
    currency: string
    status: string
    subscription_type: string
    subscription_period_start: Date
    subscription_period_end: Date
    metadata?: any
  }): Promise<void> {
    await supabase
      .from('payments')
      .insert(paymentData)
  }

  static async hasActiveSubscription(userId: string): Promise<boolean> {
    const { data: user } = await supabase
      .from('users')
      .select('subscription_status, subscription_expires_at, is_staff')
      .eq('id', userId)
      .single()

    if (!user) return false
    
    // Staff always have access
    if (user.is_staff) return true

    // Check if subscription is active and not expired
    if (user.subscription_status === 'active' && user.subscription_expires_at) {
      return new Date(user.subscription_expires_at) > new Date()
    }

    return false
  }
}