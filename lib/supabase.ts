import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client for SSR
export const createServerSupabaseClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role for server-side
  )
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          username: string
          is_staff: boolean
          has_paid: boolean
          payment_method: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          username: string
          is_staff?: boolean
          has_paid?: boolean
          payment_method?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          username?: string
          is_staff?: boolean
          has_paid?: boolean
          payment_method?: string | null
          updated_at?: string
        }
      }
    }
  }
}