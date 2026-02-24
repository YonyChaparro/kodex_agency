import { Navbar, Hero, WhyKodex, Process, Pricing, Portfolio, Contact, Footer, SmoothCursor } from './components'

function App() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased overflow-x-hidden cursor-none">
      <SmoothCursor />
      <Navbar />
      <main>
        <Hero />
        <WhyKodex />
        <Process />
        <Pricing />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
