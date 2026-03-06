import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import cesgarImg from '../assets/screencapture-cesgar-co-2026-02-20-23_43_38.png'
import kinecImg from '../assets/screencapture-yonychaparro-github-io-PROPUESTA-KINEC-ENERGY-2026-02-20-23_48_06.png'
import banquetesImg from '../assets/screencapture-yonychaparro-github-io-landing-page-Banquetes-Acapulco-Eventos-2026-02-20-23_55_45.png'
import espiralImg from '../assets/screencapture-yonychaparro-github-io-Marketing-Digital-index-html-2026-02-21-00_04_41.png'

const projects = [
  {
    id: 1,
    title: 'CESGAR',
    category: 'E-commerce · Servicios 3D',
    description: 'Plataforma web con tienda online, cotizador instantáneo de impresión 3D y portafolio de proyectos para empresa especializada en Bogotá.',
    tags: ['WordPress', 'WooCommerce', 'Cotizador'],
    color: '#1e3a5f',
    url: 'https://cesgar.com.co/',
    thumbnail: cesgarImg,
    scrollPreview: true,
  },
  {
    id: 2,
    title: 'Kinec Energy',
    category: 'Landing Page · Movilidad Eléctrica',
    description: 'Sitio web para empresa de instalación de cargadores para vehículos eléctricos en Bogotá y La Sabana, con galería de proyectos y formulario de cotización.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    color: '#10b981',
    url: 'https://kineticenergysoluciones.com/',
    thumbnail: kinecImg,
    scrollPreview: true,
  },
  {
    id: 3,
    title: 'Banquetes Acapulco',
    category: 'Landing Page · Eventos & Banquetes',
    description: 'Landing page para restaurante y empresa de eventos con más de 40 años en Bogotá. Catálogo completo de servicios, galería de celebraciones, reseñas de Google y cotización directa por WhatsApp.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    color: '#eab308',
    url: 'https://yonychaparro.github.io/landing-page-Banquetes-Acapulco-Eventos/',
    thumbnail: banquetesImg,
    scrollPreview: true,
  },
  {
    id: 4,
    title: 'El Espiral',
    category: 'Landing Page · Cultura Urbana',
    description: 'Sitio web para colectivo de cultura freestyle en Bogotá. Agenda de eventos, galería de fotos, tienda de merchandising, patrocinadores y formulario de contacto.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    color: '#eab308',
    url: 'https://yonychaparro.github.io/Marketing-Digital/index.html',
    thumbnail: espiralImg,
    scrollPreview: true,
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: 'easeOut' }
  })
}

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)
  const imgRef = useRef(null)
  const inView = useInView(cardRef, { once: true, amount: 0.5 })
  const [scrollDist, setScrollDist] = useState(0)
  const [isTouch, setIsTouch] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    setIsTouch(window.matchMedia('(hover: none)').matches)
  }, [])

  useEffect(() => {
    const img = imgRef.current
    if (!img) return
    const measure = () => {
      requestAnimationFrame(() => {
        const containerH = img.parentElement?.offsetHeight || 320
        const dist = img.offsetHeight - containerH
        if (dist > 0) setScrollDist(-dist)
      })
    }
    if (img.complete) measure()
    else {
      img.addEventListener('load', measure)
      return () => img.removeEventListener('load', measure)
    }
  }, [])

  const shouldAnimate = isTouch ? inView : isHovered

  return (
    <motion.a
      ref={cardRef}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 backdrop-blur-sm"
      variants={fadeInUp}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Thumbnail / Placeholder visual */}
      <div
        className="relative h-72 md:h-80 w-full overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${project.color}18, ${project.color}08)` }}
      >
        {project.thumbnail ? (
          project.scrollPreview ? (
            <motion.img
              ref={imgRef}
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-auto object-top"
              animate={{ y: shouldAnimate ? scrollDist : 0 }}
              transition={{ duration: 4, ease: 'linear' }}
            />
          ) : (
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span
              className="material-icons text-7xl opacity-20 transition-all duration-500 group-hover:opacity-40 group-hover:scale-110"
              style={{ color: project.color }}
            >
              web
            </span>
          </div>
        )}

        {/* Overlay al hover */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `${project.color}22` }}
        >
          <span className="flex items-center gap-2 text-white font-bold text-sm bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
            <span className="material-icons text-base">open_in_new</span>
            Ver proyecto
          </span>
        </motion.div>
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="text-white font-bold text-lg mb-1 group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-slate-500 text-sm mb-4 leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Glow border al hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 1px ${project.color}44` }}
      />
    </motion.a>
  )
}

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary rounded-full blur-[120px] opacity-[0.04] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-xs font-bold tracking-widest text-primary uppercase mb-4 px-3 py-1 rounded-full border border-primary/20 bg-primary/10">
            Casos de Éxito
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Proyectos que <span className="text-cyber-gradient">hablan por sí solos</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Cada proyecto es una historia de transformación. Mira cómo hemos ayudado a empresas
            a crecer con tecnología de alto impacto.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <motion.a
            href="https://wa.me/573227619848"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp inline-flex items-center gap-3 text-sm px-6 py-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Quiero un proyecto así
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
