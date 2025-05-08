"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

// Define tag color mapping
const skillColorMap: Record<
  string,
  { bg: string; bgDark: string; text: string; textDark: string; hover: string; hoverDark: string }
> = {
  react: {
    bg: "bg-blue-100",
    bgDark: "dark:bg-blue-900/50",
    text: "text-blue-800",
    textDark: "dark:text-blue-200",
    hover: "hover:bg-blue-200",
    hoverDark: "dark:hover:bg-blue-800",
  },
  typescript: {
    bg: "bg-blue-100",
    bgDark: "dark:bg-blue-900/50",
    text: "text-blue-800",
    textDark: "dark:text-blue-200",
    hover: "hover:bg-blue-200",
    hoverDark: "dark:hover:bg-blue-800",
  },
  javascript: {
    bg: "bg-yellow-100",
    bgDark: "dark:bg-yellow-900/50",
    text: "text-yellow-800",
    textDark: "dark:text-yellow-200",
    hover: "hover:bg-yellow-200",
    hoverDark: "dark:hover:bg-yellow-800",
  },
  redux: {
    bg: "bg-purple-100",
    bgDark: "dark:bg-purple-900/50",
    text: "text-purple-800",
    textDark: "dark:text-purple-200",
    hover: "hover:bg-purple-200",
    hoverDark: "dark:hover:bg-purple-800",
  },
  graphql: {
    bg: "bg-pink-100",
    bgDark: "dark:bg-pink-900/50",
    text: "text-pink-800",
    textDark: "dark:text-pink-200",
    hover: "hover:bg-pink-200",
    hoverDark: "dark:hover:bg-pink-800",
  },
  html: {
    bg: "bg-orange-100",
    bgDark: "dark:bg-orange-900/50",
    text: "text-orange-800",
    textDark: "dark:text-orange-200",
    hover: "hover:bg-orange-200",
    hoverDark: "dark:hover:bg-orange-800",
  },
  css: {
    bg: "bg-blue-100",
    bgDark: "dark:bg-blue-900/50",
    text: "text-blue-800",
    textDark: "dark:text-blue-200",
    hover: "hover:bg-blue-200",
    hoverDark: "dark:hover:bg-blue-800",
  },
  nodejs: {
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
  git: {
    bg: "bg-red-100",
    bgDark: "dark:bg-red-900/50",
    text: "text-red-800",
    textDark: "dark:text-red-200",
    hover: "hover:bg-red-200",
    hoverDark: "dark:hover:bg-red-800",
  },
  cpp: {
    bg: "bg-blue-100",
    bgDark: "dark:bg-blue-900/50",
    text: "text-blue-800",
    textDark: "dark:text-blue-200",
    hover: "hover:bg-blue-200",
    hoverDark: "dark:hover:bg-blue-800",
  },
  bash: {
    bg: "bg-gray-100",
    bgDark: "dark:bg-gray-800/50",
    text: "text-gray-800",
    textDark: "dark:text-gray-200",
    hover: "hover:bg-gray-200",
    hoverDark: "dark:hover:bg-gray-700",
  },
  python: {
    bg: "bg-yellow-100",
    bgDark: "dark:bg-yellow-900/50",
    text: "text-yellow-800",
    textDark: "dark:text-yellow-200",
    hover: "hover:bg-yellow-200",
    hoverDark: "dark:hover:bg-yellow-800",
  },
  postgresql: {
    bg: "bg-blue-100",
    bgDark: "dark:bg-blue-900/50",
    text: "text-blue-800",
    textDark: "dark:text-blue-200",
    hover: "hover:bg-blue-200",
    hoverDark: "dark:hover:bg-blue-800",
  },
  docker: {
    bg: "bg-blue-100",
    bgDark: "dark:bg-blue-900/50",
    text: "text-blue-800",
    textDark: "dark:text-blue-200",
    hover: "hover:bg-blue-200",
    hoverDark: "dark:hover:bg-blue-800",
  },
  latex: {
    bg: "bg-green-100",
    bgDark: "dark:bg-green-900/50",
    text: "text-green-800",
    textDark: "dark:text-green-200",
    hover: "hover:bg-green-200",
    hoverDark: "dark:hover:bg-green-800",
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

export default function Experience() {
  const experiences = [
    {
      id: 0,
      role: "Teaching Assistant",
      company: "University of Alberta",
      period: "May 2025 - Aug 2025",
      location: "Edmonton, AB",
      description:
        "Built a lightweight ECS C++ game engine as an example for future student projects and designed course curriculum (lectures, labs, and assignments)",
      skills: ["C++", "Git", "Bash", "LaTeX"],
      skillColors: {
        "C++": "cpp",
        Git: "git",
        Bash: "bash",
        LaTeX: "latex",
      },
    },
    {
      id: 1,
      role: "Backend Developer",
      company: "Alberta Envirothon",
      period: "Jan 2025 - Apr 2025",
      location: "Alberta, Canada",
      description:
        "Developed and optimized Django RESTful APIs, set up Simple JWT authentication, and resolved platform issues to ensure seamless integration with the frontend team.",
      skills: ["Django", "Python", "PostgreSQL", "Docker", "Git"],
      skillColors: {
        Django: "django",
        Python: "python",
        PostgreSQL: "postgresql",
        Docker: "docker",
        Git: "git",
      },
    },
  ]

  const getSkillStyles = (skill: string, experience: any) => {
    const skillKey = experience.skillColors[skill]?.toLowerCase() || "default"
    const styles = skillColorMap[skillKey] || skillColorMap.default

    return cn(styles.bg, styles.bgDark, styles.text, styles.textDark, styles.hover, styles.hoverDark)
  }

  return (
    <section id="experience" className="py-20 px-4 bg-background relative">
      {/* Background decorations */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-royal-200 dark:bg-royal-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Work Experience
        </motion.h2>

        <motion.p
          className="text-center text-muted-foreground max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          My professional journey and the skills I've developed along the way.
        </motion.p>

        <div className="space-y-8 relative">
          {/* Timeline line */}
          <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-royal-500 to-blue-500 transform md:-translate-x-1/2"></div>

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative"
            >
              {/* Timeline dot - positioned on the timeline line */}
              <div className="absolute left-[15px] md:left-1/2 top-6 w-6 h-6 rounded-full bg-gradient-to-r from-royal-500 to-blue-500 shadow-lg z-10 flex items-center justify-center transform -translate-x-1/2">
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </div>

              {/* Card container with proper positioning */}
              <div
                className={`ml-10 md:ml-0 ${
                  index % 2 === 0 ? "md:mr-[50%] md:pr-8 md:text-right" : "md:ml-[50%] md:pl-8"
                }`}
              >
                <Card
                  className={`border-l-4 ${index % 2 === 0 ? "border-l-royal-500" : "border-l-blue-500"} hover:shadow-lg transition-shadow duration-300`}
                >
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                      <CardTitle className="text-xl font-bold">{exp.role}</CardTitle>
                      <Badge variant="outline" className="w-fit">
                        {exp.company}
                      </Badge>
                    </div>
                    <CardDescription className="flex flex-col md:flex-row gap-2 md:gap-6 mt-2">
                      <div className="flex items-center">
                        <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{exp.location}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 text-left">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill: string) => (
                        <Badge key={skill} className={getSkillStyles(skill, exp)}>
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section Divider - Simple gradient line */}
        <div className="mt-20 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-border to-transparent"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-background px-6 py-2 rounded-full border border-border">
              <motion.div
                initial={{ rotate: 0 }}
                whileInView={{ rotate: 360 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                viewport={{ once: true }}
                className="w-3 h-3 bg-gradient-to-br from-royal-500 to-royal-700 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Simple bottom border/divider */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
    </section>
  )
}
