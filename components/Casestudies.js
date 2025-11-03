"use client"
import { motion } from "framer-motion"
import { ArrowUpRight, } from "lucide-react"
import Link from 'next/link';

import Marquee from 'react-fast-marquee';

const caseStudies = [
  {
    category: "Healthcare Education",
    title: "Medical Education",
    href:'/CaseStudy/case1',
    description:
      "Our client specializes in EKG interpretation training for nurse practitioners where accuracy can mean life or death. When ad fatigue hit and CPL skyrocketed, we pivoted to target problem-aware audiences with entirely new messaging frameworks.",
    results: ["Reduced CPL by 65%", "Increased conversion rate by 180%", "Scaled to $50k/month"],
  },
  {
    category: "Healthcare Business",
    title: "MedSpa Business",
    href:'/CaseStudy/case2',

    description:
      "Our client helps healthcare professionals transition to owning medspas. When they shifted from live to evergreen webinars, we systematically mapped pain points across awareness levels to maintain conversion rates without the urgency of live events.",
    results: ["Maintained 4.2% conversion rate", "Reduced cost per lead by 40%", "Automated lead generation"],
  },
  {
    category: "Healthcare Services",
    title: "IV Hydration",
    href:'/CaseStudy/case3',

    description:
      "Our client teaches healthcare professionals about IV therapies. We repositioned the entire offering from clinical procedure training to business opportunity development, creating differentiation in a crowded healthcare education market.",
    results: ["Increased ROAS by 220%", "Expanded to 3 new markets", "Built $2M+ pipeline"],
  },
  {
    category: "Health & Wellness",
    title: "Supplements",
    href:'/CaseStudy/case4',

    description:
      "Our client needed a systematic approach to launch multiple supplement products simultaneously. We developed a comprehensive ad testing framework across all awareness levels, prioritizing bioavailability as the primary USP.",
    results: ["Launched 5 products successfully", "Achieved 3.8x ROAS average", "Built loyal customer base"],
  },
  {
    category: "Business Networking",
    title: "Internet Mastermind",
    href:'/CaseStudy/case5',

    description:
      "Our client runs an exclusive CEO network in Vancouver but struggled to attract qualified leads. We implemented broad targeting with qualifying copy that outperformed conventional interest targeting, attracting higher-caliber executives.",
    results: ["Increased lead quality by 300%", "Reduced cost per qualified lead by 55%", "Filled mastermind program"],
  },
  {
    category: "Skincare",
    href:'/CaseStudy/case1',

    title: "Skinlycious",
    description:
      "Our client needed to differentiate in a crowded skincare market. We developed a comprehensive content strategy that positioned them as experts in acne treatment, resulting in significant improvements in conversion and customer acquisition.",
    results: ["40% increase in conversion rate", "25% lower customer acquisition costs", "Built brand authority"],
  },

]

export default function CaseStudies() {
  return (
    <section id="case-studies" className="py-16 sm:py-24 md:py-32 lg:py-40 relative px-4 sm:px-6 lg:px-8">
      {/* Simplified background - minimal gradients */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-[150px] bg-gradient-to-b from-black via-black/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-[150px] bg-gradient-to-t from-black via-black/80 to-transparent"></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Enhanced Header Section */}
        <div className="text-center mb-16 sm:mb-20 md:mb-24 lg:mb-32 space-y-4 sm:space-y-6 md:space-y-8 px-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-poppins font-bold text-white tracking-tight leading-none">
            Real World
            <br />
            <span className="text-gray-400 font-normal">
              Success Stories
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-normal text-gray-400 max-w-3xl mx-auto leading-relaxed font-roboto">
            Proven strategies that delivered measurable results for businesses like yours.
          </p>
        </div>

        {/* Marquee Container */}
        <div className="relative">
          {/* Gradient Fades */}
          <div className="absolute left-0 z-[100] top-0 h-full w-[10%] md:w-[15%] bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none"></div>
          <div className="absolute right-0 z-[100] top-0 h-full w-[10%] md:w-[15%] bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none"></div>

          <Marquee
            speed={40}
            direction={'left'}
            pauseOnHover={true}
            gradient={false}
          >
            {caseStudies.map((study, index) => (
              <div
                key={index}
                className="mx-8 md:mx-12 lg:mx-16"
              >
                <Link href={study.href} className="block group">
                  {/* Card Container */}
                  <div className="relative w-[280px] sm:w-[320px] md:w-[420px] lg:w-[500px] xl:w-[36vw] h-[480px] sm:h-[540px] md:h-[580px] lg:h-[640px] xl:h-[44vw] bg-gradient-to-b from-[#0a0a0a] to-black border border-white/[0.08] hover:border-white/20 transition-all duration-500 overflow-hidden">
                    
                    {/* Hover Overlay with CTA */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 z-20 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                        <div className="flex items-center gap-2 sm:gap-3 text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium px-4">
                          <span>View Case Study</span>
                          <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col p-5 sm:p-6 md:p-8 lg:p-10 xl:p-[2.5vw]">
                      
                      {/* Category Badge */}
                      <div className="mb-4 sm:mb-5 md:mb-6 lg:mb-8">
                        <span className="text-[10px] sm:text-xs md:text-sm xl:text-[0.85vw] font-medium text-gray-500 uppercase tracking-wider">
                          {study.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[3.8vw] font-poppins font-bold text-white mb-4 sm:mb-5 md:mb-6 lg:mb-8 xl:mb-[2vw] leading-tight tracking-tight">
                        {study.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-[1.15vw] text-gray-400 leading-relaxed font-roboto mb-auto">
                        {study.description}
                      </p>

                      {/* Results Section */}
                      <div className="mt-6 sm:mt-7 md:mt-8 lg:mt-10 pt-5 sm:pt-6 md:pt-6 lg:pt-8 border-t border-white/10">
                        <h4 className="text-xs sm:text-sm md:text-base xl:text-[1vw] font-semibold text-white mb-3 sm:mb-4 md:mb-5 tracking-wide">
                          KEY RESULTS
                        </h4>
                        <div className="space-y-2 sm:space-y-3 md:space-y-4">
                          {study.results.map((result, resultIndex) => (
                            <div key={resultIndex} className="flex items-start gap-2 sm:gap-3">
                              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 rounded-full bg-white mt-1.5 sm:mt-2 flex-shrink-0" />
                              <span className="text-xs sm:text-sm md:text-base xl:text-[1vw] text-gray-300 font-roboto leading-relaxed">
                                {result}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Subtle gradient accent at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  </div>
                </Link>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  )
}
