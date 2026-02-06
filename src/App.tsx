import { Navbar } from './components/layout/NavBar';
import { About } from './components/sections/About';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';

function App() {
  return (
    <div className="antialiased bg-brand-bg text-brand-text-primary">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
      </main>
    </div>
  )
}

export default App