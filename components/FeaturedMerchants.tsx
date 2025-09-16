import type { Merchant } from '@/types'

interface FeaturedMerchantsProps {
  merchants: Merchant[]
}

export default function FeaturedMerchants({ merchants }: FeaturedMerchantsProps) {
  if (!merchants || merchants.length === 0) {
    return null
  }

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4">
            Featured Merchants
          </h2>
          <p className="text-lg text-secondary-600">
            Compare prices from India's most trusted e-commerce platforms
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {merchants.map((merchant) => (
            <div key={merchant.id} className="card hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start space-x-4">
                {merchant.metadata.logo && (
                  <img
                    src={`${merchant.metadata.logo.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
                    alt={`${merchant.metadata.merchant_name} logo`}
                    className="merchant-logo"
                    width={48}
                    height={48}
                  />
                )}
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-secondary-900 mb-1">
                    {merchant.metadata.merchant_name}
                  </h3>
                  
                  <p className="text-secondary-600 text-sm mb-3 line-clamp-2">
                    {merchant.metadata.description || 'Trusted e-commerce platform'}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                      {merchant.metadata.country?.value || 'India'}
                    </span>
                    
                    {merchant.metadata.api_status?.value === 'Active' && (
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-success-100 text-success-800">
                        <span className="w-1.5 h-1.5 bg-success-400 rounded-full mr-1"></span>
                        Active
                      </span>
                    )}
                  </div>
                  
                  {merchant.metadata.commission_rate && (
                    <div className="mt-3 text-xs text-secondary-500">
                      Commission: {merchant.metadata.commission_rate}%
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a
            href="/merchants"
            className="btn-secondary"
          >
            View All Merchants
          </a>
        </div>
      </div>
    </section>
  )
}