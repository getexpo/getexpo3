"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Clock, CheckCircle2 } from "lucide-react"

export default function Contact() {
  useEffect(() => {
    // Dynamically load the external GHL form script on mount
    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);

    // Inject custom CSS to style the iframe form and remove blue colors
    const style = document.createElement("style");
    style.innerHTML = `
      #inline-MmLpa6o7BIV28EOlv2CZ {
        background: #000000 !important;
        color-scheme: dark;
      }
      
      /* Remove blue colors and apply more aggressive styling */
      iframe#inline-MmLpa6o7BIV28EOlv2CZ {
        filter: grayscale(1) contrast(0.95) brightness(0.9) !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      // Cleanup on unmount only if script exists
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  const contactInfo = [
    {
      icon: MapPin,
      title: "Location",
      details: "Vancouver, BC, Canada",
      href: "https://www.google.com/maps/place/Vancouver,+BC,+Canada",
      linkType: "external",
    },
    {
      icon: Phone,
      title: "Phone",
      details: "+1 778 712 3301",
      href: "tel:+17787123301",
      linkType: "tel",
    },
    {
      icon: Mail,
      title: "Email",
      details: "admin@getexposure.ca",
      href: "mailto:admin@getexposure.ca",
      linkType: "mailto",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Mon-Fri: 9AM-6PM PST",
      href: null,
      linkType: null,
    },
  ]

  const benefits = [
    "Free 30-minute strategy consultation",
    "Custom advertising roadmap",
    "No-obligation assessment",
    "Same-day response guarantee"
  ]

  return (
    <section id="contact" className="py-16 sm:py-24 md:py-32 lg:py-40 px-6 sm:px-8 lg:px-12 relative overflow-x-hidden bg-black">
      {/* Full black overlay to ensure no white background shows */}
      <div className="absolute inset-0 bg-black z-0"></div>
      {/* Matching gradient background from other pages */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-[1] bg-black"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), 
            radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.15) 0%, transparent 50%), 
            radial-gradient(circle at center, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.95) 70%)
          `,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Gradient fades */}
      <div className="absolute top-0 left-0 w-full h-[150px] bg-gradient-to-b from-black via-black/90 to-transparent z-[2]"></div>
      <div className="absolute bottom-0 left-0 w-full h-[150px] bg-gradient-to-t from-black via-black/90 to-transparent z-[2]"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-20 md:mb-24 space-y-4 sm:space-y-6"
        >
          <h2 className="text-[28px] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-poppins font-bold text-white tracking-tight leading-[1.2] sm:leading-none">
            Ready to Scale
            <br />
            <span className="text-gray-400 font-normal">
              Your Advertising?
            </span>
          </h2>
          <p className="text-[15px] sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-roboto">
            Book a free consultation to discover how we can transform your ad campaigns into a profitable growth engine.
          </p>
        </motion.div>

        {/* Main Content - Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 xl:gap-20 items-start">
          
          {/* Left Column - What You'll Get */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8 sm:space-y-10"
          >
            <div className="w-full">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-poppins font-bold text-white mb-6 sm:mb-8">
                What You'll Get
              </h3>
              <div className="space-y-4 sm:space-y-5">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -5 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 sm:gap-4 group min-h-[44px]"
                  >
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-white transition-colors duration-300 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span className="text-[15px] sm:text-base md:text-lg text-gray-300 group-hover:text-white transition-colors duration-300 font-roboto">
                      {benefit}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-poppins font-bold text-white mb-6 sm:mb-8">
              Get in Touch
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 w-full">
              {contactInfo.map((info, index) => {
                const Icon = info.icon
                const content = (
                  <div className="bg-black border border-white/[0.08] hover:border-white/20 transition-all duration-300 p-5 sm:p-6 h-full min-h-[140px] flex flex-col">
                    <div className="flex flex-col items-start text-left gap-3 sm:gap-4 h-full">
                      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-start">
                        <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                          {info.title}
                        </h4>
                        <p className={`text-[15px] sm:text-base font-roboto leading-relaxed break-words ${info.href ? 'text-white hover:text-gray-300' : 'text-white'}`}>
                          {info.details}
                        </p>
                      </div>
                    </div>
                  </div>
                )
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    {info.href ? (
                      <a 
                        href={info.href}
                        target={info.linkType === "external" ? "_blank" : "_self"}
                        rel={info.linkType === "external" ? "noopener noreferrer" : undefined}
                        className="block cursor-pointer h-full"
                      >
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Stats Row - Below Both Columns */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 lg:mt-20"
        >
          <div className="grid grid-cols-3 gap-4 sm:gap-5 w-full max-w-4xl mx-auto">
            {[
              { value: "50+", label: "Clients" },
              { value: "$2M+", label: "Revenue" },
              { value: "24/7", label: "Support" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-black border border-white/[0.08] hover:border-white/20 transition-all duration-300 p-5 sm:p-6 text-center min-h-[120px] flex flex-col items-center justify-center">
                  <div className="text-3xl sm:text-4xl md:text-4xl font-light text-white mb-1 sm:mb-2 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-xs text-gray-500 uppercase tracking-wider font-medium">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>



        {/* Trust Badge Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 sm:mt-20 md:mt-24 text-center"
        >
          <p className="text-xs sm:text-sm text-gray-500 font-roboto">
            Join 50+ businesses who've scaled their advertising with our proven strategies
          </p>
        </motion.div>
      </div>
    </section>
  )
}

