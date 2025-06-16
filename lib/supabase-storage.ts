import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabaseStorage = createClient(supabaseUrl, supabaseServiceKey)

export async function uploadImageToSupabase(file: File, receiptType: string): Promise<string | null> {
  try {
    // Generate unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${receiptType}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    
    // Upload file to Supabase storage
    const { data, error } = await supabaseStorage.storage
      .from('receipt-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Upload error:', error)
      return null
    }

    // Get public URL
    const { data: { publicUrl } } = supabaseStorage.storage
      .from('receipt-images')
      .getPublicUrl(fileName)

    return publicUrl
  } catch (error) {
    console.error('Error uploading image:', error)
    return null
  }
}

export async function uploadImageFromBase64(base64Data: string, receiptType: string): Promise<string | null> {
  try {
    // Convert base64 to blob
    const response = await fetch(base64Data)
    const blob = await response.blob()
    
    // Create file from blob
    const file = new File([blob], `product-image.jpg`, { type: 'image/jpeg' })
    
    return await uploadImageToSupabase(file, receiptType)
  } catch (error) {
    console.error('Error converting base64 to file:', error)
    return null
  }
}