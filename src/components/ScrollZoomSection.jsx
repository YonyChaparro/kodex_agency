import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ScrollZoomSection({ 
  children, 
  className = '',
  zoomOut = true,
  intensity = 'medium'
}) {
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Intensity presets
  const intensityMap = {
    light: { scale: [0.95, 1, 0.95], opacity: [0.5, 1, 0.5], y: [30, 0, -30] },
    medium: { scale: [0.9, 1, 0.9], opacity: [0.3, 1, 0.3], y: [50, 0, -50] },
    heavy: { scale: [0.85, 1, 0.85], opacity: [0, 1, 0], y: [80, 0, -80] }
  }

  const preset = intensityMap[intensity] || intensityMap.medium

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], preset.scale)
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [preset.opacity[0], 1, 1, preset.opacity[2]])
  const y = useTransform(scrollYProgress, [0, 0.5, 1], preset.y)

  return (
    <div ref={containerRef} className={className}>
      <motion.div
        style={zoomOut ? { scale, opacity, y } : { opacity }}
      >
        {children}
      </motion.div>
    </div>
  )
}
