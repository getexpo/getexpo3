// import { Metadata } from 'next'
import './globals.css'
// import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Raleway, Inter, Roboto } from 'next/font/google'; // Import Roboto here
import SmoothScrollProvider from '@/components/SmoothScrollProvider'
import { Poppins } from 'next/font/google';
import ConditionalFooter from '@/components/ConditionalFooter'

import CustomScrollbar from '@/components/CustomScrollbar'

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

// export const metadata {
//   title: "GetExposure - Transform Your Ad Spend Into Real Customers",
//   description:
//     "Stop wasting money on ads that don't convert. Our data-driven approach optimizes your campaigns for maximum ROI, turning every dollar spent into measurable growth.",

// }

export default function RootLayout({ children }) {
  return (
    <html 
      lang="en" 
      className={`${raleway.variable} ${poppins.variable} ${inter.variable} ${roboto.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        {/* <Navbar /> */}
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
        <CustomScrollbar />
        <ConditionalFooter />
      </body>
    </html>
  )
}