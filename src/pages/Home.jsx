import { lazy, Suspense } from 'react'
import { Hero, SEO, Loader } from '../components'

const WhyKodex = lazy(() => import('../components/WhyKodex'))
const Process = lazy(() => import('../components/Process'))
const Pricing = lazy(() => import('../components/Pricing'))
const Portfolio = lazy(() => import('../components/Portfolio'))
const Contact = lazy(() => import('../components/Contact'))

export default function Home() {
    return (
        <>
            <SEO
                title="Software de Alto Impacto"
                description="Agencia de desarrollo web y mobile de alto impacto. Construimos productos digitales que generan impacto real en tu negocio."
            />
            <Hero />
            <Suspense fallback={<Loader />}>
                <WhyKodex />
                <Process />
                <Pricing />
                <Portfolio />
                <Contact />
            </Suspense>
        </>
    )
}
