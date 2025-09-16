import Link from 'next/link'

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-secondary-900 sm:text-6xl mb-6 fade-in">
            Find the Best Prices
            <span className="text-primary-600 block">Across India</span>
          </h1>
          
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto mb-8 slide-up animation-delay-200">
            Compare prices from all major Indian e-commerce platforms including Flipkart, Amazon India, 
            and Myntra. Save money and time with smart shopping decisions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 slide-up animation-delay-400">
            <Link 
              href="/products"
              className="btn-primary text-lg px-8 py-4 rounded-xl"
            >
              Start Comparing Prices
            </Link>
            
            <Link 
              href="/merchants"
              className="btn-secondary text-lg px-8 py-4 rounded-xl"
            >
              View All Merchants
            </Link>
          </div>
          
          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 slide-up animation-delay-600">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">Price Comparison</h3>
              <p className="text-secondary-600">
                Compare prices across multiple merchants instantly and find the best deals.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">Save Money</h3>
              <p className="text-secondary-600">
                Discover discounts and savings opportunities across all your favorite stores.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-warning-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">Fast & Easy</h3>
              <p className="text-secondary-600">
                Quick search and comparison without jumping between different apps and websites.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}