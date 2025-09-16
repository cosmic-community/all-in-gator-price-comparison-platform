import { getPriceComparisonData, formatCurrency } from '@/lib/cosmic'
import Hero from '@/components/Hero'
import PriceComparisonGrid from '@/components/PriceComparisonGrid'
import FeaturedMerchants from '@/components/FeaturedMerchants'
import StatsSection from '@/components/StatsSection'
import SearchSection from '@/components/SearchSection'

export default async function HomePage() {
  const data = await getPriceComparisonData()
  
  // Calculate total savings across all listings
  const totalSavings = data.priceListings.reduce((acc, listing) => {
    const originalPrice = listing.metadata.original_price
    const currentPrice = listing.metadata.current_price
    if (originalPrice && originalPrice > currentPrice) {
      return acc + (originalPrice - currentPrice)
    }
    return acc
  }, 0)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* Search Section */}
      <SearchSection />
      
      {/* Stats Section */}
      <StatsSection 
        totalProducts={data.totalProducts}
        totalMerchants={data.totalMerchants}
        totalListings={data.totalListings}
        totalSavings={formatCurrency(totalSavings)}
      />
      
      {/* Featured Merchants */}
      <FeaturedMerchants merchants={data.merchants} />
      
      {/* Price Comparison Grid */}
      <section className="section-padding bg-secondary-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 sm:text-4xl mb-4">
              Latest Price Comparisons
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Compare prices across multiple merchants and find the best deals for your favorite products.
            </p>
          </div>
          
          <PriceComparisonGrid 
            priceListings={data.priceListings} 
            products={data.products}
          />
        </div>
      </section>
    </div>
  )
}