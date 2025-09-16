import { createBucketClient } from '@cosmicjs/sdk'
import type { 
  Product, 
  Merchant, 
  PriceListing, 
  Category,
  CosmicResponse,
  SearchFilters,
  ApiError
} from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Get all price listings with product and merchant data
export async function getPriceListings(): Promise<PriceListing[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'price-listings' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as PriceListing[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch price listings')
  }
}

// Get price listings for a specific product
export async function getPriceListingsByProduct(productId: string): Promise<PriceListing[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'price-listings',
        'metadata.product': productId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    // Sort by price (lowest first)
    const listings = response.objects as PriceListing[]
    return listings.sort((a, b) => a.metadata.current_price - b.metadata.current_price)
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch product price listings')
  }
}

// Get all products
export async function getProducts(): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'products',
        'metadata.is_active': true
      })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1)
    
    return response.objects as Product[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch products')
  }
}

// Get a single product by slug
export async function getProduct(slug: string): Promise<Product | null> {
  try {
    const response = await cosmic.objects
      .findOne({ 
        type: 'products',
        slug: slug
      })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1)
    
    return response.object as Product
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch product')
  }
}

// Get all merchants
export async function getMerchants(): Promise<Merchant[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'merchants' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Merchant[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch merchants')
  }
}

// Get featured merchants
export async function getFeaturedMerchants(): Promise<Merchant[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'merchants',
        'metadata.is_featured': true
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Merchant[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch featured merchants')
  }
}

// Get categories (when available)
export async function getCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Category[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch categories')
  }
}

// Search products with filters
export async function searchProducts(filters: SearchFilters): Promise<Product[]> {
  try {
    const query: Record<string, any> = { 
      type: 'products',
      'metadata.is_active': true
    }
    
    if (filters.category) {
      query['metadata.category'] = filters.category
    }
    
    if (filters.brand) {
      query['metadata.brand'] = filters.brand
    }
    
    const response = await cosmic.objects
      .find(query)
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1)
    
    let products = response.objects as Product[]
    
    // Apply text search filter
    if (filters.query) {
      const searchTerm = filters.query.toLowerCase()
      products = products.filter(product => 
        product.metadata.product_name.toLowerCase().includes(searchTerm) ||
        product.metadata.brand?.toLowerCase().includes(searchTerm) ||
        product.metadata.keywords?.toLowerCase().includes(searchTerm)
      )
    }
    
    return products
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to search products')
  }
}

// Get lowest price for a product
export async function getLowestPrice(productId: string): Promise<number | null> {
  try {
    const listings = await getPriceListingsByProduct(productId)
    
    if (listings.length === 0) {
      return null
    }
    
    return Math.min(...listings.map(listing => listing.metadata.current_price))
  } catch (error) {
    console.error('Error getting lowest price:', error)
    return null
  }
}

// Get price comparison data for homepage
export async function getPriceComparisonData() {
  try {
    const [priceListings, products, merchants] = await Promise.all([
      getPriceListings(),
      getProducts(),
      getFeaturedMerchants()
    ])
    
    return {
      priceListings,
      products,
      merchants,
      totalProducts: products.length,
      totalMerchants: merchants.length,
      totalListings: priceListings.length
    }
  } catch (error) {
    console.error('Error getting price comparison data:', error)
    throw new Error('Failed to load price comparison data')
  }
}

// Helper function to format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Helper function to calculate savings
export function calculateSavings(originalPrice: number, currentPrice: number): number {
  return originalPrice - currentPrice
}

// Helper function to get availability color
export function getAvailabilityColor(status: string): string {
  switch (status) {
    case 'in_stock':
      return 'text-success-600'
    case 'limited_stock':
      return 'text-warning-600'
    case 'out_of_stock':
      return 'text-error-600'
    case 'pre_order':
      return 'text-primary-600'
    default:
      return 'text-secondary-600'
  }
}