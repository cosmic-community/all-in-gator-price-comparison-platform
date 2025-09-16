interface StatsSectionProps {
  totalProducts: number
  totalMerchants: number
  totalListings: number
  totalSavings: string
}

export default function StatsSection({ 
  totalProducts, 
  totalMerchants, 
  totalListings, 
  totalSavings 
}: StatsSectionProps) {
  return (
    <section className="bg-primary-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4">
            Trusted by Thousands of Shoppers
          </h2>
          <p className="text-lg text-secondary-600">
            Join the smart shopping revolution with real-time price comparisons
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="stat-card">
              <div className="text-3xl font-bold text-primary-700 mb-2">
                {totalProducts}+
              </div>
              <div className="text-primary-600 font-medium">
                Products
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="stat-card">
              <div className="text-3xl font-bold text-primary-700 mb-2">
                {totalMerchants}+
              </div>
              <div className="text-primary-600 font-medium">
                Merchants
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="stat-card">
              <div className="text-3xl font-bold text-primary-700 mb-2">
                {totalListings}+
              </div>
              <div className="text-primary-600 font-medium">
                Price Comparisons
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="stat-card">
              <div className="text-3xl font-bold text-primary-700 mb-2">
                {totalSavings}
              </div>
              <div className="text-primary-600 font-medium">
                Total Savings
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}