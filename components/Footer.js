import React from 'react'
import Link from "next/link"


const Footer = () => {
    return (
        <footer className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 relative bg-[black] backdrop-blur-2xl z-10 font-raleway border-white/5 mt-12 sm:mt-16 md:mt-20 lg:mt-24">

            <div className="relative z-100 font-poppins w-full max-w-7xl mx-auto py-10 sm:py-12 md:py-14">
                <div className="flex flex-col lg:flex-row items-start lg:items-start justify-between gap-8 lg:gap-12">
                    
                    <p className="text-white w-full lg:w-[40%] text-[15px] sm:text-base md:text-lg lg:text-lg xl:text-xl font-raleway font-normal mb-4 lg:mb-0 leading-relaxed">
                        Transform your ad spend into real customers with our data-driven approach to digital advertising.
                    </p>
                    
                    {/* Mobile: 2 columns layout, Desktop: 3 columns in a row */}
                    <div className='grid grid-cols-2 sm:grid-cols-3 w-full lg:w-auto items-start justify-start gap-6 sm:gap-8 lg:gap-12 xl:gap-14'>

                        <div>
                            <h4 className="text-white font-medium font-raleway text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl mb-3 sm:mb-4 border-b inline-block">Services</h4>
                            <ul className="space-y-2 sm:space-y-3 text-[14px] sm:text-sm md:text-base lg:text-base xl:text-base text-white/80">
                                <li>Campaign Scaling</li>
                                <li>Performance Optimization</li>
                                <li>Campaign Setup</li>
                                <li>Creative Development</li>
                                <li>Cross-Channel Integration</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-medium font-raleway text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl mb-3 sm:mb-4 border-b inline-block">Case Studies</h4>
                            <ul className="items-start flex flex-col gap-2 sm:gap-3 text-[14px] sm:text-sm md:text-base lg:text-base xl:text-base text-white/80">
                                <li><Link href="/CaseStudy/case1" className='uppercase hover:text-white transition-colors min-h-[44px] flex items-center'>Case Study 1</Link></li>
                                <li><Link href="/CaseStudy/case2" className='uppercase hover:text-white transition-colors min-h-[44px] flex items-center'>Case Study 2</Link></li>
                                <li><Link href="/CaseStudy/case3" className='uppercase hover:text-white transition-colors min-h-[44px] flex items-center'>Case Study 3</Link></li>
                                <li><Link href="/CaseStudy/case4" className='uppercase hover:text-white transition-colors min-h-[44px] flex items-center'>Case Study 4</Link></li>
                                <li><Link href="/CaseStudy/case5" className='uppercase hover:text-white transition-colors min-h-[44px] flex items-center'>Case Study 5</Link></li>
                            </ul>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <h4 className="text-white font-medium font-raleway text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl mb-3 sm:mb-4 border-b inline-block">Contact Us</h4>
                            <ul className="space-y-2 sm:space-y-3 text-[14px] sm:text-sm md:text-base lg:text-base xl:text-base text-white/80">
                                <li>Vancouver, BC, Canada</li>
                                <li>+1 778 712 3301</li>
                                <li>team@getexposure.ca</li>
                            </ul>
                        </div>
                    </div>

                </div>
                
                {/* Copyright and Credits Section */}
                <div className="border-t border-white/10 mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-white/80 text-[13px] sm:text-sm md:text-base lg:text-base xl:text-base">
                        
                        {/* Copyright */}
                        <div className="font-poppins">
                            © {new Date().getFullYear()} GetExposure. All rights reserved.
                        </div>
                        
                        {/* Designed By */}
                        <div className="flex items-center gap-2 font-poppins">
                            <span>Designed & Developed by</span>
                            <a 
                                href="https://codagentic.software/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="font-medium text-white hover:text-white/60 transition-colors duration-300 border-b border-white/50 hover:border-white/30"
                            >
                                CodAgentic
                            </a>
                        </div>
                        
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
