"use client"

import { useState, useEffect } from "react"
import { HeroSection } from "@/components/landing/hero-section"
import { SecurityFeature } from "@/components/landing/security-feature"
import { HowItWorks } from "@/components/landing/how-it-works"
import { BenefitsSection } from "@/components/landing/benefits-section"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { FaqSection } from "@/components/landing/faq-section"
import { CtaSection } from "@/components/landing/cta-section"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <HeroSection />
        <SecurityFeature />
        <HowItWorks />
        <BenefitsSection />
        <TestimonialsSection />
        <FaqSection />
        <CtaSection />
      </main>

      <SiteFooter />
    </div>
  )
}

