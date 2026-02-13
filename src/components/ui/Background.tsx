import Particles from './Particles';

const GlobalBackground = () => {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-slate-50">
      <Particles
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleColors={["#6d74d9", "#6d74d9", "#a53bde"]}
        moveParticlesOnHover
        particleHoverFactor={0.6}
        alphaParticles={false}
        particleBaseSize={80}
        sizeRandomness={0.6}
        cameraDistance={24}
        disableRotation={false}
      />
    </div>
  );
};
export default GlobalBackground;
