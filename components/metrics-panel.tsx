"use client"

import { useState, useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { Cpu, Gauge } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

interface MetricsPanelProps {
  particleCount: number
}

export default function MetricsPanel({ particleCount }: MetricsPanelProps) {
  const [fps, setFps] = useState(0)
  const frameTimeRef = useRef<number>(performance.now())
  const frameCountRef = useRef<number>(0)
  const lastUpdateRef = useRef<number>(performance.now())
  const { theme } = useTheme()
  const isMobile = useMediaQuery("(max-width: 640px)")

  // Calculate FPS
  useEffect(() => {
    let animationFrameId: number

    const updateFps = () => {
      const now = performance.now()
      frameCountRef.current++

      // Update FPS every 500ms
      if (now - lastUpdateRef.current >= 500) {
        const elapsedTime = now - lastUpdateRef.current
        const currentFps = Math.round((frameCountRef.current * 1000) / elapsedTime)
        setFps(currentFps)
        frameCountRef.current = 0
        lastUpdateRef.current = now
      }

      animationFrameId = requestAnimationFrame(updateFps)
    }

    animationFrameId = requestAnimationFrame(updateFps)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  // Color based on FPS performance
  const getFpsColor = () => {
    if (fps >= 55) return "text-green-400"
    if (fps >= 30) return "text-yellow-400"
    return "text-red-400"
  }

  // Update the mobile layout to avoid collision with the down button
  // For mobile screens, use a more compact layout
  if (isMobile) {
    return (
      <div className="absolute bottom-28 w-full pointer-events-none">
        <div className="w-full flex justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col items-center gap-1"
          >
            <div className="flex items-center gap-1.5">
              <Gauge className="h-3 w-3 text-green-400" />
              <span className={`text-xs font-mono font-medium ${getFpsColor()}`}>{fps} FPS</span>
            </div>

            <div className="w-8 h-px bg-royal-500/30"></div>

            <div className="flex items-center gap-1.5">
              <Cpu className="h-3 w-3 text-royal-400" />
              <span className="text-xs font-mono font-medium text-royal-300">{particleCount} particles</span>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  // For desktop screens, use the original layout
  return (
    <div className="absolute bottom-24 w-full pointer-events-none">
      <div className="w-full flex justify-center">
        {/* Container to ensure the divider is centered */}
        <div className="relative">
          {/* Centered divider that aligns with the down button */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-3.5 w-px bg-royal-500/30"></div>

          {/* Metrics panel with fixed width to ensure proper layout */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center whitespace-nowrap"
            style={{ minWidth: "300px" }}
          >
            {/* FPS metric */}
            <div className="flex items-center gap-1.5 flex-1 justify-end pr-6">
              <Gauge className="h-3.5 w-3.5 text-green-400" />
              <span className={`text-xs font-mono font-medium ${getFpsColor()}`}>{fps} FPS</span>
            </div>

            {/* Empty space for the divider */}
            <div className="w-px invisible">|</div>

            {/* Particles metric */}
            <div className="flex items-center gap-1.5 flex-1 pl-6">
              <Cpu className="h-3.5 w-3.5 text-royal-400" />
              <span className="text-xs font-mono font-medium text-royal-300">{particleCount} particles</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
