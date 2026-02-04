import { Navbar } from './components/layout/NavBar';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';

function App() {
  return (
    <div className="antialiased bg-slate-50 text-slate-900">
      <Navbar />
      <main>
        <Hero />
        <Projects />
      </main>
    </div>
  )
}

export default App