import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' }
  })
}

const inputClass =
  'w-full bg-slate-900/60 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 transition-all duration-200 backdrop-blur-sm'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: '49b03c62-4639-4dd9-872e-66eeaa1058d2',
          to: 'contact@kodex.agency',
          from_name: form.name,
          from_email: form.email,
          subject: form.subject || 'Nuevo mensaje desde kodex.agency',
          message: form.message,
        }),
      })

      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contacto" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary rounded-full blur-[140px] opacity-[0.05] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — texto */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.span
              className="inline-block text-xs font-bold tracking-widest text-primary uppercase mb-4 px-3 py-1 rounded-full border border-primary/20 bg-primary/10"
              variants={fadeInUp}
              custom={0}
            >
              Contacto
            </motion.span>
            <motion.h2
              className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight"
              variants={fadeInUp}
              custom={1}
            >
              Cuéntanos tu{' '}
              <span className="text-cyber-gradient">proyecto</span>
            </motion.h2>
            <motion.p
              className="text-slate-400 text-lg mb-10 leading-relaxed"
              variants={fadeInUp}
              custom={2}
            >
              Responderemos en menos de 24 horas. Si prefieres una respuesta inmediata,
              escríbenos directo por WhatsApp.
            </motion.p>

            {/* Info cards */}
            <motion.div className="space-y-4" variants={fadeInUp} custom={3}>
              {[
                {
                  icon: 'email',
                  label: 'Email',
                  value: 'contact@kodex.agency',
                  href: 'mailto:contact@kodex.agency',
                },
              ].map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-slate-800 bg-slate-900/40 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 group"
                  whileHover={{ x: 4 }}
                >
                  <span className="material-icons text-primary text-2xl">{item.icon}</span>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{item.label}</p>
                    <p className="text-white font-medium group-hover:text-primary transition-colors duration-200">{item.value}</p>
                  </div>
                </motion.a>
              ))}

              <motion.a
                href="https://wa.me/573227619848"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp inline-flex items-center gap-3 w-full justify-center py-4 text-base"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Hablemos por WhatsApp
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right — formulario */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Tu nombre"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="tu@empresa.com"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Asunto
                </label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="" disabled>Selecciona un tema</option>
                  <option value="Quiero una landing page">Quiero una landing page</option>
                  <option value="Quiero un e-commerce">Quiero un e-commerce</option>
                  <option value="Quiero una app web">Quiero una app web</option>
                  <option value="Quiero rediseñar mi sitio">Quiero rediseñar mi sitio</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Mensaje
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Cuéntanos de tu proyecto, presupuesto aproximado y cualquier detalle relevante..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={status === 'sending'}
                className="btn-gradient w-full flex items-center justify-center gap-2 py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
                whileHover={status !== 'sending' ? { scale: 1.02 } : {}}
                whileTap={status !== 'sending' ? { scale: 0.98 } : {}}
              >
                {status === 'sending' ? (
                  <>
                    <motion.span
                      className="material-icons text-base"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    >
                      refresh
                    </motion.span>
                    Enviando...
                  </>
                ) : (
                  <>
                    <span className="material-icons text-base">send</span>
                    Enviar mensaje
                  </>
                )}
              </motion.button>

              {/* Feedback */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <span className="material-icons text-lg">check_circle</span>
                    ¡Mensaje enviado! Te responderemos pronto.
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <span className="material-icons text-lg">error_outline</span>
                    Algo salió mal. Intenta de nuevo o escríbenos por WhatsApp.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
