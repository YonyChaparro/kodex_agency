import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import logoIcon from '../assets/developer_mode_tv_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg'

const navLinksData = [
  { key: 'navbar.servicios', href: '/#servicios' },
  { key: 'navbar.proceso', href: '/#proceso' },
  { key: 'navbar.proyectos', href: '/#portfolio' },
  { key: 'navbar.precios', href: '/#precios' },
  { key: 'navbar.contacto', href: '/#contacto' },
  { key: 'navbar.blog', href: '/blog' },
]

const ICON_MAP = ['design_services', 'sync', 'star', 'payments', 'chat', 'article']

// Path SVG para el ícono hamburguesa animado
const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="2.5"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
)

// Botón hamburguesa con animación
const MenuToggle = ({ isOpen, toggle }) => (
  <motion.button
    className="w-11 h-11 flex items-center justify-center text-white rounded-lg border border-slate-700/60 bg-slate-900/60 backdrop-blur-sm"
    onClick={toggle}
    whileTap={{ scale: 0.9 }}
    aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
  >
    <svg width="20" height="20" viewBox="0 0 23 23">
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

// Drawer móvil — portaleado a document.body para escapar cualquier
// contexto de apilamiento creado por transforms de Framer Motion en el <nav>
const MobileDrawer = ({ onClose, t, i18n }) =>
  createPortal(
    <motion.div
      className="fixed inset-0 z-[500]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      {/* Fondo oscuro que cierra al tocar */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel lateral deslizante */}
      <motion.aside
        className="absolute top-0 right-0 h-full w-[280px] bg-[#080d12] border-l border-white/[0.07] flex flex-col shadow-[−8px_0_40px_rgba(0,0,0,0.6)]"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
      >
        {/* Glow superior derecho */}
        <div className="absolute top-0 right-0 w-52 h-52 rounded-full bg-primary blur-[120px] opacity-[0.08] pointer-events-none" />

        {/* Header del drawer */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.07]">
          <div className="flex items-center gap-2">
            <img src={logoIcon} alt="Kodex logo" className="w-7 h-7" />
            <span className="text-white font-bold text-[15px] tracking-tighter">
              KODEX<span className="text-primary">.AGENCY</span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white rounded-lg border border-slate-700/60 hover:border-slate-500 transition-colors"
            aria-label="Cerrar menú"
          >
            <span className="material-icons text-[18px]">close</span>
          </button>
        </div>

        {/* Links de navegación */}
        <nav className="flex flex-col px-4 py-4 flex-1 overflow-y-auto">
          {navLinksData.map((link, i) => (
            <motion.a
              key={link.key}
              href={link.href}
              onClick={onClose}
              className="flex items-center gap-3 text-slate-300 hover:text-white font-medium text-[15px] px-3 py-3.5 rounded-xl hover:bg-white/[0.05] transition-all duration-200 group"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.04 * i + 0.08 }}
              whileHover={{ x: 4 }}
            >
              <span className="w-8 h-8 rounded-lg border border-primary/25 bg-primary/[0.08] flex items-center justify-center shrink-0 group-hover:bg-primary/[0.15] group-hover:border-primary/40 transition-colors">
                <span className="material-icons text-primary text-[15px]">
                  {ICON_MAP[i]}
                </span>
              </span>
              {t(link.key)}
            </motion.a>
          ))}
        </nav>

        {/* Selector de idioma Mobile */}
        <div className="flex px-8 py-3 gap-4 border-t border-white/[0.07] justify-center items-center">
          <button
            onClick={() => { i18n.changeLanguage('es'); onClose(); }}
            className={`text-sm font-semibold transition-colors \${i18n.language.startsWith('es') ? 'text-primary' : 'text-slate-400'}`}
          >
            ES
          </button>
          <span className="text-slate-600">|</span>
          <button
            onClick={() => { i18n.changeLanguage('en'); onClose(); }}
            className={`text-sm font-semibold transition-colors \${i18n.language.startsWith('en') ? 'text-primary' : 'text-slate-400'}`}
          >
            EN
          </button>
        </div>

        {/* CTA WhatsApp */}
        <div className="px-6 pb-8 pt-4 border-t border-white/[0.07]">
          <motion.a
            href="https://wa.me/573227619848"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp w-full flex items-center justify-center gap-2"
            onClick={onClose}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white shrink-0" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {t('navbar.cotizar_desktop')}
          </motion.a>
        </div>
      </motion.aside>
    </motion.div>,
    document.body
  )

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

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
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
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
          <Link
            to="/"
            className="flex items-center gap-2 relative z-50 shrink-0"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2">
              <img src={logoIcon} alt="Kodex logo" className="w-8 h-8" />
              <span className="text-xl font-bold tracking-tighter text-white">
                KODEX<span className="text-primary">.AGENCY</span>
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-8 text-sm font-medium text-slate-400 min-w-0 flex-1 justify-center px-4">
            {navLinksData.map((link, i) => (
              <motion.a
                key={link.key}
                className="hover:text-primary transition-colors whitespace-nowrap"
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ y: -2 }}
              >
                {t(link.key)}
              </motion.a>
            ))}

            {/* Language Switcher Desktop */}
            <div className="flex items-center gap-2 border-l border-slate-700 pl-4 ml-2">
              <button
                onClick={() => i18n.changeLanguage('es')}
                className={`text-xs font-bold transition-colors hover:text-primary \${i18n.language.startsWith('es') ? 'text-primary' : 'text-slate-500'}`}
              >
                ES
              </button>
              <button
                onClick={() => i18n.changeLanguage('en')}
                className={`text-xs font-bold transition-colors hover:text-primary \${i18n.language.startsWith('en') ? 'text-primary' : 'text-slate-500'}`}
              >
                EN
              </button>
            </div>
          </div>

          {/* CTA Button Desktop */}
          <motion.a
            className="btn-whatsapp inline-flex items-center gap-2 text-xs sm:text-sm px-3 py-2 sm:px-5 sm:py-2.5 shrink-0"
            href="https://wa.me/573227619848"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span className="hidden sm:inline lg:hidden">{t('navbar.cotizar_mobile')}</span>
            <span className="hidden lg:inline">{t('navbar.cotizar_desktop')}</span>
          </motion.a>

          {/* Mobile Menu */}
          <motion.div
            className="md:hidden"
            animate={isOpen ? 'open' : 'closed'}
          >
            <MenuToggle isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
          </motion.div>
        </div>
      </div>

      {/* Drawer portaleado a document.body — escapa el contexto de apilamiento del nav */}
      <AnimatePresence>
        {isOpen && <MobileDrawer onClose={() => setIsOpen(false)} t={t} i18n={i18n} />}
      </AnimatePresence>
    </motion.nav>
  )
}
