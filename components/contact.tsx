"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { motion } from "framer-motion"

export default function Contact() {
  // You can keep local UI state for displaying messages after redirect,
  // or remove entirely if you prefer FormSubmit's built-in confirmation.

  return (
    <section id="contact" className="py-20 px-4 bg-muted/50 relative">
      {/* Top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* Decorative blobs */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-royal-200 dark:bg-royal-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />

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
              <CardDescription>
                Fill out the form below and I'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                action="https://formsubmit.co/de2cd52bbe952772d614be0c6d64c5b9"
                method="POST"
                className="space-y-6"
              >
                {/* FormSubmit configuration */}
                <input type="hidden" name="_subject" value="New message from your portfolio!" />
                <input type="hidden" name="_template" value="table" />
                {/* Remove _captcha=false to enable FormSubmit's built-in captcha */}
                <input
                  type="hidden"
                  name="_next"
                  value={typeof window !== "undefined" ? window.location.href : ""}
                />
                {/* Honeypot to trap bots */}
                <input type="text" name="_honey" style={{ display: "none" }} />

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
                  className="w-full bg-gradient-to-r from-royal-500 to-royal-700 hover:from-royal-600 hover:to-royal-800 border-0 transition-all duration-300 hover:scale-105 hover:shadow-md hover:shadow-royal-500/20 dark:hover:shadow-royal-700/20"
                >
                  Send Message
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-2">
                  This site is protected by FormSubmit's default captcha.
                </p>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  )
}
