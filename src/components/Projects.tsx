'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';

const projects = [
  {
    title: 'Neon Odyssey',
    category: 'WebGL Experience',
    desc: 'An interactive 3D portfolio pushing the limits of browser performance.',
    img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
  },
  {
    title: 'Aura Dashboard',
    category: 'Product Design',
    desc: 'A premium, glassmorphic analytics dashboard for fintech creators.',
    img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop',
  },
  {
    title: 'Quantum Commerce',
    category: 'E-commerce',
    desc: 'High-conversion headless storefront built with Next.js and Shopify.',
    img: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=2600&auto=format&fit=crop',
  },
  {
    title: 'Lumina Studio',
    category: 'Creative Agency',
    desc: 'Awwwards-winning site featuring dynamic typography and scroll interactions.',
    img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2600&auto=format&fit=crop',
  },
];

export default function Projects() {
  return (
    <section className="relative z-20 w-full min-h-screen bg-[#101010] py-32 px-6 md:px-20 text-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-light mb-4">Selected Work</h2>
          <div className="w-full h-px bg-white/20 mt-8" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((proj, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.1 }}
              className="group relative cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                <div className="absolute inset-0 bg-[#121212] z-0" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={proj.img} 
                  alt={proj.title} 
                  className="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Overlay Hover */}
                <div className="absolute inset-0 z-20 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm">
                  <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <ExternalLink className="text-white w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Text Area */}
              <div>
                <p className="text-sm font-mono text-emerald-400 mb-2 uppercase tracking-wider">{proj.category}</p>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold mb-2">{proj.title}</h3>
                  <ArrowRight className="w-5 h-5 text-white/50 group-hover:text-white group-hover:-rotate-45 transition-all duration-300" />
                </div>
                <p className="text-zinc-400 font-light">{proj.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
