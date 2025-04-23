"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Github, Info, LinkIcon } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"

// --- Types ---
interface Project {
  id: number
  slug: string
  title: string
  description: string
  images: string[]
  tags: string[]
  tagColors: Record<string, string>
  githubLink: string
  detailedDescription?: string
  videoUrl?: string
}

// --- Tag colors map ---
const tagColorMap: Record<string, any> = {
  react: {
    bg: "bg-blue-100",
    bgDark: "dark:bg-blue-900/50",
    text: "text-blue-800",
    textDark: "dark:text-blue-200",
    hover: "hover:bg-blue-200",
    hoverDark: "dark:hover:bg-blue-800",
  },
  nextjs: {
    bg: "bg-black",
    bgDark: "dark:bg-black",
    text: "text-white",
    textDark: "dark:text-white",
    hover: "hover:bg-gray-800",
    hoverDark: "dark:hover:bg-gray-900",
  },
  javascript: {
    bg: "bg-yellow-100",
    bgDark: "dark:bg-yellow-900/50",
    text: "text-yellow-800",
    textDark: "dark:text-yellow-200",
    hover: "hover:bg-yellow-200",
    hoverDark: "dark:hover:bg-yellow-800",
  },
  typescript: {
    bg: "bg-blue-100",
    bgDark: "dark:bg-blue-900/50",
    text: "text-blue-800",
    textDark: "dark:text-blue-200",
    hover: "hover:bg-blue-200",
    hoverDark: "dark:hover:bg-blue-800",
  },
  node: {
    bg: "bg-green-100",
    bgDark: "dark:bg-green-900/50",
    text: "text-green-800",
    textDark: "dark:text-green-200",
    hover: "hover:bg-green-200",
    hoverDark: "dark:hover:bg-green-800",
  },
  mongodb: {
    bg: "bg-green-100",
    bgDark: "dark:bg-green-900/50",
    text: "text-green-800",
    textDark: "dark:text-green-200",
    hover: "hover:bg-green-200",
    hoverDark: "dark:hover:bg-green-800",
  },
  firebase: {
    bg: "bg-amber-100",
    bgDark: "dark:bg-amber-900/50",
    text: "text-amber-800",
    textDark: "dark:text-amber-200",
    hover: "hover:bg-amber-200",
    hoverDark: "dark:hover:bg-amber-800",
  },
  tailwind: {
    bg: "bg-cyan-100",
    bgDark: "dark:bg-cyan-900/50",
    text: "text-cyan-800",
    textDark: "dark:text-cyan-200",
    hover: "hover:bg-cyan-200",
    hoverDark: "dark:hover:bg-cyan-800",
  },
  api: {
    bg: "bg-indigo-100",
    bgDark: "dark:bg-indigo-900/50",
    text: "text-indigo-800",
    textDark: "dark:text-indigo-200",
    hover: "hover:bg-indigo-200",
    hoverDark: "dark:hover:bg-indigo-800",
  },
  chart: {
    bg: "bg-pink-100",
    bgDark: "dark:bg-pink-900/50",
    text: "text-pink-800",
    textDark: "dark:text-pink-200",
    hover: "hover:bg-pink-200",
    hoverDark: "dark:hover:bg-pink-800",
  },
  stripe: {
    bg: "bg-purple-100",
    bgDark: "dark:bg-purple-900/50",
    text: "text-purple-800",
    textDark: "dark:text-purple-200",
    hover: "hover:bg-purple-200",
    hoverDark: "dark:hover:bg-purple-800",
  },
  default: {
    bg: "bg-gray-100",
    bgDark: "dark:bg-gray-800",
    text: "text-gray-800",
    textDark: "dark:text-gray-200",
    hover: "hover:bg-gray-200",
    hoverDark: "dark:hover:bg-gray-700",
  },
}

