import ScrollyCanvas from '@/components/ScrollyCanvas';
import Projects from '@/components/Projects';

export default function Home() {
  return (
    <main className="w-full bg-[#121212]">
      {/* 500vh scrolling section */}
      <ScrollyCanvas 
        frameCount={40} 
        framePrefix="ezgif-frame-" 
        frameExtension="png"
      />

      {/* Projects Grid below the scroll canvas */}
      <Projects />
    </main>
  );
}
