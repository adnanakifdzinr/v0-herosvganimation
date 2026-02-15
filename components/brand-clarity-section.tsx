'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PricingPopup } from '@/components/pricing-popup'

import { HeadingAnimation, ContentBlockAnimation } from '@/components/section-animations'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function BrandClaritySection() {
  const [isPricingOpen, setIsPricingOpen] = useState(false)
  const [hoveredCta, setHoveredCta] = useState<string | null>(null)
  const mobileImageRef = useRef<HTMLDivElement>(null)
  const [isMobileImageInView, setIsMobileImageInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsMobileImageInView(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.3 }
    )

    if (mobileImageRef.current) observer.observe(mobileImageRef.current)
    return () => mobileImageRef.current && observer.unobserve(mobileImageRef.current)
  }, [])

  return (
    <section className="w-full bg-[#1A1A1A] py-12 md:py-20 lg:py-24">
      <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
        {/* Top Text Section - Gradient reveal effect */}
        <HeadingAnimation className="mb-12 md:mb-16 lg:mb-10">
          <h2 className="text-4xl md:text-5xl lg:text-[45px] text-white font-medium leading-tight tracking-tighter">
            When your brand is clear,
            <br />
            everything else moves faster.
          </h2>
        </HeadingAnimation>

        {/* Mobile Image Placeholder - Bloom effect */}
        <motion.div
          ref={mobileImageRef}
          className="md:hidden w-full relative h-80 mb-8 flex flex-col items-center"
          initial={{ opacity: 0, filter: 'blur(20px)', scale: 1.1 }}
          animate={isMobileImageInView ? { opacity: 1, filter: 'blur(0px)', scale: 1 } : { opacity: 0, filter: 'blur(20px)', scale: 1.1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />

        {/* Bottom Section with 70/30 Layout */}
        <ContentBlockAnimation>
          <div className="grid grid-cols-1 md:grid-cols-10 gap-8 md:gap-12 lg:gap-16 items-start">
            {/* Left Side - 70% Text Content */}
            <div className="w-full md:col-span-7 space-y-6">
              <motion.p
                className="text-base md:text-lg lg:text-[22px] text-white leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                viewport={{ once: true, amount: 0.5 }}
              >
                Every strong brand begins with clarity. We start by understanding your
                audience, your story, your personality, and your product / service. When these align,
                your brand becomes unmistakable. From there, we build your brand strategy, messaging, and visual identity that express who you are with confidence and consistency. The result is a premium, cohesive brand that resonates deeply and performs across every touchpoint.
              </motion.p>

              <motion.p
                className="text-base md:text-lg lg:text-[22px] text-white leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true, amount: 0.5 }}
              >
                Schedule a call to see if we're a good fit to work together.
              </motion.p>

              {/* CTA Button */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 pt-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                viewport={{ once: true, amount: 0.5 }}
              >
                <button
                  onClick={() => setIsPricingOpen(true)}
                  onMouseEnter={() => setHoveredCta('pricing')}
                  onMouseLeave={() => setHoveredCta(null)}
                  className="px-1.5 py-2 rounded-full text-[16px] text-white font-medium border-l-2 border-r-2 border-white bg-transparent inline-flex items-center justify-between gap-12 hover:bg-white/5 transition-colors duration-200 cursor-pointer relative overflow-hidden"
                >
                  Our Prices
                  <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                    <motion.div
                      animate={{
                        x: hoveredCta === 'pricing' ? 30 : 0,
                        opacity: hoveredCta === 'pricing' ? 0 : 1
                      }}
                      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="absolute"
                    >
                      <ArrowRight className="w-6 h-6 text-black" strokeWidth={2} />
                    </motion.div>
                    <motion.div
                      animate={{
                        x: hoveredCta === 'pricing' ? 0 : -30,
                        opacity: hoveredCta === 'pricing' ? 1 : 0
                      }}
                      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="absolute"
                    >
                      <ArrowRight className="w-6 h-6 text-black" strokeWidth={2} />
                    </motion.div>
                  </div>
                </button>
              </motion.div>
            </div>
          </div>
        </ContentBlockAnimation>
      </div>

      {/* Pricing Popup */}
      <PricingPopup
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
      />
    </section>
  )
}
