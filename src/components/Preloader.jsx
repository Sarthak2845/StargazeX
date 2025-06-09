import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"

const Preloader = ({ onFinish }) => {
  const words = ["Launch", "Orbit", "Explore"]
  const [index, setIndex] = useState(0)
  const [animateExit, setAnimateExit] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, 1000)

    const timeout = setTimeout(() => {
      clearInterval(interval)
      setAnimateExit(true)
      setTimeout(onFinish, 1000)
    }, 3000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [onFinish])

  return (
    <motion.div
      className="flex items-center justify-center h-screen w-full bg-gradient-to-br from-gray-900 to-black"
      initial={{ opacity: 0 }}
      animate={animateExit ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.5 }}
        exit={{ opacity: 0 }}
    >
      <motion.h1
        className="text-8xl font-extrabold bg-clip-text text-transparent"
        style={{
          background: "linear-gradient(to right, #40E0D0, #FF8C00, #FF0080)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
        key={index}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{ duration: 0.5 }}
      >
        {words[index]}
      </motion.h1>
    </motion.div>
  )
}

export default Preloader
