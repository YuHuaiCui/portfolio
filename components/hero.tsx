"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, BarChart2, BarChart, Loader2 } from "lucide-react"
import ParticleNetwork from "./particle-network"
import MetricsPanel from "./metrics-panel"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useRecaptcha } from "@/hooks/use-recaptcha"
import { useToast } from "@/components/ui/use-toast"

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [particleCount, setParticleCount] = useState(0)
  const [showMetrics, setShowMetrics] = useState(false) // State to control metrics visibility - hidden by default
  const [isContactVerifying, setIsContactVerifying] = useState(false)
  const isMobile = useMediaQuery("(max-width: 640px)")
  const { executeRecaptcha } = useRecaptcha("contact_navigation")
  const { toast } = useToast()

  useEffect(() => {
    // Set loaded state after a small delay to trigger animations
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  const scrollToNextSection = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToSection = async (sectionId: string) => {
    // If it's the contact section, verify with reCAPTCHA first
    if (sectionId === "contact") {
      setIsContactVerifying(true)

      try {
        const token = await executeRecaptcha()

        if (!token) {
          toast({
            title: "Verification Failed",
            description: "Could not verify you are human. Please try again.",
            variant: "destructive",
          })
          return
        }
      } catch (error) {
        toast({
          title: "Verification Error",
          description: "An error occurred during verification. Please try again.",
          variant: "destructive",
        })
        return
      } finally {
        setIsContactVerifying(false)
      }
    }

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

      {/* Metrics Toggle Button */}
      <motion.button
        className="absolute top-20 right-4 md:right-8 z-20 p-2 rounded-full bg-background/30 backdrop-blur-sm hover:bg-background/50 transition-colors border border-border/50"
        onClick={toggleMetrics}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        aria-label={showMetrics ? "Hide metrics" : "Show metrics"}
        title={showMetrics ? "Hide metrics" : "Show metrics"}
      >
        {showMetrics ? (
          <BarChart2 className="h-4 w-4 text-foreground/80" />
        ) : (
          <BarChart className="h-4 w-4 text-foreground/60" />
        )}
      </motion.button>

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
    </section>
  )
}
