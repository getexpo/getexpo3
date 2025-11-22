import './globals.css'
import Footer from '@/components/Footer'
import { Raleway, Inter, Roboto } from 'next/font/google'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'
import { Poppins } from 'next/font/google'
import ConditionalFooter from '@/components/ConditionalFooter'
import CustomScrollbar from '@/components/CustomScrollbar'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import FacebookPixel from '@/components/FacebookPixel'
import { GTMHead, GTMBody } from '@/components/GoogleTagManager'
import { OrganizationSchema, ServiceSchema } from '@/components/StructuredData'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

// Define Roboto font configuration
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://getexpo3-tawny.vercel.app'),
  title: {
    default: 'Get Exposure - Transform Your Ad Spend Into Real Results',
    template: '%s | Get Exposure'
  },
  description: 'Transform your ad campaigns into profitable growth engines. Expert advertising optimization, scaling strategies, and campaign management. Over $600K managed, $2.4M+ generated.',
  keywords: ['advertising optimization', 'facebook ads', 'ad scaling', 'digital marketing', 'ad campaign management', 'ROI optimization', 'performance marketing'],
  authors: [{ name: 'Get Exposure' }],
  creator: 'Get Exposure',
  publisher: 'Get Exposure',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Get Exposure',
    title: 'Get Exposure - Transform Your Ad Spend Into Real Results',
    description: 'Expert advertising optimization and scaling strategies. Over $600K managed, $2.4M+ generated.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Get Exposure - Advertising Experts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get Exposure - Transform Your Ad Spend Into Real Results',
    description: 'Expert advertising optimization and scaling strategies. Over $600K managed, $2.4M+ generated.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#000000',
}

export default function RootLayout({ children }) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-PBZ54QS9'
  const gaId = process.env.NEXT_PUBLIC_GA_ID || 'G-849B9BFXVF'
  
  return (
    <html 
      lang="en" 
      className={`${raleway.variable} ${poppins.variable} ${inter.variable} ${roboto.variable}`}
      suppressHydrationWarning
    >
      <head>
        <GTMHead gtmId={gtmId} />
      </head>
      <body suppressHydrationWarning>
        <GTMBody gtmId={gtmId} />
        <GoogleAnalytics gaId={gaId} />
        <FacebookPixel pixelId={process.env.NEXT_PUBLIC_FB_PIXEL_ID} />
        <OrganizationSchema />
        <ServiceSchema />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
        <CustomScrollbar />
        <ConditionalFooter />
      </body>
    </html>
  )
}