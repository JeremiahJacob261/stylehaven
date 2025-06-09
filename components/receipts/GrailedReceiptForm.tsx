// filepath: /home/jerry/PROJECT/stylehaaven/components/receipts/GrailedReceiptForm.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GrailedReceiptData } from "@/types/receipt-types";

interface GrailedReceiptFormProps {
  data: GrailedReceiptData;
  onInputChange: (field: keyof GrailedReceiptData, value: string) => void;
}

export function GrailedReceiptForm({ data, onInputChange }: GrailedReceiptFormProps) {
  return (
    <div className="space-y-6">
      {/* Order Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Order Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="order-id">Order ID</Label>
            <Input
              id="order-id"
              value={data.ORDER_ID}
              onChange={(e) => onInputChange('ORDER_ID', e.target.value)}
              placeholder="GR123456789"
            />
          </div>
          <div>
            <Label htmlFor="order-date">Order Date</Label>
            <Input
              id="order-date"
              value={data.ORDER_DATE}
              onChange={(e) => onInputChange('ORDER_DATE', e.target.value)}
              placeholder="December 1, 2024"
            />
          </div>
        </div>
      </div>

      {/* Customer Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Customer Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="customer-name">Customer Name</Label>
            <Input
              id="customer-name"
              value={data.CUSTOMER_NAME}
              onChange={(e) => onInputChange('CUSTOMER_NAME', e.target.value)}
              placeholder="John Doe"
            />
          </div>
          <div>
            <Label htmlFor="customer-email">Customer Email</Label>
            <Input
              id="customer-email"
              value={data.CUSTOMER_EMAIL}
              onChange={(e) => onInputChange('CUSTOMER_EMAIL', e.target.value)}
              placeholder="john.doe@example.com"
            />
          </div>
        </div>
      </div>

      {/* Product Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Product Information</h3>
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
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="brand">Brand</Label>
            <Input
              id="brand"
              value={data.BRAND}
              onChange={(e) => onInputChange('BRAND', e.target.value)}
              placeholder="NIKE"
            />
          </div>
          <div>
            <Label htmlFor="size">Size</Label>
            <Input
              id="size"
              value={data.SIZE}
              onChange={(e) => onInputChange('SIZE', e.target.value)}
              placeholder="US 10"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="product-name">Product Name</Label>
          <Input
            id="product-name"
            value={data.PRODUCT_NAME}
            onChange={(e) => onInputChange('PRODUCT_NAME', e.target.value)}
            placeholder="Vintage Nike Sneakers"
          />
        </div>
      </div>

      {/* Pricing Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Pricing Information</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="sold-price">Sold Price</Label>
            <Input
              id="sold-price"
              value={data.SOLD_PRICE}
              onChange={(e) => onInputChange('SOLD_PRICE', e.target.value)}
              placeholder="€1000.00"
            />
          </div>
          <div>
            <Label htmlFor="tax-amount">Tax Amount</Label>
            <Input
              id="tax-amount"
              value={data.TAX_AMOUNT}
              onChange={(e) => onInputChange('TAX_AMOUNT', e.target.value)}
              placeholder="€10.00"
            />
          </div>
          <div>
            <Label htmlFor="total-amount">Total Amount</Label>
            <Input
              id="total-amount"
              value={data.TOTAL_AMOUNT}
              onChange={(e) => onInputChange('TOTAL_AMOUNT', e.target.value)}
              placeholder="€1010.00"
            />
          </div>
        </div>
      </div>

      {/* Shipping Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Shipping Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="shipping-name">Shipping Name</Label>
            <Input
              id="shipping-name"
              value={data.SHIPPING_NAME}
              onChange={(e) => onInputChange('SHIPPING_NAME', e.target.value)}
              placeholder="John Doe"
            />
          </div>
          <div>
            <Label htmlFor="shipping-address">Shipping Address</Label>
            <Input
              id="shipping-address"
              value={data.SHIPPING_ADDRESS}
              onChange={(e) => onInputChange('SHIPPING_ADDRESS', e.target.value)}
              placeholder="123 Main Street"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="shipping-city">Shipping City</Label>
            <Input
              id="shipping-city"
              value={data.SHIPPING_CITY}
              onChange={(e) => onInputChange('SHIPPING_CITY', e.target.value)}
              placeholder="London"
            />
          </div>
          <div>
            <Label htmlFor="shipping-country">Shipping Country</Label>
            <Input
              id="shipping-country"
              value={data.SHIPPING_COUNTRY}
              onChange={(e) => onInputChange('SHIPPING_COUNTRY', e.target.value)}
              placeholder="United Kingdom"
            />
          </div>
        </div>
      </div>

      {/* Seller Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Seller Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="seller-name">Seller Name</Label>
            <Input
              id="seller-name"
              value={data.SELLER_NAME}
              onChange={(e) => onInputChange('SELLER_NAME', e.target.value)}
              placeholder="Seller123"
            />
          </div>
          <div>
            <Label htmlFor="seller-location">Seller Location</Label>
            <Input
              id="seller-location"
              value={data.SELLER_LOCATION}
              onChange={(e) => onInputChange('SELLER_LOCATION', e.target.value)}
              placeholder="New York"
            />
          </div>
        </div>
      </div>
    </div>
  );
}