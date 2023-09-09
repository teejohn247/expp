
export interface IProduct {
  productName?: string;
  description?: string;
  price?: number;
  category?: string;
  brand?: string;
  image?: string;
  stockQuantity?: number;
  shippingWeight?: number;
  dimensions?: object;
	isAvailable?: boolean;
  manufacturerDetails?: object;
  warranty?: object;
  sku?: string;
  tags?: [string];
  reviews?: [];
  isFeatured?: boolean;
}
