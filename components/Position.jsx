import React, { useState, useEffect, useRef, useMemo, memo } from 'react'
import { ArrowUpRight } from "lucide-react"
import RocketScene from './RocketScene'
import PartsScene from './PartsScene'
import Station from "./Station"
import StarfieldCanvas from './StarfieldCanvas'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from "framer-motion"

// Memoized Rocket component to prevent unnecessary re-renders
const Rocket = memo(() => {
    return (
        <div className='relative w-full h-full' >
            <StarfieldCanvas />
            <RocketScene />
        </div>
    )
})
Rocket.displayName = 'Rocket'

const Position = () => {
    const containerRef = useRef(null)
    const [selected, setSelected] = useState("rocket")
    const [isVisible, setIsVisible] = useState(false)
    const [hasLoaded, setHasLoaded] = useState(false)

    // Intersection Observer to load animations only when visible
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasLoaded) {
                        setIsVisible(true)
                        setHasLoaded(true)
                    }
                })
            },
            {
                rootMargin: '100px', // Start loading 100px before section is visible
                threshold: 0.1
            }
        )

        if (containerRef.current) {
            observer.observe(containerRef.current)
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current)
            }
        }
    }, [hasLoaded])

    // Memoize static data to prevent re-creation
    const data = useMemo(() => ({
        rocket: {
            title: "Looking to Scale?",
            subtitle: "Ready to scale above $25k-$30k daily",
            description: "If you're ready to scale your campaign above 25k - 30k a day, we can do it by following our proven 6 step scaling strategy.",
            calendlyLink: "/Solution/looking-to-scale"
        },
        station: {
            title: "Looking to Optimize?",
            subtitle: "Already spending but need better performance",
            description: "If you're spending consistently on ads but the performance has dropped, we can help you with our customized 6 step process.",
            calendlyLink: "/Solution/looking-to-optimize"
        },
        parts: {
            title: "Just Starting?",
            subtitle: "New to advertising and need guidance",
            description: "Ready to launch your first Facebook ad campaign but unsure where to begin? We'll guide you through the entire process step by step.",
            calendlyLink: "/Solution/just-starting"
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
                <div className='w-auto flex items-center justify-center mb-3 md:mb-8 lg:mb-10'>
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
                <div className="relative w-full sm:w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%] flex flex-col items-center justify-center mx-auto font-poppins py-0 px-4 sm:px-6 md:px-8">
                    {/* Rocket Section */}
                    <AnimatePresence mode="wait">
                        {selected === 'rocket' && (
                            <motion.div
                                key="rocket"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={contentTransition}
                                className="relative flex justify-center lg:flex-nowrap flex-wrap flex-col-reverse lg:flex-row-reverse items-center w-full gap-6 md:gap-8 lg:gap-10 pt-0 min-h-[380px] sm:min-h-[420px] lg:min-h-0"
                            >
                                {/* 3D Animation - Background on mobile, side element on desktop */}
                                <div className='absolute lg:relative inset-0 lg:inset-auto w-full lg:w-1/2 h-full lg:h-[320px] xl:h-[22vw] flex items-center justify-center opacity-20 lg:opacity-100 pointer-events-none lg:pointer-events-auto z-0 lg:z-auto overflow-hidden'>
                                    <div className='rotate-45 scale-[1.5] sm:scale-[1.8] md:scale-[2] lg:scale-100 w-full h-full flex items-center justify-center'>
                                        {isVisible && <Rocket />}
                                    </div>
                                </div>
                                <div className='relative text-start flex font-poppins items-start flex-col w-full lg:w-1/2 gap-2 md:gap-5 lg:gap-6 z-10'>
                                    <div className='space-y-1.5 md:space-y-4'>
                                        <h1 className='text-[20px] sm:text-2xl md:text-4xl lg:text-5xl xl:text-[3.8vw] font-bold uppercase tracking-tight leading-[1.2] sm:leading-tight'>{data.rocket.title}</h1>
                                        <h3 className='text-[13px] sm:text-base md:text-lg lg:text-xl xl:text-[1.4vw] text-gray-400 border-b border-gray-700/50 tracking-wide uppercase pb-2 font-medium'>{data.rocket.subtitle}</h3>
                                    </div>
                                    <p className='text-start text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 italic font-roboto xl:text-[1.6vw] font-light leading-relaxed'>{data.rocket.description}</p>
                                    
                                    {/* Button inside text column */}
                                    <Link 
                                        href={data.rocket.calendlyLink}
                                        className="group relative w-full inline-flex items-center justify-center gap-3 md:gap-4 px-6 md:px-8 py-4 md:py-5 xl:py-[1.3vw] bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 hover:from-purple-600 hover:via-purple-700 hover:to-pink-600 text-white font-semibold text-base md:text-lg lg:text-xl xl:text-[1.4vw] transition-all duration-200 overflow-hidden shadow-2xl hover:shadow-purple-500/50 rounded-xl mt-4 hover:scale-[1.02] active:scale-[0.98] min-h-[56px] pointer-events-auto"
                                    >
                                        <span className="relative z-10 tracking-wide">Get Started</span>
                                        <span className="relative z-10 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                                            <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 xl:w-[1.6vw] xl:h-[1.6vw]" />
                                        </span>
                                    </Link>
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
                                className="relative flex justify-center flex-col-reverse lg:flex-row-reverse lg:flex-nowrap flex-wrap items-center w-full gap-6 md:gap-8 lg:gap-10 pt-0 min-h-[380px] sm:min-h-[420px] lg:min-h-0"
                            >
                                {/* 3D Animation - Background on mobile, side element on desktop */}
                                <div className='absolute lg:relative inset-0 lg:inset-auto w-full lg:w-1/2 h-full lg:h-[320px] xl:h-[22vw] flex items-center justify-center opacity-20 lg:opacity-100 pointer-events-none lg:pointer-events-auto z-0 lg:z-auto overflow-hidden'>
                                    <div className='scale-[1.5] sm:scale-[1.8] md:scale-[2] lg:scale-100 w-full h-full flex items-center justify-center'>
                                        {isVisible && <Station />}
                                    </div>
                                </div>
                                <div className='relative text-start flex font-poppins items-start flex-col w-full lg:w-1/2 gap-2 md:gap-5 lg:gap-6 z-10'>
                                    <div className='space-y-1.5 md:space-y-4'>
                                        <h1 className='text-[20px] sm:text-2xl md:text-4xl lg:text-5xl xl:text-[3.8vw] font-bold uppercase tracking-tight leading-[1.2] sm:leading-tight'>{data.station.title}</h1>
                                        <h3 className='text-[13px] sm:text-base md:text-lg lg:text-xl xl:text-[1.4vw] text-gray-400 border-b border-gray-700/50 tracking-wide uppercase pb-2 font-medium'>{data.station.subtitle}</h3>
                                    </div>
                                    <p className='text-start text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 italic font-roboto xl:text-[1.6vw] font-light leading-relaxed'>{data.station.description}</p>
                                    
                                    {/* Button inside text column */}
                                    <Link 
                                        href={data.station.calendlyLink}
                                        className="group relative w-full inline-flex items-center justify-center gap-3 md:gap-4 px-6 md:px-8 py-4 md:py-5 xl:py-[1.3vw] bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 hover:from-purple-600 hover:via-purple-700 hover:to-pink-600 text-white font-semibold text-base md:text-lg lg:text-xl xl:text-[1.4vw] transition-all duration-200 overflow-hidden shadow-2xl hover:shadow-purple-500/50 rounded-xl mt-4 hover:scale-[1.02] active:scale-[0.98] min-h-[56px] pointer-events-auto"
                                    >
                                        <span className="relative z-10 tracking-wide">Get Started</span>
                                        <span className="relative z-10 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                                            <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 xl:w-[1.6vw] xl:h-[1.6vw]" />
                                        </span>
                                    </Link>
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
                                className="relative flex justify-center lg:flex-nowrap flex-col-reverse lg:flex-row w-full gap-6 md:gap-8 lg:gap-10 pt-0 min-h-[380px] sm:min-h-[420px] lg:min-h-0"
                            >
                                <div className='relative text-start font-poppins flex flex-wrap items-center justify-center flex-col w-full lg:w-1/2 gap-2 md:gap-5 lg:gap-6 z-10 lg:items-start'>
                                    <div className='space-y-1.5 md:space-y-4'>
                                        <h1 className='text-[20px] sm:text-2xl md:text-4xl lg:text-5xl xl:text-[3.8vw] font-bold uppercase tracking-tight leading-[1.2] sm:leading-tight'>{data.parts.title}</h1>
                                        <h3 className='text-[13px] sm:text-base md:text-lg lg:text-xl xl:text-[1.4vw] text-gray-400 border-b border-gray-700/50 tracking-wide uppercase pb-2 font-medium'>{data.parts.subtitle}</h3>
                                    </div>
                                    <p className='text-start text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 italic font-roboto xl:text-[1.6vw] font-light leading-relaxed'>{data.parts.description}</p>
                                    
                                    {/* Button inside text column */}
                                    <Link 
                                        href={data.parts.calendlyLink}
                                        className="group relative w-full inline-flex items-center justify-center gap-3 md:gap-4 px-6 md:px-8 py-4 md:py-5 xl:py-[1.3vw] bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 hover:from-purple-600 hover:via-purple-700 hover:to-pink-600 text-white font-semibold text-base md:text-lg lg:text-xl xl:text-[1.4vw] transition-all duration-200 overflow-hidden shadow-2xl hover:shadow-purple-500/50 rounded-xl mt-4 hover:scale-[1.02] active:scale-[0.98] min-h-[56px] pointer-events-auto"
                                    >
                                        <span className="relative z-10 tracking-wide">Get Started</span>
                                        <span className="relative z-10 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                                            <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 xl:w-[1.6vw] xl:h-[1.6vw]" />
                                        </span>
                                    </Link>
                                </div>
                                {/* 3D Animation - Background on mobile, side element on desktop */}
                                <div className='absolute lg:relative left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 top-0 lg:top-auto w-full lg:w-1/2 h-full lg:h-[320px] xl:h-[22vw] flex items-center justify-center opacity-20 lg:opacity-100 pointer-events-none lg:pointer-events-auto z-0 lg:z-auto overflow-hidden'>
                                    <div className='scale-[1.5] sm:scale-[1.8] md:scale-[2] lg:scale-100 w-full h-full flex items-center justify-center'>
                                        {isVisible && <PartsScene />}
                                    </div>
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