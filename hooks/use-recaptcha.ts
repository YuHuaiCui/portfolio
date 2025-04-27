"use client"

import { useState, useEffect, useCallback } from "react"

// Define the window interface to include the recaptcha object
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

export function useRecaptcha(action: string) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Replace this with your actual reCAPTCHA site key
  const siteKey = process.env.RECAPTCHA_SITE_KEY!

  useEffect(() => {
    // Check if the reCAPTCHA script is already loaded
    if (window.grecaptcha) {
      setIsLoaded(true)
      return
    }

    // Create and load the reCAPTCHA script
    const script = document.createElement("script")
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
    script.async = true
    script.defer = true

    script.onload = () => {
      setIsLoaded(true)
    }

    document.head.appendChild(script)

    return () => {
      // Clean up the script when the component unmounts
      document.head.removeChild(script)
    }
  }, [siteKey])

  const executeRecaptcha = useCallback(async () => {
    if (!isLoaded) {
      console.warn("reCAPTCHA not loaded yet")
      return null
    }

    setIsLoading(true)

    try {
      const token = await window.grecaptcha.ready(() => window.grecaptcha.execute(siteKey, { action }))
      return token
    } catch (error) {
      console.error("reCAPTCHA execution failed:", error)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [isLoaded, action, siteKey])

  return { executeRecaptcha, isLoaded, isLoading }
}
