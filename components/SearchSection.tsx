'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchSection() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <section className="bg-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-secondary-900 mb-4">
            What are you looking for?
          </h2>
          <p className="text-secondary-600">
            Search for any product and compare prices across all major Indian e-commerce platforms
          </p>
        </div>
        
        <form onSubmit={handleSearch} className="relative">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for iPhone, Nike shoes, Samsung TV..."
              className="search-input pl-10 pr-24"
              autoComplete="off"
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-6 rounded-r-lg transition-colors duration-200 h-full"
              >
                Search
              </button>
            </div>
          </div>
        </form>
        
        {/* Popular searches */}
        <div className="mt-6">
          <p className="text-sm text-secondary-600 mb-3">Popular searches:</p>
          <div className="flex flex-wrap gap-2">
            {['iPhone 15', 'Nike Air Force 1', 'Samsung TV', 'MacBook', 'OnePlus'].map((term) => (
              <button
                key={term}
                onClick={() => {
                  setSearchQuery(term)
                  router.push(`/products?search=${encodeURIComponent(term)}`)
                }}
                className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm hover:bg-secondary-200 transition-colors duration-200"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}