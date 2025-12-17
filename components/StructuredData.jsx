'use client'

import Script from 'next/script'

export default function StructuredData({ data }) {
  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Get Exposure',
    url: 'https://getexpo3-tawny.vercel.app',
    logo: 'https://getexpo3-tawny.vercel.app/logo.png',
    description: 'Transform Your Ad Spend Into Real Results - We help businesses scale their advertising with proven strategies',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-778-712-3301',
      contactType: 'customer service',
      email: 'admin@getexposure.ca',
      areaServed: 'US',
      availableLanguage: 'en',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Vancouver',
      addressRegion: 'BC',
      addressCountry: 'Canada',
    },
    sameAs: [
      // Add your social media URLs here
    ],
  }

  return <StructuredData data={schema} />
}

export function ServiceSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Digital Advertising Consulting',
    provider: {
      '@type': 'Organization',
      name: 'Get Exposure',
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Advertising Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Ad Campaign Optimization',
            description: 'Optimize your existing ad campaigns for better performance',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Ad Scaling Strategy',
            description: 'Scale your successful campaigns to reach higher spending levels',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Ad Campaign Setup',
            description: 'Launch your first advertising campaigns with expert guidance',
          },
        },
      ],
    },
  }

  return <StructuredData data={schema} />
}

export function BreadcrumbSchema({ items }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return <StructuredData data={schema} />
}

