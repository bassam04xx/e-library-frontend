'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { BookOpen, Sparkles, Zap, ChevronDown } from 'lucide-react'
import { motion, useViewportScroll, useTransform } from 'framer-motion'

export default function HomePage() {
  const [currentBook, setCurrentBook] = useState(0)
  const { scrollYProgress } = useViewportScroll()
  const yRange = useTransform(scrollYProgress, [0, 1], [0, 100])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBook((prev) => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-blue-800 text-white overflow-hidden">
      <main className="container mx-auto px-4 py-16 relative">
        {/* Hero Section */}
        <motion.section 
          className="mb-32 h-screen flex flex-col justify-center items-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-6xl font-bold tracking-tighter sm:text-8xl md:text-9xl leading-none mb-4 animate-float">
            E-Library
            <span className="text-yellow-400">X</span>
          </h1>
          <p className="text-2xl sm:text-3xl md:text-4xl font-medium max-w-3xl animate-pulse">
            "We just booted up, but we're about to rewrite the whole damn library game!"
          </p>
          <div className="mt-8">
            <Button className="bg-yellow-400 text-blue-800 hover:bg-yellow-300 text-lg px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
              Dive into Books
            </Button>
          </div>
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown className="w-10 h-10" />
          </motion.div>
        </motion.section>

        {/* Feature Sections */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-32">
          <FeatureCard
            icon={<BookOpen className="w-12 h-12" />}
            title="Infinite Library"
            description="Access millions of books at your fingertips. Our collection grows every nanosecond."
          />
          <FeatureCard
            icon={<Sparkles className="w-12 h-12" />}
            title="AI-Powered Recommendations"
            description="Our quantum AI knows what you want to read before you do. Spooky? Nah, just smart."
          />
          <FeatureCard
            icon={<Zap className="w-12 h-12" />}
            title="Speed Reading Boost"
            description="Upgrade your brain. Read books in minutes with our neurotechnology integration."
          />
        </section>

        {/* 3D Book Showcase */}
        <section className="relative h-[600px] mb-32">
          <h2 className="text-4xl font-bold mb-8">Featured Dimensions</h2>
          <div className="absolute inset-0 perspective-1000">
            <motion.div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              animate={{ rotateY: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Book color="bg-red-500" isActive={currentBook === 0} />
              <Book color="bg-green-500" isActive={currentBook === 1} />
              <Book color="bg-purple-500" isActive={currentBook === 2} />
            </motion.div>
          </div>
        </section>

        {/* Testimonial */}
        <motion.section 
          className="mb-32"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <blockquote className="text-2xl italic font-serif border-l-4 border-yellow-400 pl-4">
            "I thought I was just going to read a book, but I ended up traveling through time and space. 10/10 would recommend this interdimensional library experience!"
            <footer className="text-lg mt-2">- Satisfied Time Traveler</footer>
          </blockquote>
        </motion.section>

        {/* Interactive Book Search */}
        <section className="mb-32">
          <h2 className="text-4xl font-bold mb-8">Explore Our Quantum Catalog</h2>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search for interdimensional knowledge..."
              className="w-full bg-blue-700 bg-opacity-50 text-white placeholder-blue-300 rounded-full py-3 px-6 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-400 text-blue-800 hover:bg-yellow-300">
              Search
            </Button>
          </div>
        </section>

        {/* CTA Section */}
        <motion.section 
          className="text-center"
          style={{ y: yRange }}
        >
          <h2 className="text-4xl font-bold mb-4">Ready to Transcend Reality?</h2>
          <p className="text-xl mb-8">Join our legion of enlightened readers today!</p>
          <Button className="bg-white text-blue-800 hover:bg-blue-100 text-lg px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:rotate-3">
            Initiate Neural Link
          </Button>
        </motion.section>

        {/* Background Decorations */}
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/2 left-1/2 w-32 h-32 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </main>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div 
      className="bg-blue-700 bg-opacity-50 p-6 rounded-lg backdrop-blur-sm hover:bg-opacity-70 transition-all duration-300 transform hover:scale-105"
      whileHover={{ scale: 1.05, rotateZ: 2 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p>{description}</p>
    </motion.div>
  )
}

function Book({ color, isActive }) {
  return (
    <motion.div 
      className={`w-40 h-56 ${color} rounded-r-lg shadow-xl absolute top-0 left-0`}
      initial={{ rotateY: 0, scale: 0.8, opacity: 0.5 }}
      animate={isActive ? { rotateY: 0, scale: 1, opacity: 1 } : { rotateY: 60, scale: 0.8, opacity: 0.5 }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-full w-8 absolute left-0 top-0 bg-white bg-opacity-20"></div>
    </motion.div>
  )
}

