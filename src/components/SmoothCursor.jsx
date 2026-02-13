import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function SmoothCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isPointer, setIsPointer] = useState(false)

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 }
  
  const cursorX = useSpring(0, springConfig)
  const cursorY = useSpring(0, springConfig)

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      
      if (!isVisible) setIsVisible(true)

      const target = e.target
      const isClickable = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        window.getComputedStyle(target).cursor === 'pointer'
      
      setIsPointer(isClickable)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', handleMouseMove)
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)
    document.documentElement.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [cursorX, cursorY, isVisible])

  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null
  }

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      <motion.div 
        className="rounded-full bg-primary"
        animate={{
          opacity: isVisible ? 1 : 0,
          width: isPointer ? 40 : 20,
          height: isPointer ? 40 : 20,
        }}
        transition={{ 
          type: 'spring',
          stiffness: 300,
          damping: 20
        }}
      />
    </motion.div>
  )
}
