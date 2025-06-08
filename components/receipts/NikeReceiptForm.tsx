import React from 'react';
import { NikeReceiptData } from '@/types/receipt-types';

interface NikeReceiptFormProps {
  data: NikeReceiptData;
  onInputChange: (field: keyof NikeReceiptData, value: string) => void;
}

export function NikeReceiptForm({ data, onInputChange }: NikeReceiptFormProps) {
  return (
    <div className="space-y-6">
      {/* Customer Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Customer Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              value={data.WHOLE_NAME} 
              onChange={(e) => onInputChange('WHOLE_NAME', e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input 
              type="text" 
              value={data.FIRSTNAME} 
              onChange={(e) => onInputChange('FIRSTNAME', e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Order Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Order Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Order Number</label>
            <input 
              type="text" 
              value={data.ORDER_NUMBER} 
              onChange={(e) => onInputChange('ORDER_NUMBER', e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Order Date</label>
            <input 
              type="text" 
              value={data.ORDER_DATE} 
              onChange={(e) => onInputChange('ORDER_DATE', e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Date</label>
          <input 
            type="text" 
            value={data.DELIVERY_DATE} 
            onChange={(e) => onInputChange('DELIVERY_DATE', e.target.value)} 
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
            <input 
              type="text" 
              value={data.SIZE} 
              onChange={(e) => onInputChange('SIZE', e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input 
              type="text" 
              value={data.PRICE} 
              onChange={(e) => onInputChange('PRICE', e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total</label>
            <input 
              type="text" 
              value={data.TOTAL} 
              onChange={(e) => onInputChange('TOTAL', e.target.value)} 
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

      {/* Address Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Address Information</h3>
        <div className="grid grid-cols-1 gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address Line {i}</label>
              <input 
                type="text" 
                value={data[`ADDRESS${i}` as keyof NikeReceiptData]} 
                onChange={(e) => onInputChange(`ADDRESS${i}` as keyof NikeReceiptData, e.target.value)} 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
            <input 
              type="text" 
              value={data.CURRENCY} 
              onChange={(e) => onInputChange('CURRENCY', e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Card Ending</label>
            <input 
              type="text" 
              value={data.CARD_END} 
              onChange={(e) => onInputChange('CARD_END', e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}