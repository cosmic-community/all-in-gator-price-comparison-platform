import Link from 'next/link'
import type { Product, PriceListing } from '@/types'
import { formatCurrency, getAvailabilityColor } from '@/lib/cosmic'

interface ProductCardProps {
  product: Product
  priceListings?: PriceListing[]
  className?: string
}

export default function ProductCard({ product, priceListings = [], className = '' }: ProductCardProps) {
  if (!product) return null

  // Get the lowest price listing
  const lowestPriceListing = priceListings.length > 0 
    ? priceListings.sort((a, b) => a.metadata.current_price - b.metadata.current_price)[0]
    : null

  const lowestPrice = lowestPriceListing?.metadata.current_price
  const originalPrice = lowestPriceListing?.metadata.original_price
  const discountPercentage = lowestPriceListing?.metadata.discount_percentage
  const availabilityStatus = lowestPriceListing?.metadata.availability_status

  return (
    <div className={`card hover:shadow-lg transition-shadow duration-300 ${className}`}>
      {/* Product Image */}
      <div className="relative mb-4">
        <img
          src={`${product.metadata.primary_image?.imgix_url || product.thumbnail}?w=600&h=400&fit=crop&auto=format,compress`}
          alt={product.metadata.product_name}
          className="product-image"
          width={300}
          height={200}
        />
        
        {discountPercentage && discountPercentage > 0 && (
          <div className="absolute top-3 left-3 discount-badge">
            {discountPercentage}% OFF
          </div>
        )}
        
        {availabilityStatus && (
          <div className={`absolute top-3 right-3 availability-badge ${getAvailabilityColor(availabilityStatus.key)}`}>
            {availabilityStatus.value}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-secondary-900 mb-2 line-clamp-2">
          {product.metadata.product_name}
        </h3>
        
        {product.metadata.brand && (
          <p className="text-sm text-secondary-600 mb-2">
            by {product.metadata.brand}
          </p>
        )}
        
        {product.metadata.description && (
          <p className="text-sm text-secondary-600 mb-4 line-clamp-2">
            <div 
              dangerouslySetInnerHTML={{ 
                __html: product.metadata.description.replace(/<[^>]*>/g, '') 
              }} 
            />
          </p>
        )}

        {/* Price Information */}
        {lowestPrice && (
          <div className="mb-4">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-bold text-success-600">
                {formatCurrency(lowestPrice)}
              </span>
              {originalPrice && originalPrice > lowestPrice && (
                <span className="text-sm text-secondary-500 line-through">
                  {formatCurrency(originalPrice)}
                </span>
              )}
            </div>
            
            {originalPrice && originalPrice > lowestPrice && (
              <p className="text-sm text-success-600 font-medium">
                You save {formatCurrency(originalPrice - lowestPrice)}
              </p>
            )}
          </div>
        )}

        {/* Price Comparison Count */}
        {priceListings.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-secondary-600">
              {priceListings.length} price{priceListings.length !== 1 ? 's' : ''} compared
            </p>
            
            {/* Show merchant logos */}
            <div className="flex -space-x-2 mt-2">
              {priceListings.slice(0, 3).map((listing, index) => (
                <div key={listing.id} className="relative">
                  {listing.metadata.merchant.metadata.logo ? (
                    <img
                      src={`${listing.metadata.merchant.metadata.logo.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                      alt={listing.metadata.merchant.metadata.merchant_name}
                      className="w-8 h-8 rounded-full border-2 border-white bg-white"
                      width={32}
                      height={32}
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-secondary-100 flex items-center justify-center">
                      <span className="text-xs font-medium text-secondary-600">
                        {listing.metadata.merchant.metadata.merchant_name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
              ))}
              {priceListings.length > 3 && (
                <div className="w-8 h-8 rounded-full border-2 border-white bg-secondary-200 flex items-center justify-center">
                  <span className="text-xs font-medium text-secondary-600">
                    +{priceListings.length - 3}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Button */}
        <Link
          href={`/products/${product.slug}`}
          className="btn-primary w-full text-center"
        >
          Compare Prices
        </Link>
      </div>
    </div>
  )
}