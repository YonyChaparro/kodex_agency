import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const features = [
  {
    icon: 'rocket_launch',
    title: 'Velocidad Extrema',
    description:
      'Entregas rápidas sin comprometer la calidad. Usamos arquitecturas modernas que permiten iteraciones veloces.',
    color: '#21d9ed',
  },
  {
    icon: 'design_services',
    title: 'Diseño que Vende',
    description:
      'UI/UX centrado en la conversión. Cada píxel está pensado para guiar al usuario hacia la acción que deseas.',
    color: '#7c3aed',
  },
  {
    icon: 'security',
    title: 'Seguridad Enterprise',
    description:
      'Infraestructura robusta y escalable. Tus datos y los de tus clientes protegidos con los más altos estándares.',
    color: '#10b981',
  },
  {
    icon: 'trending_up',
    title: 'Orientados a Resultados',
    description:
      'Medimos el impacto real de cada decisión. SEO, rendimiento y conversión son parte del proceso desde el día uno.',
    color: '#f59e0b',
  },
  {
    icon: 'support_agent',
    title: 'Soporte Continuo',
    description:
      'No desaparecemos después del lanzamiento. Te acompañamos con mantenimiento, mejoras y soporte cuando lo necesites.',
    color: '#ef4444',
  },
  {
    icon: 'layers',
    title: 'Stack Moderno',
    description:
      'React, Node.js, AWS, Stripe y más. Tecnología de punta seleccionada para escalar junto a tu negocio.',
    color: '#21d9ed',
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: 'easeOut' }
  })
}

export default function WhyKodex() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section ref={containerRef} className="py-24 lg:py-32 bg-background-dark relative overflow-hidden" id="servicios">
      {/* Background glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary rounded-full blur-[160px] opacity-[0.04] pointer-events-none"
        style={{ y }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span
            className="inline-block text-xs font-bold tracking-widest text-primary uppercase mb-4 px-3 py-1 rounded-full border border-primary/20 bg-primary/10"
            variants={fadeInUp}
            custom={0}
          >
            Por qué elegirnos
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold text-white mb-4"
            variants={fadeInUp}
            custom={1}
          >
            No somos una agencia más.{' '}
            <span className="text-cyber-gradient">Somos tu equipo.</span>
          </motion.h2>
          <motion.p
            className="text-slate-400 text-lg max-w-2xl mx-auto"
            variants={fadeInUp}
            custom={2}
          >
            Combinamos estrategia, diseño y tecnología para construir productos digitales que
            generan impacto real en tu negocio.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="relative group rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-7 overflow-hidden"
              variants={fadeInUp}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
            >
              {/* Glow de fondo al hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(ellipse at top left, ${feature.color}12, transparent 70%)` }}
              />

              {/* Número decorativo */}
              <span
                className="absolute top-4 right-5 text-5xl font-black opacity-[0.06] select-none"
                style={{ color: feature.color }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Icono */}
              <motion.div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: `${feature.color}18`, border: `1px solid ${feature.color}30` }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <span className="material-icons text-2xl" style={{ color: feature.color }}>
                  {feature.icon}
                </span>
              </motion.div>

              <h3 className="text-white font-bold text-lg mb-2 group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>

              {/* Borde glow al hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: `inset 0 0 0 1px ${feature.color}30` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

