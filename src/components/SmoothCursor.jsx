import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0)

export default function SmoothCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isPointer, setIsPointer] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  // No renderizar en dispositivos táctiles
  if (isTouchDevice()) return null

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY })

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
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        x: pos.x,
        y: pos.y,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      <motion.div 
        className="rounded-full bg-primary"
        animate={{
          opacity: isVisible ? 1 : 0,
          width: isPointer ? 32 : 16,
          height: isPointer ? 32 : 16,
        }}
        transition={{ 
          type: 'spring',
          stiffness: 400,
          damping: 22
        }}
      />
    </motion.div>
  )
}
