"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { sendContactForm } from "@/app/actions"
import { motion } from "framer-motion"

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    success?: boolean
    message?: string
  } | null>(null)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setFormStatus(null)

    try {
      const result = await sendContactForm(formData)
      setFormStatus({
        success: true,
        message: "Thank you for your message! I'll get back to you soon.",
      })
    } catch (error) {
      setFormStatus({
        success: false,
        message: "There was an error sending your message. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 px-4 bg-muted/50 relative">
      {/* Simple top border/divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

      {/* Background decorations */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-royal-200 dark:bg-royal-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Get In Touch
        </motion.h2>

        <motion.p
          className="text-center text-muted-foreground max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Have a question or want to work together? Feel free to reach out!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="max-w-xl mx-auto">
            <CardHeader>
              <CardTitle>Contact Me</CardTitle>
              <CardDescription>Fill out the form below and I'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              {formStatus && (
                <Alert
                  className={`mb-6 ${formStatus.success ? "bg-green-50 dark:bg-green-900/20" : "bg-red-50 dark:bg-red-900/20"}`}
                >
                  {formStatus.success ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                  )}
                  <AlertTitle>{formStatus.success ? "Success!" : "Error!"}</AlertTitle>
                  <AlertDescription>{formStatus.message}</AlertDescription>
                </Alert>
              )}
              <form action={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" name="subject" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" rows={5} required />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-royal-500 to-royal-700 hover:from-royal-600 hover:to-royal-800 border-0
  transition-all duration-300 hover:scale-105 hover:shadow-md hover:shadow-royal-500/20 
  dark:hover:shadow-royal-700/20 relative overflow-hidden group"
                  disabled={isSubmitting}
                >
                  <span
                    className="absolute inset-0 w-full h-full bg-gradient-to-r from-royal-400/0 via-white/10 to-royal-400/0 
    transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                  ></span>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span className="relative z-10">Sending...</span>
                    </>
                  ) : (
                    <span className="relative z-10">Send Message</span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
