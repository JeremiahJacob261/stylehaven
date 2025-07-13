import { User } from '@/lib/auth'

export interface AdminUser extends User {
  created_at: string
  updated_at: string
  total_receipts?: number
  last_login?: string
}

export interface Analytics {
  totalUsers: number
  freeUsers: number
  paidUsers: number
  staffUsers: number
  monthlySignups: number
  totalReceipts: number
  revenueThisMonth: number
}

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleString()
}

export const formatShortDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString()
}

export const getUserTypeLabel = (user: AdminUser): string => {
  if (user.is_staff) return 'Staff'
  if (user.has_paid) return 'Premium'
  return 'Free'
}

export const getSubscriptionStatus = (user: AdminUser): string => {
  if (user.is_staff) return 'Staff'
  if (!user.has_paid) return 'Free'
  
  if (user.subscription_expires_at) {
    const expiresAt = new Date(user.subscription_expires_at)
    const now = new Date()
    return expiresAt > now ? 'Active' : 'Expired'
  }
  
  return user.subscription_status || 'Unknown'
}

export const calculateConversionRate = (paidUsers: number, totalUsers: number): number => {
  if (totalUsers === 0) return 0
  return Number(((paidUsers / totalUsers) * 100).toFixed(1))
}

export const getStatusBadgeColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'staff':
      return 'bg-purple-100 text-purple-800'
    case 'premium':
    case 'active':
      return 'bg-green-100 text-green-800'
    case 'free':
      return 'bg-gray-100 text-gray-800'
    case 'expired':
    case 'cancelled':
      return 'bg-red-100 text-red-800'
    case 'inactive':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
