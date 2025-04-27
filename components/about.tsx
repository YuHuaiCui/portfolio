"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export default function About() {
  return (
    <section id="about" className="py-16 md:py-20 px-4 bg-background">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12">About Me</h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-center">
          <motion.div
            className="relative w-[400px] h-[400px] mx-auto group"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-royal-500 to-royal-700 rounded-xl opacity-75 group-hover:opacity-100 transition duration-300 blur"></div>
            <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg">
              <Image
                src="me.jpg"
                alt="Profile"
                fill
                className="object-cover object-center"
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-4">Who I Am</h3>
            <p className="text-muted-foreground mb-4 md:mb-6">
              I'm a passionate developer with a strong focus on creating beautiful, functional, and user-friendly
              applications. With several years of experience in software development, I enjoy turning complex problems into
              simple, elegant solutions.
            </p>
            <p className="text-muted-foreground mb-4 md:mb-6">
              My journey began when built my first video game at the age of 15. Since then, I have been constantly
              constantly learning and expanding my skillset to stay at the forefront of software development trends and
              best practices. 
            </p>
            <p className="text-muted-foreground">
              When I'm not coding, you can find me spending time exploring new recipes, experimenting with new technologies, or
              diving into a good book.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
