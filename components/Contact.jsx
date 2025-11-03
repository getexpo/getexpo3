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
    },
    {
      icon: Phone,
      title: "Phone",
      details: "+1 778 712 3301",
    },
    {
      icon: Mail,
      title: "Email",
      details: "team@getexposure.ca",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Mon-Fri: 9AM-6PM PST",
    },
  ]

  const benefits = [
    "Free 30-minute strategy consultation",
    "Custom advertising roadmap",
    "No-obligation assessment",
    "Same-day response guarantee"
  ]

  return (
    <section id="contact" className="py-16 sm:py-24 md:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-black">
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-20 md:mb-24 space-y-4 sm:space-y-6"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-poppins font-bold text-white tracking-tight leading-none">
            Ready to Scale
            <br />
            <span className="text-gray-400 font-normal">
              Your Advertising?
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-roboto">
            Book a free consultation to discover how we can transform your ad campaigns into a profitable growth engine.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 xl:gap-20 items-start">
          
          {/* Left Column - Info & Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8 sm:space-y-10 lg:space-y-12"
          >
            {/* What You Get Section */}
            <div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-poppins font-bold text-white mb-6 sm:mb-8">
                What You'll Get
              </h3>
              <div className="space-y-4 sm:space-y-5">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 sm:gap-4 group"
                  >
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-white transition-colors duration-300 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span className="text-sm sm:text-base md:text-lg text-gray-300 group-hover:text-white transition-colors duration-300 font-roboto">
                      {benefit}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact Info Cards */}
            <div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-poppins font-bold text-white mb-6 sm:mb-8">
                Get in Touch
              </h3>
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="group"
                    >
                      <div className="bg-black border border-white/[0.08] hover:border-white/20 transition-all duration-300 p-5 sm:p-6 h-full">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                              {info.title}
                            </h4>
                            <p className="text-sm sm:text-base text-white font-roboto leading-relaxed break-words">
                              {info.details}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 sm:gap-5">
              {[
                { value: "50+", label: "Clients" },
                { value: "$2M+", label: "Revenue" },
                { value: "24/7", label: "Support" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-black border border-white/[0.08] hover:border-white/20 transition-all duration-300 p-4 sm:p-6 text-center">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-1 sm:mb-2 tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider font-medium">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

{/*           
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-24"
          >
            <div className="relative group">
              
              <div className="absolute -inset-[1px] bg-gradient-to-r from-indigo-500/20 via-pink-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />
              
              
              <div className="relative bg-gradient-to-b from-[#0a0a0a] to-black border border-white/[0.08] overflow-hidden">
                
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                
                
                <div className="bg-black p-1">
                  <iframe
                    src="https://api.leadconnectorhq.com/widget/form/MmLpa6o7BIV28EOlv2CZ"
                    scrolling="no"
                    style={{
                      width: "100%",
                      height: "650px",
                      border: "none",
                      overflow: "hidden",
                      background: "#000000",
                      colorScheme: "dark",
                    }}
                    className="sm:h-[700px] md:h-[750px]"
                    id="inline-MmLpa6o7BIV28EOlv2CZ"
                    data-layout='{"id":"INLINE"}'
                    data-trigger-type="alwaysShow"
                    data-trigger-value=""
                    data-activation-type="alwaysActivated"
                    data-activation-value=""
                    data-deactivation-type="neverDeactivate"
                    data-deactivation-value=""
                    data-form-name="Discover new Marketing Strategies"
                    data-height="700"
                    data-layout-iframe-id="inline-MmLpa6o7BIV28EOlv2CZ"
                    data-form-id="MmLpa6o7BIV28EOlv2CZ"
                    title="Discover new Marketing Strategies"
                  />
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          </motion.div>
         */}
        
        </div>

        {/* Trust Badge Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
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

