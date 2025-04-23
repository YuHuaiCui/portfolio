import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-muted py-12 px-4 relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-royal-500 to-transparent"></div>
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold">Daniel Cui</h3>
            <p className="text-muted-foreground mt-2">Building amazing digital experiences</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex space-x-4">
              <Link href="https://github.com/YuHuaiCui" className="hover:text-royal-500 transition-colors">
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="https://www.linkedin.com/in/yuhuaicui/" className="hover:text-royal-500 transition-colors">
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="mailto:hello@dcui.dev" className="hover:text-royal-500 transition-colors">
                <Mail className="h-6 w-6" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Daniel Cui. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
