import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-secondary-200 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold text-secondary-900">
                All-in-Gator
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link 
                href="/" 
                className="text-secondary-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Home
              </Link>
              <Link 
                href="/products" 
                className="text-secondary-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Products
              </Link>
              <Link 
                href="/merchants" 
                className="text-secondary-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Merchants
              </Link>
              <Link 
                href="/about" 
                className="text-secondary-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                About
              </Link>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link 
              href="/products"
              className="btn-primary"
            >
              Compare Prices
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-secondary-700 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md p-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-secondary-200">
            <Link 
              href="/" 
              className="text-secondary-700 hover:text-primary-600 block px-3 py-2 text-base font-medium"
            >
              Home
            </Link>
            <Link 
              href="/products" 
              className="text-secondary-700 hover:text-primary-600 block px-3 py-2 text-base font-medium"
            >
              Products
            </Link>
            <Link 
              href="/merchants" 
              className="text-secondary-700 hover:text-primary-600 block px-3 py-2 text-base font-medium"
            >
              Merchants
            </Link>
            <Link 
              href="/about" 
              className="text-secondary-700 hover:text-primary-600 block px-3 py-2 text-base font-medium"
            </Link>
            <div className="pt-2">
              <Link 
                href="/products"
                className="btn-primary block text-center"
              >
                Compare Prices
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}