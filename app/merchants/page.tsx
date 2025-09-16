import { getMerchants } from '@/lib/cosmic'

export const metadata = {
  title: 'Merchants - All-in-Gator Price Comparison',
  description: 'Browse all merchant partners including Flipkart, Amazon India, Myntra and other major e-commerce platforms.',
}

export default async function MerchantsPage() {
  const merchants = await getMerchants()

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-secondary-900 sm:text-4xl mb-4">
              Our Merchant Partners
            </h1>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              We partner with India's most trusted e-commerce platforms to bring you the best price comparisons.
            </p>
          </div>
        </div>
      </div>

      {/* Merchants Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {merchants.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <svg className="mx-auto h-24 w-24 text-secondary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <h3 className="text-lg font-medium text-secondary-900 mb-2">No merchants available</h3>
              <p className="text-secondary-600">
                We're working on adding more merchant partners. Check back soon!
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {merchants.map((merchant) => (
              <div key={merchant.id} className="card hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  {merchant.metadata.logo && (
                    <img
                      src={`${merchant.metadata.logo.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
                      alt={`${merchant.metadata.merchant_name} logo`}
                      className="merchant-logo"
                      width={60}
                      height={60}
                    />
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-secondary-900">
                        {merchant.metadata.merchant_name}
                      </h3>
                      {merchant.metadata.is_featured && (
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-warning-100 text-warning-800">
                          ⭐ Featured
                        </span>
                      )}
                    </div>
                    
                    <p className="text-secondary-600 text-sm mb-3">
                      {merchant.metadata.description || 'Trusted e-commerce platform'}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-secondary-500">Country:</span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                          {merchant.metadata.country?.value || 'India'}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-secondary-500">Status:</span>
                        {merchant.metadata.api_status?.value === 'Active' ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-success-100 text-success-800">
                            <span className="w-1.5 h-1.5 bg-success-400 rounded-full mr-1"></span>
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-secondary-100 text-secondary-800">
                            {merchant.metadata.api_status?.value || 'Pending'}
                          </span>
                        )}
                      </div>
                      
                      {merchant.metadata.commission_rate && (
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-secondary-500">Commission:</span>
                          <span className="text-xs font-medium text-secondary-700">
                            {merchant.metadata.commission_rate}%
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {merchant.metadata.website_url && (
                      <div className="mt-4">
                        <a
                          href={merchant.metadata.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary text-sm w-full text-center"
                        >
                          Visit Website
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}