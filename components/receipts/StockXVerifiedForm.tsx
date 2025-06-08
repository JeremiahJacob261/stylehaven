// components/forms/StockXVerifiedForm.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface StockXVerifiedFormData {
  productName: string
  productImage: string
  productLink: string
  customerName: string
  orderNumber: string
  trackingNumber: string
  deliveryDate: string
  price: string
  size: string
  color: string
  verificationDate: string
}

interface StockXVerifiedFormProps {
  onGenerate: (data: StockXVerifiedFormData) => void
}

export function StockXVerifiedForm({ onGenerate }: StockXVerifiedFormProps) {
  const [formData, setFormData] = useState<StockXVerifiedFormData>({
    productName: '',
    productImage: '',
    productLink: '',
    customerName: '',
    orderNumber: '',
    trackingNumber: '',
    deliveryDate: '',
    price: '',
    size: '',
    color: '',
    verificationDate: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onGenerate(formData)
  }

  const handleChange = (field: keyof StockXVerifiedFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>StockX Verified & Shipped</CardTitle>
        <CardDescription>
          Generate a StockX verification email showing item has been verified and shipped
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="productName">Product Name</Label>
              <Input
                id="productName"
                value={formData.productName}
                onChange={(e) => handleChange('productName', e.target.value)}
                placeholder="e.g., Nike Air Jordan 1 Retro High"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                value={formData.customerName}
                onChange={(e) => handleChange('customerName', e.target.value)}
                placeholder="e.g., John Doe"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="orderNumber">Order Number</Label>
              <Input
                id="orderNumber"
                value={formData.orderNumber}
                onChange={(e) => handleChange('orderNumber', e.target.value)}
                placeholder="e.g., SX-12345678"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="trackingNumber">Tracking Number</Label>
              <Input
                id="trackingNumber"
                value={formData.trackingNumber}
                onChange={(e) => handleChange('trackingNumber', e.target.value)}
                placeholder="e.g., 1Z999AA1234567890"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
                placeholder="e.g., $299"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="size">Size</Label>
              <Input
                id="size"
                value={formData.size}
                onChange={(e) => handleChange('size', e.target.value)}
                placeholder="e.g., 10.5"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Input
                id="color"
                value={formData.color}
                onChange={(e) => handleChange('color', e.target.value)}
                placeholder="e.g., Black/Red"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="verificationDate">Verification Date</Label>
              <Input
                id="verificationDate"
                type="date"
                value={formData.verificationDate}
                onChange={(e) => handleChange('verificationDate', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deliveryDate">Expected Delivery Date</Label>
              <Input
                id="deliveryDate"
                type="date"
                value={formData.deliveryDate}
                onChange={(e) => handleChange('deliveryDate', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="productImage">Product Image URL</Label>
              <Input
                id="productImage"
                value={formData.productImage}
                onChange={(e) => handleChange('productImage', e.target.value)}
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="productLink">Product Link</Label>
            <Input
              id="productLink"
              value={formData.productLink}
              onChange={(e) => handleChange('productLink', e.target.value)}
              placeholder="https://stockx.com/product-link"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Generate StockX Verification Email
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}