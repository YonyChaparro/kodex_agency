import { Navbar, Hero, WhyKodex, Pricing, GlobalOps, Footer, SmoothCursor } from './components'

function App() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased overflow-x-hidden cursor-none">
      <SmoothCursor />
      <Navbar />
      <main>
        <Hero />
        <WhyKodex />
        <Pricing />
        <GlobalOps />
      </main>
      <Footer />
    </div>
  )
}

export default App
