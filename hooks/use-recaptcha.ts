"use client"

import { useState, useEffect, useCallback } from "react"

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => Promise<void>
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

export function useRecaptcha(action: string) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Replace this with your actual reCAPTCHA site key
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

  useEffect(() => {
    // Create a flag to track if the component is still mounted
    let isMounted = true

    const loadRecaptchaScript = () => {
      // Check if the script is already in the document
      const existingScript = document.querySelector(`script[src*="recaptcha"]`)
      if (existingScript) {
        // If script exists but grecaptcha is not defined yet, wait for it
        if (!window.grecaptcha) {
          const checkRecaptcha = setInterval(() => {
            if (window.grecaptcha) {
              clearInterval(checkRecaptcha)
              if (isMounted) setIsLoaded(true)
            }
          }, 100)
          return
        }

        // If script exists and grecaptcha is defined, we're good to go
        if (isMounted) setIsLoaded(true)
        return
      }

      // Create and load the reCAPTCHA script if it doesn't exist
      const script = document.createElement("script")
      script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
      script.async = true
      script.defer = true

      script.onload = () => {
        // Wait a moment for grecaptcha to initialize
        setTimeout(() => {
          if (isMounted && window.grecaptcha) {
            setIsLoaded(true)
          }
        }, 500)
      }

      script.onerror = () => {
        console.error("reCAPTCHA script failed to load")
      }

      document.head.appendChild(script)
    }

    loadRecaptchaScript()

    return () => {
      // Clean up
      isMounted = false
    }
  }, [siteKey])

  const executeRecaptcha = useCallback(async () => {
    if (!isLoaded || !window.grecaptcha) {
      console.warn("reCAPTCHA not loaded yet")
      return null
    }

    setIsLoading(true)

    try {
      // Make sure to properly await the ready function
      return await new Promise<string>((resolve, reject) => {
        window.grecaptcha.ready(async () => {
          try {
            const token = await window.grecaptcha.execute(siteKey, { action })
            resolve(token)
          } catch (error) {
            console.error("reCAPTCHA execution failed:", error)
            reject(error)
          } finally {
            setIsLoading(false)
          }
        })
      })
    } catch (error) {
      console.error("reCAPTCHA execution failed:", error)
      setIsLoading(false)
      return null
    }
  }, [isLoaded, action, siteKey])

  return { executeRecaptcha, isLoaded, isLoading }
}
