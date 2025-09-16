# All-in-Gator Price Comparison Platform

![App Preview](https://imgix.cosmicjs.com/2ddb5190-92d6-11f0-bba7-d56988718db7-photo-1592899677977-9c10ca588bbd-1758010887753.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A comprehensive price comparison platform that aggregates product prices from multiple merchants, helping Indian customers find the best deals across e-commerce websites like Flipkart, Amazon India, and Myntra.

## Features

- 🛍️ **Smart Price Comparison** - Compare prices across multiple merchants for the same product
- 🏪 **Merchant Showcase** - Display featured merchants with logos and ratings
- 💰 **Real-time Pricing** - Show current prices, discounts, and savings
- 📊 **Availability Status** - Track stock levels and delivery estimates
- 🔍 **Advanced Search** - Filter products by price range, brand, and availability
- 📱 **Responsive Design** - Optimized for desktop and mobile experiences
- ⚡ **Fast Performance** - Built with Next.js 15 and optimized images

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68c91839fe0840663f64f932&clone_repository=68c91fcbfe0840663f64f950)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "i want to create an aggregator for products to purchase online. It's like skyscanner or trivago which aggregates the price for flights or hotels online and display all the details of providers and their respective price while users opt for cheap flights. So i want to create something similar for international customers particularly focusing on indian customers where instead of jumping from apps to apps for cheaper goods they find a comparable windows which will extract the the data of products from all e-commerce website and put infront of users to choose from"

### Code Generation Prompt

> "Build a Next.js website that uses my existing objects in this bucket"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic** - Headless CMS for content management
- **React** - Component-based UI library

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with your bucket set up

### Installation

1. Clone this repository
2. Install dependencies:

```bash
bun install
```

3. Set up your environment variables in `.env.local`:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

### Fetching Price Listings with Product and Merchant Data

```typescript
import { cosmic } from '@/lib/cosmic'

// Get price listings with full product and merchant information
const response = await cosmic.objects
  .find({
    type: 'price-listings'
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

const priceListings = response.objects
```

### Getting Products by Category

```typescript
// Filter products by category
const products = await cosmic.objects
  .find({
    type: 'products',
    'metadata.category': 'electronics'
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Featured Merchants Query

```typescript
// Get featured merchants only
const featuredMerchants = await cosmic.objects
  .find({
    type: 'merchants',
    'metadata.is_featured': true
  })
  .props(['id', 'title', 'slug', 'metadata'])
```

## Cosmic CMS Integration

This application integrates with your Cosmic bucket structure:

- **Products** - Product catalog with images, specifications, and details
- **Merchants** - E-commerce platform information and logos
- **Price Listings** - Price comparisons linking products to merchants
- **Categories** - Product categorization (expandable structure)

The app automatically fetches and displays price comparisons, handles merchant logos, and provides real-time availability status for each product across different platforms.

## Deployment Options

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel's dashboard
4. Deploy automatically

### Deploy to Netlify

1. Build the project: `bun run build`
2. Deploy the `out` folder to Netlify
3. Set your environment variables in Netlify's dashboard

For production, ensure all environment variables are properly configured in your deployment platform.

<!-- README_END -->