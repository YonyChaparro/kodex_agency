import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const techStack = [
  { name: 'React', icon: 'code', color: '#61DAFB' },
  { name: 'AWS', icon: 'cloud', color: '#FF9900' },
  { name: 'Node', icon: 'dns', color: '#339933' },
  { name: 'Stripe', icon: 'payments', color: '#635BFF' },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' }
  })
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 }
  }
}

export default function Hero() {
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Transform values based on scroll
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.5])
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [0.1, 0.3])

  return (
    <section 
      ref={containerRef}
      className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-screen"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-background-dark z-[-2]"></div>
      <div className="absolute inset-0 bg-grid-pattern z-[-1]"></div>
      <motion.div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary rounded-full blur-[100px] z-[-1]"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        style={{ 
          scale: backgroundScale,
          opacity: backgroundOpacity
        }}
      />

      {/* Scroll Zoom Container */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
        style={{ scale, opacity, y }}
      >
        {/* Badge */}
        <motion.div 
          className="inline-flex items-center px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-semibold tracking-wide mb-8"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <span className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse"></span>
          ACEPTANDO NUEVOS PROYECTOS 2026
        </motion.div>

        {/* Main Heading */}
        <motion.h1 
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight glow-text"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          Transformamos Negocios con <br className="hidden md:block" />
          <span className="text-cyber-gradient">Software de Alto Impacto</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-slate-400 font-light mb-10"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          Desarrollo a medida, automatización y diseño estratégico para empresas que buscan
          velocidad y escalabilidad. De la idea al mercado en tiempo récord.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <motion.a 
            className="btn-primary" 
            href="#precios"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ver Planes
            <span className="material-icons ml-2 text-lg">arrow_forward</span>
          </motion.a>
          <motion.a 
            className="btn-secondary" 
            href="#portfolio"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ver Portafolio
          </motion.a>
        </motion.div>

        {/* Tech Stack Strip */}
        <motion.div 
          className="border-t border-slate-800 pt-10 mt-10"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={4}
        >
          <p className="text-sm text-slate-500 uppercase tracking-widest mb-6 font-semibold">
            Desarrollamos con tecnología de punta
          </p>
          <motion.div 
            className="flex flex-wrap justify-center gap-8 md:gap-16"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {techStack.map((tech, i) => (
              <motion.div 
                key={tech.name} 
                className="flex items-center gap-2 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                variants={fadeInUp}
                custom={i}
                whileHover={{ scale: 1.1, y: -5 }}
              >
                <span
                  className="material-icons text-4xl"
                  style={{ color: tech.color }}
                >
                  {tech.icon}
                </span>
                <span className="font-bold text-xl text-white">{tech.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        style={{ opacity }}
      >
        <span className="text-xs text-slate-500 uppercase tracking-widest">Scroll</span>
        <motion.div
          className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center p-2"
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <motion.div 
            className="w-1.5 h-1.5 bg-primary rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
