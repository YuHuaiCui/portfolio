"use server"

import { z } from "zod"

// Define the schema for contact form data
const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
  recaptchaToken: z.string().optional(),
})

// Function to verify reCAPTCHA token
async function verifyRecaptchaToken(token: string) {
  if (!token) return false

  // Replace with your actual reCAPTCHA secret key
  const secretKey = process.env.RECAPTCHA_SECRET_KEY!

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${secretKey}&response=${token}`,
    })

    const data = await response.json()

    // You can add additional checks based on score if needed
    return data.success && data.score >= 0.5
  } catch (error) {
    console.error("reCAPTCHA verification failed:", error)
    return false
  }
}

export async function sendContactForm(formData: FormData) {
  // Simulate a delay to mimic server processing
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Get form data
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const subject = formData.get("subject") as string
  const message = formData.get("message") as string
  const recaptchaToken = (formData.get("recaptchaToken") as string) || ""

  try {
    // Validate form data
    contactFormSchema.parse({
      name,
      email,
      subject,
      message,
      recaptchaToken,
    })

    // Verify reCAPTCHA token
    const isValidToken = await verifyRecaptchaToken(recaptchaToken)

    if (!isValidToken) {
      return {
        success: false,
        message: "reCAPTCHA verification failed. Please try again.",
      }
    }

    // In a real application, you would send this data to your email service
    // For example, using Nodemailer, SendGrid, or another email service
    console.log("Contact form submission:", { name, email, subject, message })

    // Return success
    return {
      success: true,
      message: "Thank you for your message! I'll get back to you soon.",
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.errors[0].message || "Invalid form data",
      }
    }

    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    }
  }
}

export async function verifyResumeDownload(token: string) {
  // Verify reCAPTCHA token
  const isValidToken = await verifyRecaptchaToken(token)

  if (!isValidToken) {
    return {
      success: false,
      message: "Verification failed. Please try again.",
    }
  }

  return {
    success: true,
    downloadUrl: "/resume.pdf",
  }
}
