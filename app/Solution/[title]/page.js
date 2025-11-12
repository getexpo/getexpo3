'use client'
import React, { useRef, useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import SplitType from 'split-type';
// import PricingSection from "@/components/pricing-section"
import StatsSection from '../../../components/stats-section'
// import ServicesSection from "@/components/services-section"
gsap.registerPlugin(ScrollTrigger);


import { MoveRight } from 'lucide-react';
import Casestudies from '../../../components/Casestudies';
import Navbar from '@/components/Navbar'
import Contact from '../../../components/Contact'
import QueryProvider from '@/components/admin/QueryProvider'
const FullData = {
    page_2_3: [
        {
            title: "Foundation & Strategy Development",
            description: `We'll start by understanding your business goals, target audience, and unique selling proposition. You'll receive a comprehensive advertising plan tailored specifically to your business needs and budget. This includes customer persona development, competitive analysis, and clear KPI benchmarks. We'll create easy to understand tracking sheets that will show clear metrics and
give us a picture of where your campaigns are headed from day one.`
        },
        {
            title: "Account & Campaign Setup",
            description: `We'll handle the technical heavy lifting by properly setting up your advertising accounts with the right structure for a sustainable future growth. This includes implementing conversion tracking, creating custom audiences, and establishing your initial campaign architecture. We'l ensure everything is properly connected and tested before launching`
        },
        {
            title: "Initial Creative Development ",
            description: `Using our Creative Testing Matrix", we'll develop your first set of ads designed to connect with your audience and generate results, instead of guessing what might work, we'll create a strategic variety of messages and visuals that will help us quickly identify what resonates with your customers. This approach sets you up with reliable creative insights from the very beginning.`
        },
        {
            title: "Controlled Launch & Testing",
            description: `We'll implement a methodical launch strategy that starts with small, targeted tests to validate our approach before scaling your spend while avoiding wasting budget and establishing baseline performance metrics. We'll monitor campaigns closely during this critical phase, making real-time adjustments to optimize initial performance.`
        },
        {
            title: "Audience Expansion",
            description: `Once we've identified your most responsive audiences, we'll methodically expand your reach to similar high-potential segments. We'll help you build valuable custom audiences based on website visitors and engagement,
creating a sustainable foundation for remarketing and lookalike audiences that will become increasingly valuable over time.`
        },
        {
            title: " Performance Scaling & Optimization ",
            description: `As your campaigns gain traction, we'll implement our Phase-based Scaling Approach to gradually increase your budget while maintaining or improving performance metrics. We'll conduct regular performance reviews and continuously refine your strategy based on real data, ensuring your
advertising foundation supports long-term, sustainable growth`
        },
    ],
    page_2_2:
        [
            {
                title: "Performance Analysis & Efficiency Roadmap",
                description: `We will conduct a thorough analysis of your current campaigns to identify
what’s working and where the leaks are happening. You will receive a detailed
optimization blueprint showing exactly which metrics need improvement and
how we will fix them. This includes audience targeting refinements, creative
performance evaluation, and conversion path analysis. Our strategy stays
flexible to adapt to market changes, with clear contingency plans to maintain
performance even when conditions shift.`
            },
            {
                title: "Campaign Structure Refinement",
                description: `We'll preserve your performing campaigns while strategically rebuilding your
underperforming ones. Our approach will focus on eliminating wasted spend
and creating a more efficient campaign architecture. Based on your priorities,
we'll implement proven optimization techniques like audience consolidation,
advanced bidding strategies, and budget redistribution-all specifically
designed to improve efficiency without disrupting what's already working.`
            },
            {
                title: "Creative Refresh Implementation",
                description: `Using our Creative Testing Matrix™, we'll identify which messages and visuals
actually connect with your audience. We'll develop a pipeline of fresh, high-
converting creatives that prevent ad fatigue and generate consistent results.
These improved ads will not only boost your existing campaigns but also help
us discover new audience segments that respond to different messaging
aboroaches.`
            },
            {
                title: "Optimization Protocol Execution",
                description: `Instead of making random changes, we'll implement our Systematic
Optimization Framework™ to methodically improve performance. Our real-
time monitoring system identifies issues before they impact your results,
allowing us to make data-driven adjustments that steadily improve your ROAS
and conversion rates without disrupting account stability.`
            },
            {
                title: "Sustained Performance & Growth",
                description: `We'll start working on expanding winning strategies, creatives, messaging
across multiple platforms, creating a cohesive ecosystem that maximizes your
total addressable market while maintaining efficiency. This doesn't mean we'll
simply copy paste. Instead, it means we'll identify what digital assets you
need before we switch platforms and then start working on those.`
            },


        ],

    page_2_1: [
        {
            title: "Performance Audit & Scaling Roadmap",
            description: `We'll dive deep into your account, analyzing every metric that matters to identify exactly what's working and what's holding you back in terms of audience targeting, creative performance, and conversion efficiency. You' receive a detailed scaling blueprint with clear milestones and timelines. We' identify all growth opportunities and share a comprehensive strategy that addresses your specific business objectives. And since markets often shift and consumer behaviors evolve, our strategy remains flexible by design- incorporating pivot points and contingency plans to keep your campaigns performing regardless of market conditions.`
        },
        {
            title: "Campaign Architecture Optimization ",
            description: `We won't disrupt your current campaigns that are performing well. Instead, well preserve what's working while strategically enhancing your campaign structure to support high-volume spend without performance drops. Depending on your available ad budget, we can tackle all growth opportunities simultaneously or prioritize them one by one. Our approach Includes some proven scaling techniques like refining your highest-potential audiences, implementing advanced bidding strategies, and creating a flexible budget allocation system that adapts as your campaigns scale-all specifically designed for high-growth accounts.`
        },
        {
            title: "Creative Amplification System",
            description: `W'll use our Creative Testing Matrix to ideate impactful concepts and then create ads that resonate perfectly with your audience. While scaling, your pipeline will always be full of diverse high-converting creatives. These fresh ads will not only prevent ad fatigue from killing your existing momentum, but also help us expand into new audiences and opportunities.`
        },
        {
            title: "Controlled Scaling Execution",
            description: `If you're new to scaling, we won't just double your ad budget overight and risk tanking your results. Instead, we use our Phase-based Scaling Approach to gradually increase your spend while keeping your performance stable. We constantly monitor your campaigns and fix issues before they become problems, helping you confidently reach higher spending levels without the usual headaches.`
        },
        {
            title: " Cross-Channel Integration ",
            description: `We'll start working on expanding winning strategies, creatives, messaging across multiple platforms, creating a cohesive ecosystem that maximizes your total addressable market while maintaining efficiency. This doesn't mean we'll simply copy paste. Instead, it means we'll identify what digital assets you need before we switch platforms and then start working on those.`
        },
        {
            title: "Continuous Optimization & Growth",
            description: `Our team will implement advanced optimization protocols, conduct weekly performance reviews, and continuously refine workflows to ensure sustained growth and prevent performance plateaus.`
        },
    ]
};

const Page = () => {
    const [data, setData] = useState([])
    const [action, setAction] = useState('')
    const [progress, setProgress] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [activeIndex, setActiveIndex] = useState()
    const [video, setVideo] = useState('')

    const params = useParams();
    const titleRef = useRef(null)
    const greetRef = useRef(null)
    const textRefs = useRef([]);
    const textRefs2 = useRef([]);
    const progressRef = useRef(null);

    const indexRef = useRef()

    const fromSlug = (slug) => {
        return slug
            .split('-')                  // Split on hyphens
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize
            .join(' ');                  // Join with spaces
    };

    const title = fromSlug(params.title)
    const title2 = params.title

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        setIsMobile(mediaQuery.matches);

        const handleResize = () => setIsMobile(mediaQuery.matches);
        mediaQuery.addEventListener('change', handleResize);

        return () => {
            mediaQuery.removeEventListener('change', handleResize);
        };
    }, []);

    useEffect(() => {
        if (title2 == 'looking-to-optimize') {
            setData(FullData.page_2_2)
            setAction('https://calendly.com/rohittangri/looking-to-scale-clone')
            setVideo('https://drive.google.com/file/d/1RxJmPPzr6I2qCUS9y687jQPqg0As7cp0/preview')

        } else if (title2 == "looking-to-scale") {
            setData(FullData.page_2_1)
            setAction('https://calendly.com/rohittangri/just-starting-out-clone')

            setVideo('https://drive.google.com/file/d/1VNI3AONMVuR8Q-7zbVUOJcoMk8jwOj6F/preview')


        } else if (title2 == "just-starting") {
            setData(FullData.page_2_3)
            setAction('https://calendly.com/rohittangri/just-starting-out')

            setVideo('https://drive.google.com/file/d/1VNI3AONMVuR8Q-7zbVUOJcoMk8jwOj6F/preview')

        } else {
            setData(FullData.page_2_1)

        }


    }, [title2])

    const mobileSettings = {
        end: '+=1500',
    };
    const desktopSettings = {
        end: '+=9000',

    };

    useGSAP(() => {
        // Removed the Title animation to keep it white
        gsap.from('.Video', {
            scale: 0.6,
            opacity: 0.7,
            y: 10,
            duration: 2,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: '.Videocont',
                start: "bottom bottom",
                end: "bottom 85%",
                scrub: 2,
            },

        })
    }, []);



    useGSAP(() => {

        if (!textRefs.current.length || data.length === 0) return;


        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.Steps',
                pin: true,
                start: "top top",
                scrub: 1,
                onUpdate: (self) => {
                    if (progressRef.current) {
                        gsap.to(progressRef.current, {
                            height: `${self.progress * 100}%`,
                            ease: "power2.out",
                            duration: 0.1,
                        });
                    }
                    const total = data.length;
                    const stepProgress = self.progress * total;
                    const index = Math.floor(stepProgress);

                    if (index !== activeIndex) {
                        setActiveIndex(Math.min(index, total - 1));
                    }
                },
                ...(isMobile ? mobileSettings : desktopSettings),
            },
        });
        data.forEach((_, index) => {
            const descEl = textRefs.current[index];
            const titleEl = textRefs2.current[index];

            const descSplit = new SplitType(descEl, { types: "words" });
            const titleSplit = new SplitType(titleEl, { types: "words" });

            gsap.set([...descSplit.words, ...titleSplit.words], { opacity: 0, y: 10 });

            tl.to([titleEl, descEl], {
                opacity: 1,
                onStart: () => setActiveIndex(index),
            });

            tl.to([...titleSplit.words, ...descSplit.words], {
                opacity: 1,
                y: 0,
                // stagger: 1,
                duration: 2,
                scrub: 1,

                ease: "power1.inOut",
            });

            tl.to([titleEl, descEl], {
                opacity: 0,
                duration: 0.2,
                scrub: 1,

                y: -30,
            },);
        });

    }, [isMobile, data]);



    return (
        <QueryProvider>
            <Navbar action={action} />
            <div className='relative pb-40'>
                <div className="absolute w-full h-[200px] bg-gradient-to-t   z-[100] from-black via-black/30 to-transparent bottom-0 left-0">
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 z-0 rounded-2xl"
                    style={{
                        background: `
            radial-gradient( circle at 20% 20%, rgba(99, 102, 241, 0.4) 0%, transparent 45%), 
            radial-gradient(circle at 80% 80%,  rgba(236, 72, 153, 0.4) 0%, transparent 45%), 
            radial-gradient(circle at center, rgba(0, 0, 0, 0.7) 0%, transparent 70%) 
          `,
                        // Ensure the background covers the entire div
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                    }}
                ></motion.div>
                <div className='container relative mx-auto py-8 sm:py-12 md:py-16'>

                    <div className='Titlecont min-h-[30vh] sm:min-h-[35vh] flex item-center justify-center flex-col px-4 sm:px-6 md:px-8 lg:px-0'>
                        <h1 className='Title text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-poppins text-center mb-3 sm:mb-4 md:mb-5 text-white'>{title}</h1>

                        <p className='text-center leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl w-full md:w-[85%] lg:w-[75%] xl:w-[70%] text-gray-300 mx-auto'>Hey, nice to meet you. Since you&apos;re already spending on ads but not seeing optimal results, here&apos;s what your journey might look like once we start working together.</p>
                    </div>
                    <div className="Videocont w-full flex mt-6 sm:mt-8 md:mt-10 mb-8 sm:mb-10 md:mb-12 items-center justify-center px-4 md:px-0">
                        {video && (
                            <iframe
                                src={video}
                                className="w-full max-w-[90%] sm:max-w-[640px] md:max-w-[700px] lg:max-w-[800px] h-auto aspect-video rounded-lg"
                                allow="autoplay"
                                allowFullScreen
                                title="Solution Video"
                            ></iframe>
                        )}
                    </div>

                </div>
                <div className="w-full flex justify-center px-4">
                    <a 
                        href={action} 
                        target='_blank' 
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center justify-center gap-3 sm:gap-4 px-8 sm:px-10 md:px-12 lg:px-14 xl:px-[3vw] py-4 sm:py-5 md:py-6 xl:py-[1.5vw] bg-white hover:bg-black text-black hover:text-white font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-[1.3vw] transition-all duration-500 ease-out overflow-hidden border-2 border-white hover:border-white shadow-xl hover:shadow-2xl transform hover:scale-105 cursor-pointer"
                    >
                        {/* Animated background effect */}
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out"></span>
                        
                        <span className="relative z-10 tracking-wide">Get Started Today</span>
                        <span className="relative z-10 transition-all duration-300 group-hover:translate-x-2">
                            <MoveRight className='w-5 h-5 sm:w-6 sm:h-6 xl:w-[1.6vw] xl:h-[1.6vw]' />
                        </span>
                    </a>
                </div>
            </div>


            <div className="Steps h-screen bg-[rgba(99,101,241,0.05)] relative overflow-hidden">
                <div className="absolute w-full h-[100px] bg-gradient-to-b  z-[100] from-black via-black/30 to-transparent top-0 left-0"></div>
                <div className="absolute w-full h-[200px] bg-gradient-to-t   z-[100] from-black via-black/30 to-transparent bottom-0 left-0"></div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 !z-[-50] backdrop-blur-lg rounded-2xl"
                    style={{
                        background: `
            radial-gradient( circle at 20% 80%, rgba(99, 102, 241, 0.2) 0%, transparent 55%), 
            radial-gradient(circle at 80% 20%,  rgba(236, 72, 153, 0.2) 0%, transparent 55%), 
            radial-gradient(circle at center, rgba(0, 0, 0, 0.7) 0%, transparent 70%) 
          `,
                        // Ensure the background covers the entire div
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                    }}
                ></motion.div>
                <div className="sticky container  mx-auto top-0 h-screen  flex items-center justify-center">

                    {data.map((text, index) => (
                        <React.Fragment key={index}>
                            <div className="fixed top-1/2 -translate-y-1/2 right-2 sm:right-4 md:right-10 rounded-full h-[30vh] sm:h-[35vh] md:h-[40vh] w-0.5 sm:w-1 bg-black z-50">
                                <div
                                    ref={progressRef}
                                    className="bg-[rgb(236,72,153)] w-full rounded-full"
                                    style={{ height: `0%` }}
                                />
                            </div>
                            <div
                                className={`top-6 sm:top-8 md:top-10 text-base sm:text-lg md:text-xl lg:text-4xl xl:text-6xl fixed left-4 sm:left-6 md:left-10 text-white transition-opacity duration-500 ${activeIndex === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
                                    }`}
                            >
                                {String(index + 1).padStart(2, '0')}
                            </div>

                            <div
                                ref={el => (textRefs2.current[index] = el)}
                                className={`fixed top-1/4 left-1/2 -translate-x-1/2 text-center text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-7xl w-[90%] sm:w-[85%] md:w-[75%] lg:w-[70%] text-white leading-tight transition-opacity px-4 ${activeIndex === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
                                    }`}
                            >
                                {text.title}
                            </div>

                            <div
                                ref={el => (textRefs.current[index] = el)}
                                className={`absolute font-poppins tracking-wide md:tracking-widest leading-relaxed md:leading-relaxed !font-extralight top-1/2 left-1/2 container px-4 sm:px-6 md:px-8 lg:px-0  -translate-x-1/2 text-center text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl  text-gray-200 md:w-[100%]  transition-opacity ${activeIndex === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
                                    }`}
                                dangerouslySetInnerHTML={{ __html: text.description }}
                            ></div>
                        </React.Fragment>
                    ))}

                </div>
            </div>
            <div>
                <StatsSection />
            </div>
            <Casestudies />
            <Contact />

        </QueryProvider>

    )
}

export default Page

