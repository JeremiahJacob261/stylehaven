import { createServerSupabaseClient } from './supabase'

export async function getReceiptData(receiptId: string) {
  const supabase = createServerSupabaseClient()
  
  try {
    const { data, error } = await supabase
      .from('receipts')
      .select('*')
      .eq('id', receiptId)
      .single()

    if (error) {
      console.error('Error fetching receipt:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error in getReceiptData:', error)
    return null
  }
}