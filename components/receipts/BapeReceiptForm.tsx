import React from 'react';
import { BapeReceiptData } from '@/types/receipt-types';

interface BapeReceiptFormProps {
  data: BapeReceiptData;
  onInputChange: (field: keyof BapeReceiptData, value: string) => void;
}

export function BapeReceiptForm({ data, onInputChange }: BapeReceiptFormProps) {
  return (
    <div className="space-y-6">
      {/* Order Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Order Information</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Order Number</label>
          <input 
            type="text" 
            value={data.ORDER_NUMBER} 
            onChange={(e) => onInputChange('ORDER_NUMBER', e.target.value)} 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Product Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Product Information</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
          <input 
            type="text" 
            value={data.PRODUCT_NAME} 
            onChange={(e) => onInputChange('PRODUCT_NAME', e.target.value)} 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Style/Size</label>
            <input 
              type="text" 
              value={data.PRODUCT_STYLE_SIZE} 
              onChange={(e) => onInputChange('PRODUCT_STYLE_SIZE', e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Price</label>
            <input 
              type="text" 
              value={data.PRODUCT_PRICE} 
              onChange={(e) => onInputChange('PRODUCT_PRICE', e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subtotal</label>
            <input 
              type="text" 
              value={data.SUBTOTAL} 
              onChange={(e) => onInputChange('SUBTOTAL', e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Cost</label>
            <input 
              type="text" 
              value={data.SHIPPING_COST} 
              onChange={(e) => onInputChange('SHIPPING_COST', e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total</label>
            <input 
              type="text" 
              value={data.ORDER_TOTAL_CURRENCY} 
              onChange={(e) => onInputChange('ORDER_TOTAL_CURRENCY', e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            placeholder="/path/to/product-image.jpg"
          />
        </div>
      </div>

      {/* Shipping Address */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Shipping Address</h3>
        <div className="grid grid-cols-1 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address Line {i}</label>
              <input 
                type="text" 
                value={data[`ADDRESS${i}` as keyof BapeReceiptData]} 
                onChange={(e) => onInputChange(`ADDRESS${i}` as keyof BapeReceiptData, e.target.value)} 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                value={data[`BILLING${i}` as keyof BapeReceiptData]} 
                onChange={(e) => onInputChange(`BILLING${i}` as keyof BapeReceiptData, e.target.value)} 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          ))}
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
  );
}