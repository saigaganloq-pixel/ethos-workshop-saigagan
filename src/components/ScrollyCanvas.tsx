'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, useMotionValueEvent, MotionValue } from 'framer-motion';

import Overlay from './Overlay';

interface ScrollyCanvasProps {
  frameCount?: number;
  framePrefix?: string;
  frameExtension?: string;
}

export default function ScrollyCanvas({
  frameCount = 40,
  framePrefix = 'ezgif-frame-',
  frameExtension = 'png',
}: ScrollyCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, frameCount]);

  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const paddedIndex = i.toString().padStart(3, '0');
      img.src = `/sequence/${framePrefix}${paddedIndex}.${frameExtension}`;
      
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setImages(loadedImages);
          setImagesLoaded(true);
        }
      };
      loadedImages[i - 1] = img;
    }
  }, [frameCount, framePrefix, frameExtension]);

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !imagesLoaded || !images[index - 1]) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = images[index - 1];
    
    // Setup canvas sizing
    const { width, height } = canvas;
    const imgRatio = img.width / img.height;
    const canvasRatio = width / height;

    let drawWidth = width;
    let drawHeight = height;
    let offsetX = 0;
    let offsetY = 0;

    // object-fit: cover logic
    if (canvasRatio > imgRatio) {
      drawHeight = width / imgRatio;
      offsetY = (height - drawHeight) / 2;
    } else {
      drawWidth = height * imgRatio;
      offsetX = (width - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useMotionValueEvent(frameIndex, 'change', (latest) => {
    if (imagesLoaded) {
      drawFrame(Math.floor(latest));
    }
  });

  // Handle Resize Events
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(Math.floor(frameIndex.get()));
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // set initial size
    
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [imagesLoaded]); 

  return (
    <div ref={containerRef} className="relative w-full h-[500vh] bg-[#121212]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center text-white">
        {!imagesLoaded && (
          <div className="absolute z-50 animate-pulse text-sm tracking-widest text-[#fff8]">
            LOADING EXPERIENCE...
          </div>
        )}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-0 opacity-80"
        />
        <Overlay scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}
