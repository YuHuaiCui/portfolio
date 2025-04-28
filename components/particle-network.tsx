"use client"

import { useEffect, useRef, useState, useMemo, useCallback } from "react"
import { useTheme } from "next-themes"
import { useMediaQuery } from "@/hooks/use-media-query"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  gridX?: number
  gridY?: number
}

interface Grid {
  [key: string]: Particle[]
}

interface ParticleNetworkProps {
  onParticleCountChange?: (count: number) => void
}

export default function ParticleNetwork({ onParticleCountChange }: ParticleNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const heroSectionRef = useRef<HTMLElement | null>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMouseInCanvas, setIsMouseInCanvas] = useState(false)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>(0)
  const lastFrameTimeRef = useRef<number>(0)
  const gridRef = useRef<Grid>({})
  const prevSizeRef = useRef<{ width: number; height: number }>({ width: 0, height: 0 })
  const { resolvedTheme } = useTheme()
  const isMobile = useMediaQuery("(max-width: 640px)")

  // Theme-based colors
  const themeColors = useMemo(() => {
    const isDark = resolvedTheme === "dark"
    return {
      baseColors: isDark
        ? ["rgba(99, 113, 241, 0.8)", "rgba(79, 79, 229, 0.8)", "rgba(147, 197, 253, 0.8)"]
        : [
            "rgba(79, 70, 229, 0.6)", // primary
            "rgba(102, 126, 234, 0.6)", // accent
            "rgba(165, 180, 252, 0.6)", // highlight
          ],
      mouseColor: isDark ? "rgba(239, 68, 68, 0.8)" : "rgba(239, 68, 68, 0.8)",
      glowStart: isDark ? "rgba(239, 68, 68, 0.3)" : "rgba(239, 68, 68, 0.3)",
      glowEnd: isDark ? "rgba(0, 0, 0, 0)" : "rgba(255, 255, 255, 0)",
      lineOpacityMultiplier: isDark ? 1 : 0.8,
    }
  }, [resolvedTheme])

  // Device-specific settings
  const deviceSettings = useMemo(
    () => ({
      connectionDistance: isMobile ? 100 : 150,
      mouseConnectionDistance: isMobile ? 250 : 350,
      glowRadius: isMobile ? 40 : 60,
      cellSize: isMobile ? 100 : 150,
      particleDensityFactor: isMobile ? 15000 : 12000,
      maxParticles: isMobile ? 80 : 120,
      particleSpeed: isMobile ? 0.2 : 0.3, // Adjusted speed for mobile
    }),
    [isMobile],
  )

  // Spatial grid functions
  const updateGrid = useCallback((particles: Particle[], cellSize: number) => {
    const grid: Grid = {}
    particles.forEach((particle) => {
      const gridX = Math.floor(particle.x / cellSize)
      const gridY = Math.floor(particle.y / cellSize)
      const key = `${gridX},${gridY}`
      particle.gridX = gridX
      particle.gridY = gridY
      if (!grid[key]) grid[key] = []
      grid[key].push(particle)
    })
    return grid
  }, [])

  const getNearbyParticles = useCallback((particle: Particle, grid: Grid) => {
    const nearby: Particle[] = []
    const { gridX, gridY } = particle
    if (gridX === undefined || gridY === undefined) return nearby

    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const key = `${gridX + dx},${gridY + dy}`
        if (grid[key]) nearby.push(...grid[key])
      }
    }
    return nearby
  }, [])

  // Resize and initialize particles
  useEffect(() => {
    heroSectionRef.current = document.getElementById("home")

    const handleResize = () => {
      const canvasEl = canvasRef.current
      const heroEl = heroSectionRef.current
      if (!canvasEl || !heroEl) return

      const { width, height } = heroEl.getBoundingClientRect()
      const prev = prevSizeRef.current
      // Skip small height-only changes (e.g. mobile UI)
      if (width === prev.width && Math.abs(height - prev.height) < 20) return
      prevSizeRef.current = { width, height }

      canvasEl.width = width
      canvasEl.height = height
      setDimensions({ width, height })

      const count = Math.min(
        Math.floor((width * height) / deviceSettings.particleDensityFactor),
        deviceSettings.maxParticles,
      )
      const newParticles: Particle[] = []
      for (let i = 0; i < count; i++) {
        newParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * deviceSettings.particleSpeed,
          vy: (Math.random() - 0.5) * deviceSettings.particleSpeed,
          radius: Math.random() * (isMobile ? 1.5 : 2) + 1,
          color: themeColors.baseColors[Math.floor(Math.random() * themeColors.baseColors.length)],
        })
      }
      particlesRef.current = newParticles
      gridRef.current = updateGrid(newParticles, deviceSettings.cellSize)
      if (onParticleCountChange) {
        onParticleCountChange(count)
      }
    }

    handleResize()

    // Use ResizeObserver instead of window resize for more reliable updates
    const resizeObserver = new ResizeObserver(() => {
      if (heroSectionRef.current) {
        handleResize()
      }
    })

    if (heroSectionRef.current) {
      resizeObserver.observe(heroSectionRef.current)
    }

    return () => {
      if (heroSectionRef.current) {
        resizeObserver.unobserve(heroSectionRef.current)
      }
      resizeObserver.disconnect()
      cancelAnimationFrame(animationRef.current)
    }
  }, [
    onParticleCountChange,
    deviceSettings.particleDensityFactor,
    deviceSettings.maxParticles,
    deviceSettings.cellSize,
    deviceSettings.particleSpeed,
    themeColors.baseColors,
    isMobile,
    updateGrid,
  ])

  // Mouse movement
  useEffect(() => {
    // For mobile, simulate a moving point to create some animation
    if (isMobile) {
      let angle = 0
      const radius = Math.min(dimensions.width, dimensions.height) * 0.3
      const centerX = dimensions.width / 2
      const centerY = dimensions.height / 2

      const movePoint = () => {
        angle += 0.01
        setMousePosition({
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,
        })
        setIsMouseInCanvas(true)
      }

      const intervalId = setInterval(movePoint, 50)
      return () => clearInterval(intervalId)
    }

    const onMouseMove = (e: MouseEvent) => {
      const heroRect = heroSectionRef.current?.getBoundingClientRect()
      const canvasEl = canvasRef.current
      if (!heroRect || !canvasEl) {
        setIsMouseInCanvas(false)
        return
      }

      if (
        e.clientX >= heroRect.left &&
        e.clientX <= heroRect.right &&
        e.clientY >= heroRect.top &&
        e.clientY <= heroRect.bottom
      ) {
        const canvasRect = canvasEl.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - canvasRect.left,
          y: e.clientY - canvasRect.top,
        })
        setIsMouseInCanvas(true)
      } else {
        setIsMouseInCanvas(false)
      }
    }

    const onMouseLeave = () => setIsMouseInCanvas(false)

    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseleave", onMouseLeave)

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseleave", onMouseLeave)
    }
  }, [isMobile, dimensions])

  // Animation loop
  useEffect(() => {
    const distanceCache = new Map<string, number>()

    const animate = (timestamp: number) => {
      const canvasEl = canvasRef.current
      if (!canvasEl) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      const delta = timestamp - lastFrameTimeRef.current
      lastFrameTimeRef.current = timestamp

      if (delta < 0 || delta > 100) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      const timeScale = delta / 16.67
      const ctx = canvasEl.getContext("2d")

      if (!ctx) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      // Update particle positions
      particlesRef.current.forEach((p) => {
        p.x += p.vx * timeScale
        p.y += p.vy * timeScale

        if (p.x < 0 || p.x > dimensions.width) p.vx = -p.vx
        if (p.y < 0 || p.y > dimensions.height) p.vy = -p.vy
      })

      // Update grid
      gridRef.current = updateGrid(particlesRef.current, deviceSettings.cellSize)
      distanceCache.clear()

      // Draw particles and connections
      particlesRef.current.forEach((p, i) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()

        const nearby = getNearbyParticles(p, gridRef.current)
        nearby.forEach((p2) => {
          if (p === p2 || p2.x < p.x) return

          const key = `${i}-${particlesRef.current.indexOf(p2)}`
          let dist = distanceCache.get(key)

          if (dist === undefined) {
            const dx = p.x - p2.x
            const dy = p.y - p2.y
            dist = Math.sqrt(dx * dx + dy * dy)
            distanceCache.set(key, dist)
          }

          if (dist < deviceSettings.connectionDistance) {
            const opacity = (1 - dist / deviceSettings.connectionDistance) * themeColors.lineOpacityMultiplier
            const grad = ctx.createLinearGradient(p.x, p.y, p2.x, p2.y)
            grad.addColorStop(0, p.color)
            grad.addColorStop(1, p2.color)
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = grad
            ctx.lineWidth = 0.6 * opacity
            ctx.stroke()
          }
        })

        // Mouse connections
        if (isMouseInCanvas) {
          const dx = p.x - mousePosition.x
          const dy = p.y - mousePosition.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < deviceSettings.mouseConnectionDistance) {
            const opacity = (1 - dist / deviceSettings.mouseConnectionDistance) * themeColors.lineOpacityMultiplier
            const grad = ctx.createLinearGradient(p.x, p.y, mousePosition.x, mousePosition.y)
            grad.addColorStop(0, p.color)
            grad.addColorStop(1, themeColors.mouseColor)
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(mousePosition.x, mousePosition.y)
            ctx.strokeStyle = grad
            ctx.lineWidth = 0.8 * opacity
            ctx.stroke()
          }
        }
      })

      // Mouse glow
      if (isMouseInCanvas) {
        const grad = ctx.createRadialGradient(
          mousePosition.x,
          mousePosition.y,
          0,
          mousePosition.x,
          mousePosition.y,
          deviceSettings.glowRadius,
        )
        grad.addColorStop(0, themeColors.glowStart)
        grad.addColorStop(1, themeColors.glowEnd)
        ctx.beginPath()
        ctx.arc(mousePosition.x, mousePosition.y, deviceSettings.glowRadius, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    lastFrameTimeRef.current = performance.now()
    animationRef.current = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationRef.current)
  }, [dimensions, mousePosition, isMouseInCanvas, deviceSettings, themeColors, updateGrid, getNearbyParticles])

  return (
    <div className="absolute inset-0 w-full h-full -z-10 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
