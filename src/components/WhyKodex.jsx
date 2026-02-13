import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const features = [
  {
    icon: 'rocket_launch',
    title: 'Velocidad Extrema',
    description:
      'Entregas rápidas sin comprometer la calidad. Usamos arquitecturas modernas que permiten iteraciones veloces.',
  },
  {
    icon: 'design_services',
    title: 'Diseño que Vende',
    description:
      'UI/UX centrado en la conversión. Cada píxel está pensado para guiar al usuario hacia la acción que deseas.',
  },
  {
    icon: 'security',
    title: 'Seguridad Enterprise',
    description:
      'Infraestructura robusta y escalable. Tus datos y los de tus clientes protegidos con los más altos estándares.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

export default function WhyKodex() {
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3])
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -60])

  return (
    <section ref={containerRef} className="py-24 bg-background-dark relative" id="servicios">
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ scale, opacity, y }}
      >
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Por qué <span className="text-primary">KODEX</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            No somos solo desarrolladores. Somos socios estratégicos enfocados en el crecimiento
            de tu negocio.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              className="glass-card p-8 rounded-2xl hover:bg-slate-800/50 transition-colors group"
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <motion.div 
                className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <span className="material-icons text-primary text-3xl">{feature.icon}</span>
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
