"use server"

// Function to verify reCAPTCHA token
async function verifyRecaptchaToken(token: string) {
  if (!token) return false

  // Replace with your actual reCAPTCHA secret key
  const secretKey = process.env.NEXT_RECAPTCHA_SECRET_KEY!

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
