'use client';

import React from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
  // Mapping precisely from 0 to 1 (the bounds of the ScrollyCanvas container)
  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.3], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.3], [0, -100]);

  const opacity2 = useTransform(scrollYProgress, [0.2, 0.45, 0.7], [0, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.7], [50, -100]); 

  const opacity3 = useTransform(scrollYProgress, [0.6, 0.8, 1], [0, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.6, 1], [50, -100]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-10 flex flex-col justify-center">
      
      <motion.div 
        style={{ opacity: opacity1, y: y1 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
      >
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] mb-4">
          Ethos.
        </h1>
        <p className="text-xl md:text-3xl text-zinc-200 font-light tracking-wide drop-shadow-md">
          Creative Developer.
        </p>
      </motion.div>

      <motion.div 
        style={{ opacity: opacity2, y: y2 }}
        className="absolute inset-0 flex flex-col items-start justify-center text-left px-12 md:px-40"
      >
        <h2 className="text-5xl md:text-7xl font-semibold text-white max-w-2xl leading-tight tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
          I build digital <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 drop-shadow-none">experiences.</span>
        </h2>
      </motion.div>

      <motion.div 
        style={{ opacity: opacity3, y: y3 }}
        className="absolute inset-0 flex flex-col items-end justify-center text-right px-12 md:px-40"
      >
        <h2 className="text-5xl md:text-7xl font-semibold text-white max-w-2xl leading-tight tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
          Bridging design <br/> and <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 drop-shadow-none">engineering.</span>
        </h2>
      </motion.div>
      
    </div>
  );
}