// --- Static project data ---
const projects: Project[] = [
  {
    id: 1,
    slug: "ecommerce-platform",
    title: "E‑Commerce Platform",
    description:
      "A full‑stack e‑commerce platform with product management, cart functionality, and payment processing.",
    images: [
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500&text=Product+Page",
      "/placeholder.svg?height=300&width=500&text=Checkout",
    ],
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    tagColors: { React: "react", "Node.js": "node", MongoDB: "mongodb", Stripe: "stripe" },
    githubLink: "#",
    detailedDescription:
      "This comprehensive e‑commerce platform features a responsive design, user authentication, product catalog with filtering and search, shopping cart functionality, secure checkout with Stripe integration, order history, and an admin dashboard for product and order management. Built with React for the frontend, Node.js and Express for the backend, and MongoDB for the database.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 2,
    slug: "task-management",
    title: "Task Management App",
    description: "A collaborative task management application with real‑time updates and team functionality.",
    images: [
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500&text=Task+Board",
      "/placeholder.svg?height=300&width=500&text=Calendar+View",
    ],
    tags: ["Next.js", "Firebase", "Tailwind CSS"],
    tagColors: { "Next.js": "nextjs", Firebase: "firebase", "Tailwind CSS": "tailwind" },
    githubLink: "#",
    detailedDescription:
      "A task management application that allows teams to collaborate in real‑time. Features include task creation and assignment, due dates, priority levels, comments, file attachments, and real‑time notifications. The app uses Next.js for the frontend, Firebase for real‑time database and authentication, and Tailwind CSS for styling.",
  },
  {
    id: 3,
    slug: "weather-dashboard",
    title: "Weather Dashboard",
    description: "A weather dashboard that displays current and forecasted weather data for multiple locations.",
    images: [
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500&text=Forecast+View",
      "/placeholder.svg?height=300&width=500&text=Location+Search",
    ],
    tags: ["JavaScript", "Weather API", "Chart.js"],
    tagColors: { JavaScript: "javascript", "Weather API": "api", "Chart.js": "chart" },
    githubLink: "#",
    detailedDescription:
      "A weather dashboard application that provides current weather conditions and forecasts for multiple locations. Features include location search, 7‑day forecasts, hourly breakdowns, weather maps, and customizable units. The app uses vanilla JavaScript with the OpenWeather API and Chart.js for data visualization.",
  },
]

