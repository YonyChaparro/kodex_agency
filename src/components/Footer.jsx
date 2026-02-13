import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const footerLinks = {
  empresa: [
    { label: 'Sobre Nosotros', href: '#' },
    { label: 'Carreras', href: '#' },
    { label: 'Blog', href: '#' },
  ],
  legal: [
    { label: 'Privacidad', href: '#' },
    { label: 'Términos', href: '#' },
  ],
  social: [
    { label: 'LinkedIn', href: '#' },
    { label: 'Twitter / X', href: '#' },
    { label: 'Instagram', href: '#' },
  ],
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

const linkItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 }
  }
}

export default function Footer() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  // Lighter intensity for footer since it's the last section
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.4, 1, 1])
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, 0])

  return (
    <footer ref={containerRef} className="bg-slate-950 pt-20 pb-10 border-t border-slate-800">
      <motion.div 
        className="max-w-4xl mx-auto px-4 text-center"
        style={{ scale, opacity, y }}
      >
        {/* CTA Section */}
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-white mb-6"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          ¿Listo para escalar?
        </motion.h2>
        <motion.p 
          className="text-xl text-slate-400 mb-10"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.1 }}
        >
          No pierdas más tiempo con soluciones mediocres. Construyamos el futuro de tu empresa
          hoy.
        </motion.p>
        <motion.a
          className="inline-flex items-center justify-center gap-3 px-8 py-5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full font-bold text-lg transition-all shadow-lg shadow-green-900/20 mb-16"
          href="https://wa.me/"
          target="_blank"
          rel="noopener noreferrer"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="material-icons">chat</span>
          Hablemos por WhatsApp
        </motion.a>

        {/* Footer Links */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-left border-t border-slate-800 pt-12 mb-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={fadeInUp}>
            <h4 className="text-white font-bold mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              {footerLinks.empresa.map((link, i) => (
                <motion.li 
                  key={link.label}
                  variants={linkItemVariants}
                  custom={i}
                >
                  <a className="hover:text-primary transition-colors" href={link.href}>
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              {footerLinks.legal.map((link, i) => (
                <motion.li 
                  key={link.label}
                  variants={linkItemVariants}
                  custom={i}
                >
                  <a className="hover:text-primary transition-colors" href={link.href}>
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <h4 className="text-white font-bold mb-4">Social</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              {footerLinks.social.map((link, i) => (
                <motion.li 
                  key={link.label}
                  variants={linkItemVariants}
                  custom={i}
                >
                  <a className="hover:text-primary transition-colors" href={link.href}>
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <motion.span 
              className="text-xl font-bold tracking-tighter text-white block mb-4"
              whileHover={{ scale: 1.05 }}
            >
              KODEX<span className="text-primary">.AGENCY</span>
            </motion.span>
            <p className="text-xs text-slate-600">
              San Francisco, CA
              <br />
              Mexico City, MX
            </p>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div 
          className="text-slate-600 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          © {new Date().getFullYear()} KODEX.AGENCY. Todos los derechos reservados.
        </motion.div>
      </motion.div>
    </footer>
  )
}
