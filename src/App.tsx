import { Navbar } from './components/layout/NavBar';
import { About } from './components/sections/About';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { GlobalBackground } from './components/ui/Background';
import ClickSpark from './components/ui/ClickSpark';

function App() {
  return (
    <ClickSpark
      sparkColor='#06b6d4'
      sparkCount={8}
      sparkRadius={20}
      sparkSize={10}
      duration={400}
    >
      <div className="antialiased text-slate-900 font-sans relative">
        <GlobalBackground />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
        </main>
      </div>
    </ClickSpark>
  )
}

export default App