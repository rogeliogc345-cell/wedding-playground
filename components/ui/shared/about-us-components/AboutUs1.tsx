'use client';

import Image from 'next/image';
import { easeOut } from 'framer-motion';

import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease:easeOut }
};


const AboutUsComponent1 = () => {
  return (
    <section className="py-5 px-6  bg-[#f0f0e4]"
    // style={{backgroundImage:"url('/fondos/fondo_vestido_novia.png')"}}
    
    > {/* Soft Cream Background */}
      <div className="max-w-5xl mx-auto space-y-25">
        
        {/* Section Heading */}
        <motion.div {...fadeInUp} className="text-center space-y-4">
          <h2 className="text-[13px] uppercase tracking-[0.5em]">Nuestra Historia</h2>
          <h3 className="text-5xl md:text-6xl font-serif italic text-[#3B4953]">Nuestro camino juntos!</h3>
        </motion.div>

        {/* Story Block 1: The Beginning */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            {...fadeInUp}
            className="relative aspect-4/5 w-full overflow-hidden rounded-sm border-12 border-white shadow-sm"
          >
            <Image 
              src="/images/carousel-1.jpg" 
              alt="How we met" 
              fill 
              className="object-cover"
            />
          </motion.div>
          <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="space-y-6">
            <h4 className="font-heading text-3xl text-stone-800 italic">Donde todo empezó!</h4>
            <p className="text-stone-600 leading-relaxed font-light">
              It wasn’t a lightning bolt; it was a slow burn. A chance encounter at a local 
              bookstore over a shared interest in rare editions. What started as a 
              conversation about Hemingway turned into a five-hour dinner that neither 
              of us wanted to end.
            </p>
            <div className="w-12 h-px bg-stone-300" />
          </motion.div>
        </div>

        {/* Story Block 2: The Proposal (Reversed) */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            {...fadeInUp}
            className="md:order-2 relative aspect-4/5 w-full overflow-hidden rounded-sm border-12 border-white shadow-sm"
          >
            <Image 
              src="/images/gallery.jpg" 
              alt="The Proposal" 
              fill 
              className="object-cover"
            />
          </motion.div>
          <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="md:order-1 space-y-6 text-right flex flex-col items-end">
            <h4 className="font-serif text-3xl text-stone-800 italic">La Propuesta</h4>
            <p className="text-stone-600 leading-relaxed font-light">|
              Under a canopy of stars on the Amalfi Coast, he didn’t just ask for a hand 
              in marriage; he asked for a lifetime of adventure. The world went silent 
              for a moment until the only sound was the crashing waves and a whispered "Yes."
            </p>
            <div className="w-12 h-px bg-stone-300" />
          </motion.div>
        </div>

      </div>

      <motion.div 
  {...fadeInUp} 
  className="pt-20 text-center"
>
  <p className="font-heading text-4xl text-stone-400 italic">Rogelio & Elizabeth</p>
  <p className="text-[10px] uppercase tracking-[0.3em] text-stone-300 mt-4">Est. 2025</p>
</motion.div>
    </section>
  )
}

export default AboutUsComponent1