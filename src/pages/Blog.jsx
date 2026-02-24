import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { SEO } from '../components'

export default function Blog() {
    return (
        <div className="pt-32 pb-24 min-h-screen px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <SEO
                title="Blog"
                description="Explora las últimas novedades, guías y recursos sobre desarrollo web, performance y diseño de interfaces."
                type="article"
            />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Link to="/" className="inline-flex items-center text-primary hover:text-white transition-colors mb-8 text-sm font-medium">
                    <span className="material-icons text-sm mr-2">arrow_back</span>
                    Volver al Inicio
                </Link>

                <div>
                    <span className="inline-block text-xs font-bold tracking-widest text-primary uppercase mb-4 px-3 py-1 rounded-full border border-primary/20 bg-primary/10">
                        Novedades
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8">
                        Nuestro <span className="text-cyber-gradient">Blog</span>
                    </h1>
                    <p className="text-slate-400 text-lg mb-12 max-w-2xl">
                        Descubre las últimas tendencias en desarrollo de software, diseño web, y tecnología para escalar tu negocio.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Post Example 1 */}
                    <article className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden hover:border-primary/50 transition-colors group">
                        <div className="h-48 bg-slate-800/50 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-cyber-gradient opacity-20 group-hover:opacity-40 transition-opacity"></div>
                            <span className="material-icons text-5xl text-slate-100 z-10 group-hover:scale-110 transition-transform duration-300">article</span>
                        </div>
                        <div className="p-6">
                            <div className="text-primary text-sm font-bold mb-2">Desarrollo Web</div>
                            <h2 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                                El futuro de React y Server Components
                            </h2>
                            <p className="text-slate-400 text-sm mb-4">
                                Exploramos cómo los Server Components están cambiando la forma en que construimos aplicaciones, mejorando el rendimiento drásticamente.
                            </p>
                            <div className="flex items-center text-sm text-slate-500">
                                <span>24 Feb 2026</span>
                                <span className="mx-2">•</span>
                                <span>5 min lectura</span>
                            </div>
                        </div>
                    </article>

                    {/* Post Example 2 */}
                    <article className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden hover:border-primary/50 transition-colors group">
                        <div className="h-48 bg-slate-800/50 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b981,#3b82f6)] opacity-20 group-hover:opacity-40 transition-opacity"></div>
                            <span className="material-icons text-5xl text-slate-100 z-10 group-hover:scale-110 transition-transform duration-300">rocket_launch</span>
                        </div>
                        <div className="p-6">
                            <div className="text-primary text-sm font-bold mb-2">Performance</div>
                            <h2 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                                Web Vitals: Por qué a Google le importa tu velocidad
                            </h2>
                            <p className="text-slate-400 text-sm mb-4">
                                Aprende a medir y mejorar el LCP, FID y CLS para rankear mejor tus landing pages en los motores de búsqueda de Google.
                            </p>
                            <div className="flex items-center text-sm text-slate-500">
                                <span>20 Feb 2026</span>
                                <span className="mx-2">•</span>
                                <span>8 min lectura</span>
                            </div>
                        </div>
                    </article>

                </div>
            </motion.div>
        </div>
    )
}
