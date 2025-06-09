import React from 'react';
import { GalleryDeptReceiptData } from '@/types/receipt-types';

interface GalleryDeptReceiptFormProps {
  data: GalleryDeptReceiptData;
  onInputChange: (field: keyof GalleryDeptReceiptData, value: string) => void;
}

export default function GalleryDeptReceiptForm({ data, onInputChange }: GalleryDeptReceiptFormProps) {
  return (
    <div className="space-y-6">
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
              placeholder="GD123456789"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Order Date</label>
            <input 
              type="text" 
              value={data.ORDER_DATE} 
              onChange={(e) => onInputChange('ORDER_DATE', e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="December 1, 2024"
            />
          </div>
        </div>
      </div>

      {/* Customer Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Customer Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
            <input 
              type="text" 
              value={data.CUSTOMER_NAME} 
              onChange={(e) => onInputChange('CUSTOMER_NAME', e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer Email</label>
            <input 
              type="email" 
              value={data.CUSTOMER_EMAIL} 
              onChange={(e) => onInputChange('CUSTOMER_EMAIL', e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="john.doe@example.com"
            />
          </div>
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
            placeholder="Gallery Dept. T-Shirt"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Size</label>
            <input 
              type="text" 
              value={data.PRODUCT_SIZE} 
              onChange={(e) => onInputChange('PRODUCT_SIZE', e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="M"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Price</label>
            <input 
              type="text" 
              value={data.PRODUCT_PRICE} 
              onChange={(e) => onInputChange('PRODUCT_PRICE', e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="$75.00"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                  if (event.target?.result) {
                    setTimeout(() => {
                      onInputChange(
                        "PRODUCT_IMAGE",
                        event?.target?.result as string
                      );
                      console.log(
                        "Image uploaded successfully",
                        event?.target?.result
                      );
                    }, 0);
                  }
                };
                reader.readAsDataURL(file);
              }
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {data.PRODUCT_IMAGE && (
            <div className="mt-2">
              <img
                src={data.PRODUCT_IMAGE}
                alt="Product preview"
                className="w-32 h-32 object-cover rounded-lg border"
              />
            </div>
          )}
        </div>
      </div>

      {/* Pricing Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Pricing Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Cost</label>
            <input 
              type="text" 
              value={data.SHIPPING_COST} 
              onChange={(e) => onInputChange('SHIPPING_COST', e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="$10.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tax Amount</label>
            <input 
              type="text" 
              value={data.TAX_AMOUNT} 
              onChange={(e) => onInputChange('TAX_AMOUNT', e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="$6.25"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount</label>
            <input 
              type="text" 
              value={data.TOTAL_AMOUNT} 
              onChange={(e) => onInputChange('TOTAL_AMOUNT', e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="$91.25"
            />
          </div>
        </div>
      </div>

      {/* Shipping Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Shipping Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tracking Number</label>
            <input 
              type="text" 
              value={data.TRACKING_NUMBER} 
              onChange={(e) => onInputChange('TRACKING_NUMBER', e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="1Z999AA1234567890"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Delivery</label>
            <input 
              type="text" 
              value={data.ESTIMATED_DELIVERY} 
              onChange={(e) => onInputChange('ESTIMATED_DELIVERY', e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="December 5, 2024"
            />
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Shipping Address</h3>
        <div className="grid grid-cols-1 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address Line {i}</label>
              <input 
                type="text" 
                value={data[`SHIPPING_ADDRESS_${i}` as keyof GalleryDeptReceiptData]} 
                onChange={(e) => onInputChange(`SHIPPING_ADDRESS_${i}` as keyof GalleryDeptReceiptData, e.target.value)} 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={i === 1 ? "John Doe" : i === 2 ? "123 Main Street" : i === 3 ? "New York, NY 10001" : "United States"}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}