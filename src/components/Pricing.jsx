import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const plans = [
  {
    name: 'Kodex Go',
    price: '$250',
    period: '/mes',
    description: 'Para emprendedores y MVPs.',
    features: [
      { text: 'Landing Page One-Page', included: true },
      { text: 'Integración básica de pagos', included: true },
      { text: 'Soporte por Email', included: true },
      { text: 'Dashboard de métricas', included: false },
    ],
    cta: 'Iniciar Kodex Go',
    featured: false,
  },
  {
    name: 'Kodex Pro',
    price: '$900',
    period: '/mes',
    description: 'Para PYMES en crecimiento.',
    features: [
      { text: 'Sitio Web Completo (5+ páginas)', included: true },
      { text: 'SEO Técnico Avanzado', included: true },
      { text: 'CMS Autoadministrable', included: true },
      { text: 'Soporte Prioritario 24/7', included: true },
    ],
    cta: 'Obtener Kodex Pro',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'A Medida',
    period: '',
    description: 'Para SaaS y Dashboards complejos.',
    features: [
      { text: 'Arquitectura Cloud Escalable', included: true },
      { text: 'Desarrollo de API Custom', included: true },
      { text: 'SLA Garantizado', included: true },
      { text: 'Auditoría de Seguridad', included: true },
    ],
    cta: 'Contactar Ventas',
    featured: false,
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

function PricingCard({ plan, index }) {
  if (plan.featured) {
    return (
      <motion.div 
        className="relative bg-slate-900/80 border border-primary rounded-2xl p-8 shadow-[0_0_40px_rgba(33,217,237,0.15)] lg:scale-105 z-10"
        variants={cardVariants}
        whileHover={{ y: -10, transition: { duration: 0.3 } }}
      >
        {/* Popular Badge */}
        <motion.div 
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyber-gradient px-4 py-1 rounded-full shadow-lg"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
        >
          <span className="text-xs font-bold text-white uppercase tracking-wider">Más Popular</span>
        </motion.div>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-primary uppercase tracking-widest">{plan.name}</h3>
          <div className="mt-4 flex items-baseline">
            <span className="text-5xl font-extrabold text-white">{plan.price}</span>
            <span className="ml-1 text-xl text-slate-500">{plan.period}</span>
          </div>
          <p className="mt-2 text-sm text-slate-400">{plan.description}</p>
        </div>

        <ul className="space-y-4 mb-8">
          {plan.features.map((feature, i) => (
            <motion.li 
              key={i} 
              className="flex items-start"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <span className="material-icons text-primary text-sm mt-1 mr-2">check_circle</span>
              <span className="text-white text-sm">{feature.text}</span>
            </motion.li>
          ))}
        </ul>

        <motion.a
          className="block w-full py-4 px-6 rounded-lg bg-cyber-gradient hover:opacity-90 transition-opacity text-center text-base font-bold text-white shadow-lg"
          href="#contact"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {plan.cta}
        </motion.a>
      </motion.div>
    )
  }

  return (
    <motion.div 
      className="glass-card rounded-2xl p-8 relative group"
      variants={cardVariants}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
    >
      <div className="mb-6">
        <h3 className="text-lg font-medium text-slate-300 uppercase tracking-widest">{plan.name}</h3>
        <div className="mt-4 flex items-baseline">
          <span className={`${plan.price === 'A Medida' ? 'text-3xl' : 'text-4xl'} font-extrabold text-white`}>
            {plan.price}
          </span>
          <span className="ml-1 text-xl text-slate-500">{plan.period}</span>
        </div>
        <p className="mt-2 text-sm text-slate-500">{plan.description}</p>
      </div>

      <ul className="space-y-4 mb-8">
        {plan.features.map((feature, i) => (
          <motion.li 
            key={i} 
            className="flex items-start"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            <span
              className={`material-icons text-sm mt-1 mr-2 ${
                feature.included ? 'text-primary' : 'text-slate-600'
              }`}
            >
              {feature.included ? 'check' : 'close'}
            </span>
            <span className={`text-sm ${feature.included ? 'text-slate-300' : 'text-slate-600'}`}>
              {feature.text}
            </span>
          </motion.li>
        ))}
      </ul>

      <motion.a
        className="block w-full py-3 px-4 rounded-lg border border-slate-700 hover:border-primary text-center text-sm font-semibold text-white hover:bg-primary/10 transition-colors"
        href="#contact"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {plan.cta}
      </motion.a>
    </motion.div>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 }
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

export default function Pricing() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3])
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -60])

  return (
    <section ref={containerRef} className="py-24 relative overflow-hidden bg-slate-950" id="precios">
      {/* Abstract glow behind highlighted card */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      />

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
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
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Elige tu <span className="text-cyber-gradient">Velocidad</span>
          </h2>
          <p className="text-slate-400">
            Planes transparentes diseñados para cada etapa de crecimiento.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {plans.map((plan, index) => (
            <PricingCard key={plan.name} plan={plan} index={index} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
