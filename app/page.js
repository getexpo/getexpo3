'use client'
import { MoveRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query'
import Position from '@/components/Position'
import Type from "@/components/Type"
import LogoMarquee from '@/components/LogoMarquee'
import Navbar from '@/components/Navbar'
import StatsSection from '@/components/stats-section'
import Contact from '@/components/Contact'
import QueryProvider from '@/components/admin/QueryProvider'

function HomePageContent() {
  // Fetch home content from API
  const { data: content } = useQuery({
    queryKey: ['home-content'],
    queryFn: async () => {
      const res = await fetch('/api/home')
      if (!res.ok) throw new Error('Failed to fetch')
      return res.json()
    },
    // Use default values while loading
    placeholderData: {
      heroTitle1: 'Transform Your Ad Spend',
      heroTitle2: 'Into Real',
      typedWords: 'Customers,Revenue,Profit',
      subHeadline: 'And Bring The Growth You Deserve',
      description: "We'll pinpoint where you are in your advertising journey and deliver customized solutions that maximize your ROI",
      ctaText: 'Work With Us',
      ctaLink: 'https://calendly.com/rohittangri/just-starting-out',
      bigStat: '$600K',
      statsText1: 'Get Exposure has profitably spent over',
      statsText2: '$600K in Ad spend',
      statsText3: 'and generated over $2.4M.',
      journeyTitle1: 'Where Are You in Your',
      journeyTitle2: 'Advertising Journey',
      journeyDesc: 'We start by pinpointing exactly where you are in your advertising journey. Every business is unique, and your challenges require tailored solutions.',
    },
  })

  // Fetch logos from API
  const { data: logos } = useQuery({
    queryKey: ['logos'],
    queryFn: async () => {
      const res = await fetch('/api/logos')
      if (!res.ok) throw new Error('Failed to fetch')
      return res.json()
    },
    select: (data) => data.map(logo => logo.path),
    placeholderData: [
      {path: '/brands/1.png'},
      {path: '/brands/2.png'},
      {path: '/brands/4.png'},
      {path: '/brands/5.png'},
      {path: '/brands/6.png'},
      {path: '/brands/7.png'},
      {path: '/brands/8.png'},
    ],
  })

  const typedWords = content?.typedWords?.split(',') || ['Customers', 'Revenue', 'Profit']
  
  return (
    <>
      <Navbar action={'#journey'} target={'_self'} />
      <div className="xl:h-auto md:min-h-screen relative ">




        <main className="relative  z-50">
          <div
            className="relative  bg-black w-full min-h-screen flex items-center justify-center font-poppins overflow-hidden"

          >
            {/* <div className="absolute w-full h-[200px] bg-gradient-to-t   z-[100] from-black via-black/50 to-transparent bottom-0 left-0">

            </div> */}
            <div
              className="absolute inset-0 z-0 blur-3xl"
              style={{
                background: `
            radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.4) 10%, transparent 40%), /* Indigo glow bottom-left */
            radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.4) 10%, transparent 40%), /* Pink glow top-right */
            radial-gradient(circle at center, rgba(0, 0, 0, 0.5) 0%, transparent 70%) /* Central dark fade */
          `,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}
            ></div>

            <div className="mx-auto lg:px-10 pt-20 sm:pt-24 md:pt-28 lg:pt-32 xl:px-0 w-full px-2 flex items-center justify-center relative z-[100] pb-56 sm:pb-60 md:pb-64 lg:pb-72 xl:pb-80">
              <div className="space-y-4 md:space-y-6 px-4 md:px-0 max-w-7xl mx-auto mb-8">
                <div className="space-y-2 md:space-y-3 flex items-center justify-center flex-col">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl max-w-5xl text-center font-poppins leading-tight">
                    {/* First line */}
                    <span className="block text-white font-semibold">
                      {content?.heroTitle1}
                    </span>
                    
                    {/* Second line with dynamic words */}
                    <span className="flex flex-row items-center gap-2 md:gap-3 justify-center mt-1 md:mt-2">
                      <span className="font-semibold text-white">{content?.heroTitle2}</span>
                      <span
                        className="font-semibold"
                        style={{
                          backgroundImage: 'linear-gradient(to right, #6366f1, #ec4899)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          color: 'transparent',
                        }}
                      >
                        <Type data={typedWords} loop={true} speed={100} delay={100} style="" />
                      </span>
                    </span>
                  </h1>
                </div>

                {/* Sub-headline with improved spacing */}
                <h2 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl max-w-4xl mx-auto font-poppins text-center text-white/95 font-normal leading-relaxed px-2">
                  {content?.subHeadline}
                </h2>
                <p className="text-sm sm:text-base md:text-base lg:text-lg xl:text-lg font-normal tracking-wide leading-relaxed text-center w-[95%] md:w-[85%] lg:w-[70%] max-w-3xl mx-auto text-white/75 font-roboto px-2">
                  {content?.description}
                </p>

                <div className="w-full flex item-center justify-center pt-3 md:pt-4 px-4 pb-4">
                  <a href={content?.ctaLink} target='_blank' className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-3.5 md:px-10 md:py-4 bg-white hover:bg-gray-200 text-black font-medium text-sm sm:text-base md:text-base lg:text-lg transition-all duration-300 overflow-hidden">
                    <span className="relative z-10">{content?.ctaText}</span>
                    <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
                      <MoveRight className='w-4 h-4 sm:w-5 sm:h-5' />
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-6 sm:bottom-8 md:bottom-10 lg:bottom-12 xl:bottom-14 w-full mx-auto py-4 md:py-6">
              <LogoMarquee logos={logos} speed={40} />

              <div className="absolute left-0  z-100 top-0 h-full w-[10%] xl:w-[20vw]  bg-linear-to-r from-black from-20% via-black/50 to-transparent pointer-events-none "></div>
              <div className="absolute right-0  z-100 top-0 h-full w-[10%] xl:w-[20vw]  bg-linear-to-l  from-black via-black/50 to-transparent pointer-events-none "></div>
            </div>
          </div>

          <section
            className="relative bg-black font-poppins w-full min-h-screen xl:h-[70vh] flex items-center justify-center overflow-hidden"

          >
            {/* Overlay div for the elegant gradient effect */}
            {/* Using multiple radial/linear gradients to create a subtle, layered color blend */}
            <div className="absolute w-full h-[200px] bg-gradient-to-b   z-[100] from-black via-black/40 to-transparent top-0 left-0">
            </div>

            <div className="absolute w-full h-[200px] bg-gradient-to-t   z-[100] from-black via-black/50 to-transparent bottom-0 left-0">
            </div>

            <div
              className="absolute inset-0 z-0"
              style={{
                background: `
            radial-gradient(circle at 5% 5%, rgba(255, 255, 255, 0.11) 0%, transparent 60%), /* Darker glow top-right */

            radial-gradient(circle at 10% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 100%), /* Darker glow top-right */

            radial-gradient(circle at 10% 50%, rgba(236, 72, 153, 0.3) 0%, transparent 70%), /* Darker glow mid-left */
            radial-gradient(circle at 80% 30%, rgba(99, 102, 241, 0.4) 0%, transparent 60%), /* Darker glow top-right */
            radial-gradient(circle at center, rgba(0, 0, 0, 0.5) 0%, transparent 70%)

          `,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}
            ></div>

            {/* Giant background text with fade effect */}
            <h1
              className="absolute text-[60px] sm:text-[100px] md:text-[140px] lg:text-[180px] xl:text-[200px] text-stroke text-white/5 select-none font-bold z-10"
            >
              {content?.bigStat}
            </h1>

            {/* Foreground content */}
            <div className="z-10 text-center space-y-1 md:space-y-2 px-4 max-w-6xl mx-auto">
              <h2 className="text-white font-light text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl">
                {content?.statsText1}
              </h2>
              <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl">
                <span className="text-white font-semibold">{content?.statsText2}</span>
                {' '}
                <span className="text-gray-300 font-light">{content?.statsText3}</span>
              </h2>
            </div>
          </section>

          {/* Enhanced Where Are You Section */}
          <div className="relative">
            <div id="solutions" className="mx-auto px-4 sm:px-6 py-8 md:py-12 lg:py-16 text-center max-w-7xl">
              <h2 id="journey" className="text-white mb-6 md:mb-8 font-semibold font-poppins text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl leading-tight px-2 max-w-5xl mx-auto">
                <span className="">{content?.journeyTitle1}</span>
                <br />
                <span className="font-poppins tracking-wide font-normal text-gray-300">{content?.journeyTitle2}</span>
              </h2>
              <p className="text-sm sm:text-base md:text-base lg:text-lg xl:text-lg mt-4 md:mt-6 font-light tracking-wide leading-relaxed text-center mx-auto text-gray-400 font-roboto lg:mb-16 max-w-3xl px-2">
                {content?.journeyDesc}
              </p>
            </div>



            <Position />

          </div>

          {/* Stats Section */}
          <StatsSection />

          {/* Contact Section */}
          <Contact />

        </main>
      </div>
    </>

  )
}

export default function HomePage() {
  return (
    <QueryProvider>
      <HomePageContent />
    </QueryProvider>
  )
}
