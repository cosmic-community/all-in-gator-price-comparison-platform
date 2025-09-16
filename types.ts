// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  status?: string;
  thumbnail?: string;
  published_at?: string;
  modified_by?: string;
  created_by?: string;
}

// Product interface
export interface Product extends CosmicObject {
  type: 'products';
  metadata: {
    product_name: string;
    description?: string;
    category?: string;
    brand?: string;
    model_number?: string;
    primary_image?: {
      url: string;
      imgix_url: string;
    };
    additional_images?: Array<{
      url: string;
      imgix_url: string;
    }>;
    specifications?: Record<string, any>;
    keywords?: string;
    is_active: boolean;
  };
}

// Merchant interface
export interface Merchant extends CosmicObject {
  type: 'merchants';
  metadata: {
    merchant_name: string;
    website_url: string;
    logo?: {
      url: string;
      imgix_url: string;
    };
    description?: string;
    country?: {
      key: string;
      value: string;
    };
    commission_rate?: number;
    api_status?: {
      key: string;
      value: string;
    };
    is_featured: boolean;
  };
}

// Price listing interface
export interface PriceListing extends CosmicObject {
  type: 'price-listings';
  metadata: {
    product: Product;
    merchant: Merchant;
    current_price: number;
    original_price?: number;
    discount_percentage?: number;
    product_url: string;
    availability_status: {
      key: 'in_stock' | 'out_of_stock' | 'limited_stock' | 'pre_order';
      value: 'In Stock' | 'Out of Stock' | 'Limited Stock' | 'Pre Order';
    };
    shipping_cost?: number;
    estimated_delivery_days?: number;
    rating?: number;
    total_reviews?: number;
    last_updated: string;
  };
}

// Category interface
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    category_name: string;
    description?: string;
    icon?: {
      url: string;
      imgix_url: string;
    };
    parent_category?: Category;
    display_order?: number;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Type guards
export function isProduct(obj: CosmicObject): obj is Product {
  return obj.type === 'products';
}

export function isMerchant(obj: CosmicObject): obj is Merchant {
  return obj.type === 'merchants';
}

export function isPriceListing(obj: CosmicObject): obj is PriceListing {
  return obj.type === 'price-listings';
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}

// Utility types
export type AvailabilityStatus = 'in_stock' | 'out_of_stock' | 'limited_stock' | 'pre_order';
export type ApiStatus = 'active' | 'pending' | 'inactive';
export type Country = 'IN' | 'US' | 'UK' | 'SG';

// Search and filter types
export interface SearchFilters {
  query?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  availability?: AvailabilityStatus;
  merchant?: string;
}

// Component prop types
export interface ProductCardProps {
  product: Product;
  priceListings?: PriceListing[];
  className?: string;
}

export interface MerchantCardProps {
  merchant: Merchant;
  className?: string;
}

export interface PriceComparisonProps {
  priceListings: PriceListing[];
  className?: string;
}

// Error handling
export interface ApiError {
  status: number;
  message: string;
}

export function isApiError(error: unknown): error is ApiError {
  return typeof error === 'object' && error !== null && 'status' in error;
}