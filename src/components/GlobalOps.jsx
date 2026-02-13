import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

export default function GlobalOps() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3])
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -60])

  return (
    <section ref={containerRef} className="py-20 bg-background-dark border-t border-slate-800">
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12"
        style={{ scale, opacity, y }}
      >
        {/* Text Content */}
        <motion.div 
          className="w-full md:w-1/2"
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h3 
            className="text-2xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Operaciones Globales
          </motion.h3>
          <motion.p 
            className="text-slate-400 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Nuestro equipo distribuido trabaja en múltiples zonas horarias para asegurar que tu
            proyecto nunca se detenga. Con base central en el corazón tecnológico de la región.
          </motion.p>
          <motion.div 
            className="flex items-center gap-4 text-primary font-semibold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ x: 10 }}
          >
            <span className="material-icons">public</span>
            <span>Remoto First, Calidad World-Class</span>
          </motion.div>
        </motion.div>

        {/* Map Visual */}
        <motion.div 
          className="w-full md:w-1/2 h-64 md:h-80 rounded-2xl overflow-hidden relative shadow-2xl border border-slate-700"
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-slate-900/40 z-10"></div>
          {/* Abstract map representation using CSS gradient */}
          <div
            className="w-full h-full bg-cover bg-center grayscale opacity-60"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')",
            }}
          ></div>
          <motion.div 
            className="absolute bottom-4 left-4 z-20 bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg border border-slate-700"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, type: 'spring' }}
          >
            <span className="text-xs text-primary font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              SYSTEMS ONLINE
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
