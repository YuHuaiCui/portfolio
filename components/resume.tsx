"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Download, Eye, FileText, Briefcase, GraduationCap, Award, Loader2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function Resume() {
  const [isDownloading, setIsDownloading] = useState(false)
  const { toast } = useToast()

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

  // Resume highlights data
  const resumeHighlights = [
    {
      icon: <Briefcase className="h-10 w-10 text-royal-500" />,
      title: "Work Experience",
      description: "1 year of professional experience in software development and design",
    },
    {
      icon: <GraduationCap className="h-10 w-10 text-royal-500" />,
      title: "Education",
      description: "Bachelor's in Computer Science with Specialization",
    },
    {
      icon: <Award className="h-10 w-10 text-royal-500" />,
      title: "Certifications",
      description: "WIP",
    },
  ]

  const handleDownload = async () => {
    setIsDownloading(true)

    try {
      const link = document.createElement("a");
      link.href = "/api/download" ;
      link.download = "DanielCui_Resume.pdf";
      link.click();
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <section id="resume" className="py-20 px-2 sm:px-4 bg-muted/30 relative">
      {/* Simple top border/divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

      {/* Background decorations */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-royal-200 dark:bg-royal-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Resume</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Download my resume to learn more about my experience, education, and skills.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-8 items-center">
          {/* Left side - Resume preview card */}
          <motion.div
            className="flex flex-col items-center w-full"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="w-full max-w-md mx-auto overflow-hidden border-2 border-royal-200 dark:border-royal-800 shadow-lg">
              <div className="relative aspect-[3/4] w-full bg-gradient-to-br from-royal-50 to-royal-100 dark:from-royal-900/30 dark:to-royal-950/50 p-6">
                <div className="absolute top-0 left-0 w-full h-8 bg-royal-500"></div>
                <div className="mt-4">
                  <div className="w-32 h-32 mx-auto rounded-full bg-royal-200 dark:bg-royal-800 mb-4 flex items-center justify-center">
                    <FileText className="h-16 w-16 text-royal-600 dark:text-royal-400" />
                  </div>
                  <div className="text-center mt-6">
                    <h3 className="text-xl font-bold">Daniel Cui</h3>
                    <p className="text-muted-foreground">Full Stack Developer</p>
                  </div>
                  <div className="mt-8 space-y-2 text-sm">
                    <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
                    <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
                    <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded w-4/5"></div>
                  </div>
                </div>
              </div>
              <CardContent className="p-6 bg-card">
                <div className="flex justify-center space-x-4">
                  <Button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="bg-gradient-to-r from-royal-500 to-royal-700 hover:from-royal-600 hover:to-royal-800 border-0
  transition-all duration-300 hover:scale-105 hover:shadow-md hover:shadow-royal-500/20 
  dark:hover:shadow-royal-700/20 relative overflow-hidden group"
                  >
                    <span
                      className="absolute inset-0 w-full h-full bg-gradient-to-r from-royal-400/0 via-white/10 to-royal-400/0 
      transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                    ></span>
                    {isDownloading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12 duration-200" />
                        <span className="relative z-10">Download PDF</span>
                      </>
                    )}
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="transition-all duration-300 hover:scale-105 hover:bg-background/80 hover:border-royal-300 
  dark:hover:border-royal-700 group"
                  >
                    <Link href="/DanielCui_Resume.pdf" target="_blank" rel="noopener noreferrer">
                      <Eye className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12 duration-200" />
                      <span>View Online</span>
                    </Link>
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground text-center mt-4">Protected by reCAPTCHA</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right side - Resume highlights */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold mb-6">Resume Highlights</h3>
            {resumeHighlights.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-start gap-4 p-4 rounded-lg bg-card hover:bg-muted/50 transition-colors duration-300"
              >
                <div className="shrink-0 p-2 bg-muted rounded-lg">{item.icon}</div>
                <div>
                  <h4 className="text-lg font-semibold">{item.title}</h4>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
            <motion.div variants={itemVariants} className="pt-4">
              <p className="text-muted-foreground">
                For a complete overview of my professional background, skills, and achievements, please download my
                resume or view it online.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Simple bottom border/divider */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
    </section>
  )
}
