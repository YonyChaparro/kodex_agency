import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const navLinks = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Precios', href: '#precios' },
  { label: 'Contacto', href: '#contact' },
]

// Hook para obtener dimensiones
const useDimensions = (ref) => {
  const dimensions = useRef({ width: 0, height: 0 })

  useEffect(() => {
    if (ref.current) {
      dimensions.current.width = ref.current.offsetWidth
      dimensions.current.height = ref.current.offsetHeight
    }
  }, [ref])

  return dimensions.current
}

// Sidebar variants para el clip-path animado
const sidebarVariants = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at calc(100% - 40px) 40px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(0px at calc(100% - 40px) 40px)',
    transition: {
      delay: 0.3,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
}

// Navigation list variants
const navListVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
}

// Menu item variants
const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
}

// Path component for the hamburger icon
const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="2.5"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
)

// Animated hamburger toggle
const MenuToggle = ({ toggle }) => (
  <motion.button
    className="md:hidden relative z-50 w-12 h-12 flex items-center justify-center text-white"
    onClick={toggle}
    whileTap={{ scale: 0.9 }}
  >
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: 'M 2 2.5 L 20 2.5' },
          open: { d: 'M 3 16.5 L 17 2.5' },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: 'M 2 16.346 L 20 16.346' },
          open: { d: 'M 3 2.5 L 17 16.346' },
        }}
      />
    </svg>
  </motion.button>
)

// Navigation items for mobile
const MobileNavigation = ({ onClose }) => (
  <motion.ul
    className="absolute top-24 right-0 w-64 px-8 list-none"
    variants={navListVariants}
  >
    {navLinks.map((link, i) => (
      <motion.li
        key={link.label}
        className="mb-5 cursor-pointer"
        variants={itemVariants}
        whileHover={{ scale: 1.1, x: 10 }}
        whileTap={{ scale: 0.95 }}
      >
        <a
          href={link.href}
          className="flex items-center gap-4 text-slate-900 font-semibold text-lg"
          onClick={onClose}
        >
          <span className="w-10 h-10 rounded-full border-2 border-primary bg-primary/20 flex items-center justify-center">
            <span className="material-icons text-primary text-sm">
              {i === 0 ? 'design_services' : i === 1 ? 'sync' : i === 2 ? 'payments' : 'chat'}
            </span>
          </span>
          <span>{link.label}</span>
        </a>
      </motion.li>
    ))}
    
    {/* CTA Button */}
    <motion.li
      className="mt-8"
      variants={itemVariants}
    >
      <motion.a
        href="#contact"
        className="btn-gradient inline-flex"
        onClick={onClose}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Cotizar Proyecto
      </motion.a>
    </motion.li>
  </motion.ul>
)

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)
  const { height } = useDimensions(containerRef)

  // Cerrar menú al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) setIsOpen(false)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isOpen])

  // Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const navBarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  }

  return (
    <motion.nav 
      className="fixed top-0 left-0 w-full z-50 glass-nav"
      variants={navBarVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.a 
            href="#"
            className="flex items-center gap-2 relative z-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-primary material-icons text-3xl">terminal</span>
            <span className="text-xl font-bold tracking-tighter text-white">
              KODEX<span className="text-primary">.AGENCY</span>
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-400">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                className="hover:text-primary transition-colors"
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ y: -2 }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* CTA Button Desktop */}
          <motion.a
            className="btn-gradient hidden md:inline-flex"
            href="#contact"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Cotizar Proyecto
          </motion.a>

          {/* Mobile Menu Container */}
          <motion.div
            className="md:hidden"
            initial={false}
            animate={isOpen ? 'open' : 'closed'}
            custom={height}
            ref={containerRef}
          >
            {/* Animated Background */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-80 bg-gradient-to-br from-slate-100 to-slate-200"
              variants={sidebarVariants}
            />
            
            {/* Navigation Items */}
            {isOpen && <MobileNavigation onClose={() => setIsOpen(false)} />}
            
            {/* Hamburger Toggle */}
            <MenuToggle toggle={() => setIsOpen(!isOpen)} />
          </motion.div>
        </div>
      </div>
    </motion.nav>
  )
}
