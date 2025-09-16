import type { PriceListing, Product } from '@/types'
import ProductCard from '@/components/ProductCard'

interface PriceComparisonGridProps {
  priceListings: PriceListing[]
  products: Product[]
}

export default function PriceComparisonGrid({ priceListings, products }: PriceComparisonGridProps) {
  if (!priceListings || priceListings.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <svg className="mx-auto h-24 w-24 text-secondary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <h3 className="text-lg font-medium text-secondary-900 mb-2">No price comparisons available</h3>
          <p className="text-secondary-600">
            We're working on adding more products and merchants. Check back soon!
          </p>
        </div>
      </div>
    )
  }

  // Group price listings by product
  const productGroups = new Map<string, PriceListing[]>()
  
  priceListings.forEach(listing => {
    if (!listing.metadata.product?.id) return
    
    const productId = listing.metadata.product.id
    const existingListings = productGroups.get(productId) || []
    productGroups.set(productId, [...existingListings, listing])
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from(productGroups.entries()).map(([productId, listings]) => {
        const product = listings[0]?.metadata.product
        if (!product) return null

        // Sort listings by price (lowest first)
        const sortedListings = listings.sort((a, b) => 
          a.metadata.current_price - b.metadata.current_price
        )

        return (
          <ProductCard
            key={productId}
            product={product}
            priceListings={sortedListings}
          />
        )
      })}
    </div>
  )
}