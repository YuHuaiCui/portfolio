"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { ChevronDown, BarChart2, BarChart, Loader2 } from "lucide-react"
import ParticleNetwork from "./particle-network"
import MetricsPanel from "./metrics-panel"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useToast } from "@/components/ui/use-toast"

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [particleCount, setParticleCount] = useState(0)
  const [showMetrics, setShowMetrics] = useState(false) // State to control metrics visibility - hidden by default
  const [isContactVerifying, setIsContactVerifying] = useState(false)
  const isMobile = useMediaQuery("(max-width: 640px)")
  const { toast } = useToast()
  const metricsButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    // Set loaded state after a small delay to trigger animations
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  // Effect to ensure the metrics button is properly positioned
  useEffect(() => {
    if (metricsButtonRef.current) {
      // Force the button to the bottom right corner
      const button = metricsButtonRef.current
      button.style.position = "fixed"
      button.style.bottom = "20px"
      button.style.right = "20px"
      button.style.top = "auto"
      button.style.left = "auto"
      button.style.zIndex = "9999"
    }
  }, [])

  const scrollToNextSection = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToSection = async (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  }

  const lineVariants = {
    hidden: { width: "0%" },
    visible: {
      width: "100%",
      transition: { duration: 1.2, ease: "easeInOut", delay: 0.2 },
    },
  }

  const handleParticleCountChange = (count: number) => {
    setParticleCount(count)
  }

  // Toggle metrics visibility
  const toggleMetrics = () => {
    setShowMetrics((prev) => !prev)
  }

  return (
    <section
      id="home"
      className="relative h-screen w-full flex flex-col items-center justify-center text-center px-4 overflow-hidden"
    >
      {/* Base gradient background */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 from-slate-100 via-slate-200 to-slate-100 w-full"></div>

      {/* Particle Network Background - Ensure it's always rendered */}
      <ParticleNetwork onParticleCountChange={handleParticleCountChange} />

      {/* Metrics Toggle Button - Using inline styles and ref for direct manipulation */}
      <button
        ref={metricsButtonRef}
        onClick={toggleMetrics}
        aria-label={showMetrics ? "Hide metrics" : "Show metrics"}
        title={showMetrics ? "Hide metrics" : "Show metrics"}
        className="metrics-button p-2 rounded-full bg-background/30 backdrop-blur-sm hover:bg-background/50 transition-colors border border-border/50 shadow-md"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          top: "auto",
          left: "auto",
          zIndex: 9999,
        }}
      >
        {showMetrics ? (
          <BarChart2 className="h-4 w-4 text-foreground/80" />
        ) : (
          <BarChart className="h-4 w-4 text-foreground/60" />
        )}
      </button>

      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-royal-500 to-transparent"
        initial="hidden"
        animate="visible"
        variants={lineVariants}
      ></motion.div>

      <div className="w-full max-w-4xl mx-auto flex flex-col items-center z-10 relative">
        <motion.div
          className="flex flex-col items-center w-full"
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="w-full">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-royal-400 to-royal-600">
                Hello, I'm Daniel Cui
              </span>
            </h1>
          </motion.div>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mb-8"
            variants={itemVariants}
          >
            A passionate developer building amazing digital experiences
          </motion.p>

          <motion.div variants={itemVariants} className="w-full flex justify-center">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size={isMobile ? "default" : "lg"}
                className="bg-gradient-to-r from-royal-500 to-royal-700 hover:from-royal-600 hover:to-royal-800 border-0 transition-all duration-300 hover:scale-105 z-10 relative"
                onClick={() => scrollToSection("projects")}
              >
                View My Work
              </Button>
              <Button
                size={isMobile ? "default" : "lg"}
                variant="outline"
                className="text-foreground border-foreground hover:bg-foreground/10 dark:bg-black/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 z-10 relative"
                onClick={() => scrollToSection("contact")}
                disabled={isContactVerifying}
              >
                {isContactVerifying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  "Contact Me"
                )}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Metrics Panel - conditionally rendered based on showMetrics state */}
      {showMetrics && <MetricsPanel particleCount={particleCount} />}

      <div className="absolute bottom-0 w-full flex justify-center">
        <motion.button
          className="absolute bottom-10 animate-bounce p-2 rounded-full hover:bg-foreground/10 transition-colors cursor-pointer z-10 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          onClick={scrollToNextSection}
          aria-label="Scroll to About section"
        >
          <ChevronDown className="h-6 w-6 opacity-70" />
        </motion.button>
      </div>

      {/* Add global style to ensure metrics button positioning */}
      <style jsx global>{`
        .metrics-button {
          position: fixed !important;
          bottom: 20px !important;
          right: 20px !important;
          top: auto !important;
          left: auto !important;
          z-index: 9999 !important;
        }
      `}</style>
    </section>
  )
}
