'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Home, ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 
            className={`text-[150px] md:text-[250px] font-bold leading-none transition-all duration-1000 ${
              mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #888888 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 80px rgba(255,255,255,0.1)',
            }}
          >
            404
          </h1>
        </div>

        {/* Message */}
        <div 
          className={`mb-12 transition-all duration-1000 delay-300 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-poppins">
            Page Not Found
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-raleway">
            Looks like you've ventured into uncharted territory. The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div 
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-500 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <Link
            href="/"
            className="group relative px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Home className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Back to Home</span>
          </Link>

          <Link
            href="/"
            className="group px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-full hover:border-white/40 transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span>Go Back</span>
          </Link>
        </div>

        {/* Suggestions */}
        <div 
          className={`mt-16 transition-all duration-1000 delay-700 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-gray-500 text-sm mb-6 font-raleway">You might be interested in:</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/"
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm transition-all duration-300 hover:scale-105"
            >
              Home
            </Link>
            <Link
              href="/#case-studies"
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm transition-all duration-300 hover:scale-105"
            >
              Case Studies
            </Link>
            <Link
              href="/#solutions"
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm transition-all duration-300 hover:scale-105"
            >
              Solutions
            </Link>
            <Link
              href="/#contact"
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm transition-all duration-300 hover:scale-105"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(50px);
            opacity: 0;
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  )
}

