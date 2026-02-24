import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

const steps = [
  {
    number: '01',
    icon: 'integration_instructions',
    title: 'Desarrollo de Aplicaciones Web Personalizadas',
    description:
      'Integramos sistemas y procesos comerciales dispares, agregamos funcionalidad de servicio web a tus aplicaciones existentes y sincronizamos datos entre esas aplicaciones.',
    color: '#21d9ed',
  },
  {
    number: '02',
    icon: 'lightbulb',
    title: 'Definiendo tu Aplicación Web',
    description:
      'Ya sea que necesites una solución desarrollada desde cero o una integración de terceros para tu aplicación existente, la ejecutamos de manera rápida, efectiva y asequible.',
    color: '#7c3aed',
  },
  {
    number: '03',
    icon: 'account_tree',
    title: 'Estructura de la Aplicación Web',
    description:
      'Creamos una arquitectura de base de datos para recopilar, almacenar, recuperar, ordenar y graficar efectivamente todos tus datos en tu nuevo sitio o aplicación personalizado.',
    color: '#f59e0b',
  },
  {
    number: '04',
    icon: 'manage_search',
    title: 'Investigación y Experiencia de Usuario',
    description:
      'Nos sumergimos en investigación y análisis para descubrir las estrategias más efectivas para mejorar la experiencia del usuario en todos los ámbitos de tu producto.',
    color: '#10b981',
  },
  {
    number: '05',
    icon: 'widgets',
    title: 'Selección de Software de Terceros',
    description:
      'Investigamos y probamos las mejores tecnologías de vanguardia, lenguajes de programación y proveedores externos para integrarlos en tu sitio web o aplicación personalizado.',
    color: '#ef4444',
  },
  {
    number: '06',
    icon: 'science',
    title: 'Pruebas de Diseño y Creación de Prototipos',
    description:
      'Detallamos cada especificación funcional y técnica para garantizar una usabilidad, navegación y funcionalidad optimizadas dentro de tu sitio web o aplicación personalizado.',
    color: '#8b5cf6',
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' },
  },
}

const slideVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 80 : -80 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -80 : 80, transition: { duration: 0.3, ease: 'easeIn' } }),
}

export default function Process() {
  const containerRef = useRef(null)
  const [active, setActive] = useState(0)
  const [dir, setDir] = useState(1)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3])
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50])

  const goTo = useCallback((index) => {
    setDir(index > active ? 1 : -1)
    setActive(index)
  }, [active])

  const next = useCallback(() => {
    setDir(1)
    setActive((prev) => (prev < steps.length - 1 ? prev + 1 : 0))
  }, [])

  const prev = () => {
    setDir(-1)
    setActive((prev) => (prev > 0 ? prev - 1 : steps.length - 1))
  }

  // Auto-play cada 3.5 segundos, se pausa al hover
  useEffect(() => {
    if (paused) return
    intervalRef.current = setInterval(() => {
      next()
    }, 3500)
    return () => clearInterval(intervalRef.current)
  }, [paused, next])

  const step = steps[active]

  return (
    <section
      ref={containerRef}
      id="proceso"
      className="py-24 lg:py-32 bg-background-dark border-t border-slate-800 relative overflow-hidden"
    >
      {/* Glow de fondo */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary rounded-full blur-[140px] opacity-[0.03] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-600 rounded-full blur-[140px] opacity-[0.04] pointer-events-none" />

      <motion.div
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ scale, opacity, y }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-xs font-bold tracking-widest text-primary uppercase mb-4 px-3 py-1 rounded-full border border-primary/20 bg-primary/10">
            Metodología
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Nuestro Proceso para{' '}
            <span className="text-cyber-gradient">Desarrollo Web Personalizado</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Satisfacemos las demandas de tu negocio mediante la ejecución de procesos
            estratégicamente planificados para ofrecer sitios web y aplicaciones de primera línea.
          </p>
        </motion.div>

        {/* Indicadores de paso */}
        <div className="flex justify-center gap-2 mb-10">
          {steps.map((s, i) => (
            <button
              key={s.number}
              onClick={() => goTo(i)}
              className="flex flex-col items-center gap-1 group"
            >
              <motion.div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300"
                animate={{
                  borderColor: i === active ? step.color : '#334155',
                  background: i === active ? `${step.color}20` : 'transparent',
                  color: i === active ? step.color : '#64748b',
                }}
              >
                {s.number}
              </motion.div>
              <motion.div
                className="h-0.5 w-8 rounded-full"
                animate={{ background: i === active ? step.color : '#1e293b' }}
                transition={{ duration: 0.3 }}
              />
            </button>
          ))}
        </div>

        {/* Tarjeta carrusel */}
        <div
          className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm min-h-[280px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={active}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-8"
            >
              {/* Icono grande */}
              <div
                className="flex-shrink-0 w-20 h-20 rounded-2xl flex items-center justify-center"
                style={{ background: `${step.color}18`, border: `1px solid ${step.color}40` }}
              >
                <span className="material-icons text-4xl" style={{ color: step.color }}>
                  {step.icon}
                </span>
              </div>

              {/* Texto */}
              <div className="flex-1">
                <span
                  className="text-xs font-bold tracking-widest uppercase mb-2 block"
                  style={{ color: step.color }}
                >
                  PASO {step.number} DE {steps.length}
                </span>
                <h3 className="text-white font-extrabold text-xl md:text-2xl mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Barra de progreso del timer */}
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-800">
            <motion.div
              key={`timer-${active}-${paused}`}
              className="h-full rounded-full"
              style={{ background: step.color }}
              initial={{ width: '0%' }}
              animate={{ width: paused ? undefined : '100%' }}
              transition={{ duration: paused ? 0 : 3.5, ease: 'linear' }}
            />
          </div>
        </div>

        {/* Controles de navegación */}
        <div className="flex justify-center items-center gap-6 mt-8">
          <motion.button
            onClick={() => { setPaused(false); prev() }}
            className="w-11 h-11 rounded-full border border-slate-700 bg-slate-800/60 flex items-center justify-center text-slate-400 hover:border-primary hover:text-primary transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="material-icons text-lg">arrow_back</span>
          </motion.button>

          <span className="text-slate-500 text-sm font-medium tabular-nums">
            {active + 1} / {steps.length}
          </span>

          <motion.button
            onClick={() => { setPaused(false); next() }}
            className="w-11 h-11 rounded-full border border-slate-700 bg-slate-800/60 flex items-center justify-center text-slate-400 hover:border-primary hover:text-primary transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="material-icons text-lg">arrow_forward</span>
          </motion.button>
        </div>
      </motion.div>
    </section>
  )
}
