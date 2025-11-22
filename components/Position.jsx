import React, { useState, useEffect, useRef, useMemo, memo } from 'react'
import { ArrowUpRight } from "lucide-react"
import RocketScene from './RocketScene'
import PartsScene from './PartsScene'
import Station from "./Station"
import StarfieldCanvas from './StarfieldCanvas'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from "framer-motion"

// Memoized Rocket component to prevent unnecessary re-renders
const Rocket = memo(() => {
    return (
        <div className='relative h-[500px] w-[300px] xl:w-[30vw] xl:h-full' >
            <StarfieldCanvas />
            <RocketScene />
        </div>
    )
})
Rocket.displayName = 'Rocket'

const Position = () => {
    const containerRef = useRef(null)
    const [selected, setSelected] = useState("rocket")

    // Memoize static data to prevent re-creation
    const data = useMemo(() => ({
        rocket: {
            title: "Looking to Scale?",
            subtitle: "Ready to scale above $25k-$30k daily",
            description: "If you're ready to scale your campaign above 25k - 30k a day, we can do it by following our proven 6 step scaling strategy.",
            calendlyLink: "https://calendly.com/rohittangri/just-starting-out-clone"
        },
        station: {
            title: "Looking to Optimize?",
            subtitle: "Already spending but need better performance",
            description: "If you're spending consistently on ads but the performance has dropped, we can help you with our customized 6 step process.",
            calendlyLink: "https://calendly.com/rohittangri/looking-to-scale-clone"
        },
        parts: {
            title: "Just Starting?",
            subtitle: "New to advertising and need guidance",
            description: "Ready to launch your first Facebook ad campaign but unsure where to begin? We'll guide you through the entire process step by step.",
            calendlyLink: "https://calendly.com/rohittangri/just-starting-out"
        },
    }), [])

    // Memoize tab items
    const tabItems = useMemo(() => [
        { id: "rocket", text: "Looking to Scale?" },
        { id: "station", text: "Looking to Optimize?" },
        { id: "parts", text: "Just Starting?" }
    ], [])

    // Optimized transition settings
    const contentTransition = useMemo(() => ({
        duration: 0.2,
        ease: "easeInOut"
    }), [])

    const tabTransition = useMemo(() => ({
        type: "spring",
        stiffness: 400,
        damping: 35,
        mass: 0.5
    }), [])

    return (
        <div className='relative'>
            <div
                ref={containerRef}
                className='mx-auto min-h-auto'
            >
                <div className='w-auto flex items-center justify-center mb-8 md:mb-12 lg:mb-16'>
                    <div className="bg-[#1a1a1a]/60 backdrop-blur-md rounded-2xl relative p-1 border border-white/5 shadow-2xl">
                        <nav className='relative flex flex-wrap md:mx-auto items-center justify-center rounded-xl md:rounded-full w-full md:w-fit gap-1'>
                            {tabItems.map(({ id, text }) => (
                                <button
                                    key={id}
                                    onClick={() => setSelected(id)}
                                    className={`relative z-10 flex items-center gap-2 px-5 sm:px-6 md:px-7 lg:px-[2vw] py-3.5 sm:py-4 md:py-4 lg:py-[1.2vw] cursor-pointer transition-colors duration-200 rounded-xl md:rounded-full overflow-hidden min-h-[52px]
                                ${selected === id ? "" : "hover:bg-white/5"}
                            `}
                                >
                                    {/* Animated background for active tab */}
                                    {selected === id && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-purple-500/30 to-pink-600/20 border border-purple-500/30 rounded-xl md:rounded-full"
                                            transition={tabTransition}
                                        />
                                    )}
                                    
                                    <span
                                        className={`relative z-10 block flex-1 text-sm sm:text-base md:text-base lg:text-lg xl:text-[1.15vw] font-poppins tracking-wide transition-colors duration-200 whitespace-nowrap ${
                                            selected === id 
                                                ? "text-white font-semibold" 
                                                : "text-gray-400 hover:text-white/80"
                                        }`}
                                    >
                                        {text}
                                    </span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>


                {/* Content sections - Keep all components mounted */}
                <div className="relative w-full sm:w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%] flex flex-col items-center justify-center mx-auto font-poppins py-6 md:py-8 lg:py-[2vw] px-4 sm:px-6 md:px-8">
                    {/* Rocket Section */}
                    <AnimatePresence mode="wait">
                        {selected === 'rocket' && (
                            <motion.div
                                key="rocket"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={contentTransition}
                                className="flex lg:flex-nowrap flex-wrap flex-col-reverse lg:flex-row-reverse items-center w-full gap-6 md:gap-8 lg:gap-10"
                            >
                                <div className='relative w-full lg:w-1/2 flex items-center justify-center h-[220px] md:h-[280px] lg:h-[320px] xl:h-[22vw]'>
                                    <div className='rotate-45 scale-75 sm:scale-90 md:scale-100'>
                                        <Rocket />
                                    </div>
                                </div>
                                <div className='text-start flex font-poppins items-start flex-col w-full lg:w-1/2 gap-4 md:gap-5 lg:gap-6'>
                                    <div className='space-y-3 md:space-y-4'>
                                        <h1 className='text-[24px] sm:text-3xl md:text-4xl lg:text-5xl xl:text-[3.8vw] font-bold uppercase tracking-tight leading-[1.2] sm:leading-tight'>{data.rocket.title}</h1>
                                        <h3 className='text-[15px] sm:text-base md:text-lg lg:text-xl xl:text-[1.4vw] text-gray-400 border-b border-gray-700/50 tracking-wide uppercase pb-2 font-medium'>{data.rocket.subtitle}</h3>
                                    </div>
                                    <p className='text-start text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 italic font-roboto xl:text-[1.6vw] font-light leading-relaxed'>{data.rocket.description}</p>
                                    
                                    {/* Button inside text column */}
                                    <a 
                                        href={data.rocket.calendlyLink} 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative w-full inline-flex items-center justify-center gap-3 md:gap-4 px-6 md:px-8 py-4 md:py-5 xl:py-[1.3vw] bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 hover:from-purple-600 hover:via-purple-700 hover:to-pink-600 text-white font-semibold text-base md:text-lg lg:text-xl xl:text-[1.4vw] transition-all duration-200 overflow-hidden shadow-2xl hover:shadow-purple-500/50 rounded-xl mt-4 hover:scale-[1.02] active:scale-[0.98] min-h-[56px]"
                                    >
                                        <span className="relative z-10 tracking-wide">Get Started</span>
                                        <span className="relative z-10 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                                            <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 xl:w-[1.6vw] xl:h-[1.6vw]" />
                                        </span>
                                    </a>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Station Section */}
                    <AnimatePresence mode="wait">
                        {selected === 'station' && (
                            <motion.div
                                key="station"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={contentTransition}
                                className="flex justify-center flex-col-reverse lg:flex-row-reverse lg:flex-nowrap flex-wrap items-center w-full gap-6 md:gap-8 lg:gap-10"
                            >
                                <div className='w-full lg:w-1/2 h-[220px] md:h-[280px] lg:h-[320px] xl:h-[22vw] flex items-center justify-center'>
                                    <Station />
                                </div>
                                <div className='text-start flex font-poppins items-start flex-col w-full lg:w-1/2 gap-4 md:gap-5 lg:gap-6'>
                                    <div className='space-y-3 md:space-y-4'>
                                        <h1 className='text-[24px] sm:text-3xl md:text-4xl lg:text-5xl xl:text-[3.8vw] font-bold uppercase tracking-tight leading-[1.2] sm:leading-tight'>{data.station.title}</h1>
                                        <h3 className='text-[15px] sm:text-base md:text-lg lg:text-xl xl:text-[1.4vw] text-gray-400 border-b border-gray-700/50 tracking-wide uppercase pb-2 font-medium'>{data.station.subtitle}</h3>
                                    </div>
                                    <p className='text-start text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 italic font-roboto xl:text-[1.6vw] font-light leading-relaxed'>{data.station.description}</p>
                                    
                                    {/* Button inside text column */}
                                    <a 
                                        href={data.station.calendlyLink} 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative w-full inline-flex items-center justify-center gap-3 md:gap-4 px-6 md:px-8 py-4 md:py-5 xl:py-[1.3vw] bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 hover:from-purple-600 hover:via-purple-700 hover:to-pink-600 text-white font-semibold text-base md:text-lg lg:text-xl xl:text-[1.4vw] transition-all duration-200 overflow-hidden shadow-2xl hover:shadow-purple-500/50 rounded-xl mt-4 hover:scale-[1.02] active:scale-[0.98] min-h-[56px]"
                                    >
                                        <span className="relative z-10 tracking-wide">Get Started</span>
                                        <span className="relative z-10 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                                            <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 xl:w-[1.6vw] xl:h-[1.6vw]" />
                                        </span>
                                    </a>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Parts Section */}
                    <AnimatePresence mode="wait">
                        {selected === 'parts' && (
                            <motion.div
                                key="parts"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={contentTransition}
                                className="flex items-start lg:flex-nowrap flex-col-reverse lg:flex-row w-full gap-6 md:gap-8 lg:gap-10"
                            >
                                <div className='text-start font-poppins flex flex-wrap items-start justify-center flex-col w-full lg:w-1/2 gap-4 md:gap-5 lg:gap-6'>
                                    <div className='space-y-3 md:space-y-4'>
                                        <h1 className='text-[24px] sm:text-3xl md:text-4xl lg:text-5xl xl:text-[3.8vw] font-bold uppercase tracking-tight leading-[1.2] sm:leading-tight'>{data.parts.title}</h1>
                                        <h3 className='text-[15px] sm:text-base md:text-lg lg:text-xl xl:text-[1.4vw] text-gray-400 border-b border-gray-700/50 tracking-wide uppercase pb-2 font-medium'>{data.parts.subtitle}</h3>
                                    </div>
                                    <p className='text-start text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 italic font-roboto xl:text-[1.6vw] font-light leading-relaxed'>{data.parts.description}</p>
                                    
                                    {/* Button inside text column */}
                                    <a 
                                        href={data.parts.calendlyLink} 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative w-full inline-flex items-center justify-center gap-3 md:gap-4 px-6 md:px-8 py-4 md:py-5 xl:py-[1.3vw] bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 hover:from-purple-600 hover:via-purple-700 hover:to-pink-600 text-white font-semibold text-base md:text-lg lg:text-xl xl:text-[1.4vw] transition-all duration-200 overflow-hidden shadow-2xl hover:shadow-purple-500/50 rounded-xl mt-4 hover:scale-[1.02] active:scale-[0.98] min-h-[56px]"
                                    >
                                        <span className="relative z-10 tracking-wide">Get Started</span>
                                        <span className="relative z-10 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                                            <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 xl:w-[1.6vw] xl:h-[1.6vw]" />
                                        </span>
                                    </a>
                                </div>
                                <div className='w-full lg:w-1/2 h-[220px] md:h-[280px] lg:h-[320px] xl:h-[22vw] flex items-center justify-center'>
                                    <PartsScene />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

export default Position