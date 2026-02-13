import { useState, Suspense, lazy } from 'react';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/NavBar';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { Loader } from './components/ui/Loader';

const GlobalBackground = lazy(() => import('./components/ui/Background'));
const ClickSpark = lazy(() => import('./components/ui/ClickSpark'));
function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && (
        <Loader onLoadingComplete={() => setIsLoaded(true)} />
      )}
      <ClickSpark
        sparkColor='#06b6d4'
        sparkCount={8}
        sparkRadius={20}
        sparkSize={10}
        duration={400}>
        <div className="antialiased text-slate-900 font-sans relative">
          <Suspense fallback={<div className="fixed inset-0 bg-slate-950 -z-50" />}>
            <GlobalBackground />
          </Suspense>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </div>
      </ClickSpark>
    </>
  );
}

export default App