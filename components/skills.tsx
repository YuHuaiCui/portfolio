"use client"

import { motion } from "framer-motion"
import { Code, Database, Library, Terminal, TestTube } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Skills() {
  // Define skill groups with their categories and colors
  const skillGroups = [
    {
      id: "programming",
      title: "Programming Languages",
      icon: <Code className="h-5 w-5 md:h-6 md:w-6" />,
      skills: ["JavaScript", "TypeScript", "Python", "C++", "C", "Java", "SQL"],
      color: "from-blue-500 to-blue-700",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
      textColor: "text-blue-800 dark:text-blue-200",
      borderColor: "border-blue-300 dark:border-blue-700",
      hoverBg: "hover:bg-blue-200 dark:hover:bg-blue-800/30",
      glowColor: "shadow-blue-500/20 dark:shadow-blue-500/10",
    },
    {
      id: "frameworks",
      title: "Frameworks & Libraries",
      icon: <Library className="h-5 w-5 md:h-6 md:w-6" />,
      skills: ["React", "Next.js", "Tailwind", "Material-UI", "Bootstrap", "Django"],
      color: "from-purple-500 to-purple-700",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
      textColor: "text-purple-800 dark:text-purple-200",
      borderColor: "border-purple-300 dark:border-purple-700",
      hoverBg: "hover:bg-purple-200 dark:hover:bg-purple-800/30",
      glowColor: "shadow-purple-500/20 dark:shadow-purple-500/10",
    },
    {
      id: "testing",
      title: "Testing & QA",
      icon: <TestTube className="h-5 w-5 md:h-6 md:w-6" />,
      skills: ["JUnit", "Android Espresso", "Postman"],
      color: "from-green-500 to-green-700",
      bgColor: "bg-green-100 dark:bg-green-900/20",
      textColor: "text-green-800 dark:text-green-200",
      borderColor: "border-green-300 dark:border-green-700",
      hoverBg: "hover:bg-green-200 dark:hover:bg-green-800/30",
      glowColor: "shadow-green-500/20 dark:shadow-green-500/10",
    },
    {
      id: "databases",
      title: "Databases",
      icon: <Database className="h-5 w-5 md:h-6 md:w-6" />,
      skills: ["Firebase", "PostgreSQL", "MongoDB", "SQLite"],
      color: "from-amber-500 to-amber-700",
      bgColor: "bg-amber-100 dark:bg-amber-900/20",
      textColor: "text-amber-800 dark:text-amber-200",
      borderColor: "border-amber-300 dark:border-amber-700",
      hoverBg: "hover:bg-amber-200 dark:hover:bg-amber-800/30",
      glowColor: "shadow-amber-500/20 dark:shadow-amber-500/10",
    },
    {
      id: "devops",
      title: "DevOps & Tools",
      icon: <Terminal className="h-5 w-5 md:h-6 md:w-6" />,
      skills: ["Git", "GitHub", "Docker"],
      color: "from-red-500 to-red-700",
      bgColor: "bg-red-100 dark:bg-red-900/20",
      textColor: "text-red-800 dark:text-red-200",
      borderColor: "border-red-300 dark:border-red-700",
      hoverBg: "hover:bg-red-200 dark:hover:bg-red-800/30",
      glowColor: "shadow-red-500/20 dark:shadow-red-500/10",
    },
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="skills" className="py-16 md:py-20 px-4 bg-muted/30 relative">
      {/* Background decorations */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-royal-200 dark:bg-royal-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">Skills & Tech Stack</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Here are the technologies and tools I specialize in and use to bring ideas to life.
          </p>
        </motion.div>

        <motion.div
          className="space-y-10 md:space-y-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skillGroups.map((group) => (
            <motion.div key={group.id} variants={itemVariants} className="relative">
              {/* Category Header */}
              <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                <div className={`p-2 md:p-3 rounded-xl bg-gradient-to-br ${group.color} text-white shadow-lg`}>
                  {group.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-bold">{group.title}</h3>
                <div className="flex-grow h-[2px] bg-gradient-to-r from-transparent via-muted-foreground/30 to-transparent"></div>
              </div>

              {/* Skills Grid */}
              <div className="flex flex-wrap gap-3 md:gap-4">
                {group.skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className={cn(
                      "px-3 md:px-5 py-2 md:py-3 rounded-lg border shadow-sm",
                      group.bgColor,
                      group.borderColor,
                      "cursor-default relative overflow-hidden group",
                      "transition-all duration-300 ease-in-out",
                      "hover:scale-105 hover:shadow-md",
                      group.glowColor,
                    )}
                  >
                    {/* Shine effect overlay */}
                    <span
                      className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent 
                      transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                    ></span>

                    {/* Skill text */}
                    <span className={cn("text-sm md:text-base font-medium relative z-10", group.textColor)}>
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Section Divider */}
        <div className="mt-16 md:mt-20 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-border to-transparent"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-muted/30 px-4 md:px-6 py-1 md:py-2 rounded-full border border-border">
              <motion.div
                initial={{ rotate: 0 }}
                whileInView={{ rotate: 360 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                viewport={{ once: true }}
                className="w-2 md:w-3 h-2 md:h-3 bg-gradient-to-br from-royal-500 to-royal-700 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
