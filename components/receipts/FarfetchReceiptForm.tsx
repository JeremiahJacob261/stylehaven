import React from 'react';
import { FarfetchReceiptData } from '@/types/receipt-types';

interface FarfetchReceiptFormProps {
  data: FarfetchReceiptData;
  onInputChange: (field: keyof FarfetchReceiptData, value: string) => void;
}

export default function FarfetchReceiptForm({ data, onInputChange }: FarfetchReceiptFormProps) {
  return (
    <div className="space-y-6">
      {/* Customer Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Customer Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input 
              type="text" 
              value={data.FIRSTNAME} 
              onChange={(e) => onInputChange('FIRSTNAME', e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="John"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Order Number</label>
            <input 
              type="text" 
              value={data.ORDERNUMBER} 
              onChange={(e) => onInputChange('ORDERNUMBER', e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="FF123456789"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Date</label>
          <input 
            type="text" 
            value={data.DELIVERY} 
            onChange={(e) => onInputChange('DELIVERY', e.target.value)} 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="December 5, 2024"
          />
        </div>
      </div>

      {/* Product Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Product Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
            <input 
              type="text" 
              value={data.BRAND} 
              onChange={(e) => onInputChange('BRAND', e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Balenciaga"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Full Name</label>
            <input 
              type="text" 
              value={data.FULLNAME} 
              onChange={(e) => onInputChange('FULLNAME', e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Triple S Sneakers"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Image URL</label>
          <input 
            type="text" 
            value={data.PRODUCT_IMAGE} 
            onChange={(e) => onInputChange('PRODUCT_IMAGE', e.target.value)} 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            placeholder="/farfetch/farfetch_files/PRODUCT_IMAGE"
          />
        </div>
      </div>

      {/* Pricing Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Pricing Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Price</label>
            <input 
              type="text" 
              value={data.PRODUCT_PRICE} 
              onChange={(e) => onInputChange('PRODUCT_PRICE', e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="€ 1,050"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Cost</label>
            <input 
              type="text" 
              value={data.SHIPPING_COST} 
              onChange={(e) => onInputChange('SHIPPING_COST', e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Free"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tax Amount</label>
            <input 
              type="text" 
              value={data.TAX_AMOUNT} 
              onChange={(e) => onInputChange('TAX_AMOUNT', e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="€ 200.00"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount</label>
          <input 
            type="text" 
            value={data.TOTAL_AMOUNT} 
            onChange={(e) => onInputChange('TOTAL_AMOUNT', e.target.value)} 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="€ 1,050.00"
          />
        </div>
      </div>

      {/* Shipping Address */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Shipping Address</h3>
        <div className="grid grid-cols-1 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address Line {i}</label>
              <input 
                type="text" 
                value={data[`SHIPPING_ADDRESS_${i}` as keyof FarfetchReceiptData]} 
                onChange={(e) => onInputChange(`SHIPPING_ADDRESS_${i}` as keyof FarfetchReceiptData, e.target.value)} 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={i === 1 ? "John Doe" : i === 2 ? "123 Luxury Avenue" : i === 3 ? "Paris 75001" : "France"}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Billing Address */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Billing Address</h3>
        <div className="grid grid-cols-1 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <label className="block text-sm font-medium text-gray-700 mb-1">Billing Address Line {i}</label>
              <input 
                type="text" 
                value={data[`BILLING_ADDRESS_${i}` as keyof FarfetchReceiptData]} 
                onChange={(e) => onInputChange(`BILLING_ADDRESS_${i}` as keyof FarfetchReceiptData, e.target.value)} 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={i === 1 ? "John Doe" : i === 2 ? "123 Luxury Avenue" : i === 3 ? "Paris 75001" : "France"}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Payment Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Payment Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
            <input 
              type="text" 
              value={data.PAYMENT_METHOD} 
              onChange={(e) => onInputChange('PAYMENT_METHOD', e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Visa"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Card Ending</label>
            <input 
              type="text" 
              value={data.CARD_ENDING} 
              onChange={(e) => onInputChange('CARD_ENDING', e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="1234"
            />
          </div>
        </div>
      </div>
    </div>
  );
}