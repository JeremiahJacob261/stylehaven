import React from "react";
import { AppleReceiptData } from "@/types/receipt-types";

interface AppleReceiptFormProps {
  data: AppleReceiptData;
  onInputChange: (field: keyof AppleReceiptData, value: string) => void;
}

export function AppleReceiptForm({
  data,
  onInputChange,
}: AppleReceiptFormProps) {
  return (
    <div className="space-y-6">
      {/* Order Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800 border-b pb-2">
          Order Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Order Number
            </label>
            <input
              type="text"
              value={data.ORDER_NUMBER}
              onChange={(e) => onInputChange("ORDER_NUMBER", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Order Date
            </label>
            <input
              type="text"
              value={data.ORDER_DATE}
              onChange={(e) => onInputChange("ORDER_DATE", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Product Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800 border-b pb-2">
          Product Information
        </h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name
          </label>
          <input
            type="text"
            value={data.PRODUCT_NAME}
            onChange={(e) => onInputChange("PRODUCT_NAME", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Price
            </label>
            <input
              type="text"
              value={data.PRODUCT_PRICE}
              onChange={(e) => onInputChange("PRODUCT_PRICE", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shipping Cost
            </label>
            <input
              type="text"
              value={data.SHIPPING_COST}
              onChange={(e) => onInputChange("SHIPPING_COST", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Order Total
            </label>
            <input
              type="text"
              value={data.ORDER_TOTAL}
              onChange={(e) => onInputChange("ORDER_TOTAL", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
              readOnly
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
                        event?.target.result as string
                      );
                      console.log(
                        "Image uploaded successfully",
                        event?.target.result
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

      {/* Shipping Address */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800 border-b pb-2">
          Shipping Address
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address Line {i}
              </label>
              <input
                type="text"
                value={data[`ADDRESS_LINE_${i}` as keyof AppleReceiptData]}
                onChange={(e) =>
                  onInputChange(
                    `ADDRESS_LINE_${i}` as keyof AppleReceiptData,
                    e.target.value
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Billing Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800 border-b pb-2">
          Billing Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Billing Name
            </label>
            <input
              type="text"
              value={data.BILLING_NAME}
              onChange={(e) => onInputChange("BILLING_NAME", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Billing Email
            </label>
            <input
              type="email"
              value={data.BILLING_EMAIL}
              onChange={(e) => onInputChange("BILLING_EMAIL", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Billing Address Line {i}
              </label>
              <input
                type="text"
                value={data[`BILLING_ADDRESS_${i}` as keyof AppleReceiptData]}
                onChange={(e) =>
                  onInputChange(
                    `BILLING_ADDRESS_${i}` as keyof AppleReceiptData,
                    e.target.value
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
