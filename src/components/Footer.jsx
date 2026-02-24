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
          className="btn-whatsapp mb-16 text-lg px-8 py-5 gap-4"
          href="https://wa.me/573228237649"
          target="_blank"
          rel="noopener noreferrer"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
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
              Bogotá D.C., Colombia
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
          © {new Date().getFullYear()} KODEX.AGENCY. Algunos derechos reservados.{' '}
          <span className="block mt-1 text-xs text-slate-700">
            WhatsApp y su logotipo son marcas registradas de WhatsApp LLC.
          </span>
        </motion.div>
      </motion.div>
    </footer>
  )
}