export default function Projects() {
  const isMobile = useMediaQuery("(max-width: 640px)")
  const router = useRouter()
  const searchParams = useSearchParams()
  const projectParam = searchParams.get("project")

  // derive dialog state from param
  const selectedProject = projectParam ? (projects.find((p) => p.slug === projectParam) ?? null) : null
  const isDialogOpen = selectedProject !== null

  // carousel & share-link state
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [shareUrl, setShareUrl] = useState("")

  // whenever selection changes, reset and build URL
  useEffect(() => {
    setCurrentImageIndex(0)
    if (selectedProject) {
      const url = new URL(window.location.href)
      url.searchParams.set("project", selectedProject.slug)
      setShareUrl(url.toString())
    }
  }, [selectedProject])

  const handleProjectDetails = (project: Project) => {
    router.push(`?project=${project.slug}#projects`, { scroll: false })
  }

  const handleCloseDialog = () => {
    // Use replace instead of push to avoid adding to history stack
    router.replace(`${window.location.pathname}#projects`, { scroll: false })
  }

  const nextImage = () => selectedProject && setCurrentImageIndex((i) => (i + 1) % selectedProject.images.length)
  const prevImage = () =>
    selectedProject &&
    setCurrentImageIndex((i) => (i - 1 + selectedProject.images.length) % selectedProject.images.length)
  const copyShareLink = async () => {
    if (!shareUrl) return
    try {
      await navigator.clipboard.writeText(shareUrl)
      alert("Link copied!")
    } catch {
      console.error("copy failed")
    }
  }
  const getTagStyles = (tag: string, proj: Project) => {
    const key = proj.tagColors[tag]?.toLowerCase() || "default"
    const s = tagColorMap[key] ?? tagColorMap.default
    return cn(s.bg, s.bgDark, s.text, s.textDark, s.hover, s.hoverDark)
  }

  return (
    <section id="projects" className="py-16 md:py-20 px-4 bg-muted/50 relative overflow-hidden">
      {/* background decorations */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-royal-500 to-transparent" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-royal-200 dark:bg-royal-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.h2
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          My Projects
        </motion.h2>

        <motion.p
          className="text-center text-muted-foreground max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Here are some of my recent projects. Each one was built with care and attention to detail.
        </motion.p>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.2 } } }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            >
              <Card className="overflow-hidden flex flex-col h-full group transition-shadow hover:shadow-xl border-transparent hover:border-royal-200 dark:hover:border-royal-800">
                <div className="relative h-40 sm:h-48 w-full overflow-hidden">
                  <Image
                    src={project.images[0] || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="text-lg md:text-xl group-hover:text-royal-600 dark:group-hover:text-royal-400 transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-sm md:text-base">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow p-4 md:p-6 pt-0">
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} className={`text-xs ${getTagStyles(tag, project)}`}>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between p-4 md:p-6 pt-0">
                  <Button
                    asChild
                    variant="outline"
                    size={isMobile ? "sm" : "default"}
                    className="transition-all duration-300 hover:scale-105 hover:bg-background/80 hover:border-royal-300 
                    dark:hover:border-royal-700 group"
                  >
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12 duration-200" />
                      <span>Code</span>
                    </a>
                  </Button>
                  <Button
                    size={isMobile ? "sm" : "default"}
                    className="bg-gradient-to-r from-royal-500 to-royal-700 hover:from-royal-600 hover:to-royal-800 border-0 
                    transition-all duration-300 hover:scale-105 hover:shadow-md hover:shadow-royal-500/20 
                    dark:hover:shadow-royal-700/20 relative overflow-hidden group"
                    onClick={() => handleProjectDetails(project)}
                  >
                    <span
                      className="absolute inset-0 w-full h-full bg-gradient-to-r from-royal-400/0 via-white/10 to-royal-400/0 
                    transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                    ></span>
                    <Info className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12 duration-200" />
                    <span className="relative z-10">Details</span>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* DETAILS DIALOG - Modified to prevent particle network issues */}
      <Dialog open={isDialogOpen} onOpenChange={(open) => !open && handleCloseDialog()}>
        <DialogContent
          className="max-w-3xl max-h-[90vh] overflow-y-auto p-4 md:p-6"
          // Add this to ensure dialog doesn't affect parent DOM structure
          onPointerDownOutside={(e) => {
            e.preventDefault()
            handleCloseDialog()
          }}
        >
          {selectedProject && (
            <>
              <DialogHeader className="flex justify-between items-center">
                <DialogTitle className="text-xl md:text-2xl">{selectedProject.title}</DialogTitle>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={copyShareLink}
                  title="Copy link"
                  className="rounded-full transition-all duration-300 hover:scale-110 hover:bg-background/80 
                  hover:border-royal-300 dark:hover:border-royal-700"
                >
                  <LinkIcon className="h-4 w-4 transition-transform hover:rotate-12 duration-200" />
                </Button>
              </DialogHeader>

              {/* Image carousel */}
              <div className="relative w-full h-64 mb-4">
                <Image
                  src={selectedProject.images[currentImageIndex] || "/placeholder.svg"}
                  alt={`${selectedProject.title} ${currentImageIndex + 1}`}
                  fill
                  className="object-cover rounded-lg"
                />
                {selectedProject.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Description */}
              <div className="prose dark:prose-invert max-w-none mb-4">
                <p>{selectedProject.detailedDescription}</p>
              </div>

              {/* Optional video */}
              {selectedProject.videoUrl && (
                <div className="aspect-video w-full rounded-lg overflow-hidden mb-4">
                  <iframe
                    src={selectedProject.videoUrl}
                    title={`${selectedProject.title} demo`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map((tag) => (
                  <Badge key={tag} className={`text-xs ${getTagStyles(tag, selectedProject)}`}>
                    {tag}
                  </Badge>
                ))}
              </div>
              <Button
                asChild
                variant="outline"
                className="border-royal-300 dark:border-royal-700 transition-all duration-300 
                hover:scale-105 hover:bg-background/80 group"
              >
                <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12 duration-200" />
                  <span>View Code</span>
                </a>
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
