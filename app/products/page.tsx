import { getProducts, getPriceListings } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'
import type { PriceListing } from '@/types'

export const metadata = {
  title: 'Products - All-in-Gator Price Comparison',
  description: 'Browse and compare prices for thousands of products across major Indian e-commerce platforms.',
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { search } = await searchParams
  const [products, priceListings] = await Promise.all([
    getProducts(),
    getPriceListings()
  ])

  // Filter products based on search query
  let filteredProducts = products
  if (search && typeof search === 'string') {
    const searchTerm = search.toLowerCase()
    filteredProducts = products.filter(product => 
      product.metadata.product_name.toLowerCase().includes(searchTerm) ||
      product.metadata.brand?.toLowerCase().includes(searchTerm) ||
      product.metadata.keywords?.toLowerCase().includes(searchTerm)
    )
  }

  // Group price listings by product
  const priceListingsByProduct = new Map<string, PriceListing[]>()
  priceListings.forEach(listing => {
    if (!listing.metadata.product?.id) return
    
    const productId = listing.metadata.product.id
    const existingListings = priceListingsByProduct.get(productId) || []
    priceListingsByProduct.set(productId, [...existingListings, listing])
  })

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-secondary-900 sm:text-4xl mb-4">
              All Products
            </h1>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Compare prices across multiple merchants and find the best deals for your favorite products.
            </p>
            
            {search && (
              <div className="mt-4">
                <p className="text-sm text-secondary-600">
                  Showing results for: <span className="font-semibold">"{search}"</span>
                </p>
                <p className="text-sm text-secondary-500">
                  {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <svg className="mx-auto h-24 w-24 text-secondary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-lg font-medium text-secondary-900 mb-2">
                {search ? 'No products found' : 'No products available'}
              </h3>
              <p className="text-secondary-600">
                {search 
                  ? `We couldn't find any products matching "${search}". Try a different search term.`
                  : 'We\'re working on adding more products. Check back soon!'
                }
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                priceListings={priceListingsByProduct.get(product.id) || []}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}