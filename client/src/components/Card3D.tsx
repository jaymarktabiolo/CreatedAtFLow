import { motion } from "framer-motion";
import { useState } from "react";
import MessageLoop from "./MessageLoop";
import bouquetImage from "@assets/generated_images/elegant_watercolor_floral_bouquet_with_peonies_and_gold_leaves.png";
import borderImage from "@assets/generated_images/delicate_floral_corner_border_element.png";

export default function Card3D() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="relative perspective-1000 w-full max-w-md aspect-[3/4] cursor-pointer group" onClick={() => setIsFlipped(!isFlipped)}>
      <motion.div
        className="w-full h-full relative transform-style-3d shadow-2xl rounded-xl"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut", type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Front Face */}
        <div className="absolute inset-0 backface-hidden bg-white rounded-xl overflow-hidden border border-border/50 flex flex-col items-center justify-center p-8 shadow-inner">
          <div className="absolute inset-0 paper-texture opacity-50" />
          
          <motion.div 
            className="w-full relative z-10"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <img 
              src={bouquetImage} 
              alt="Floral Bouquet" 
              className="w-full h-auto object-contain drop-shadow-lg"
            />
          </motion.div>
          
          <div className="mt-8 text-center z-10 relative">
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-2 tracking-wide">For You</h1>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto rounded-full" />
            <p className="mt-4 font-sans text-sm text-muted-foreground uppercase tracking-widest">Tap to open</p>
          </div>

          {/* Decorative corners */}
          <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-gold/30 rounded-tl-lg" />
          <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-gold/30 rounded-br-lg" />
        </div>

        {/* Back Face */}
        <div className="absolute inset-0 backface-hidden bg-white rounded-xl overflow-hidden rotate-y-180 border border-border/50 flex flex-col items-center justify-center p-8 shadow-inner">
          <div className="absolute inset-0 paper-texture opacity-50" />
          
          {/* Border Decoration */}
          <img src={borderImage} className="absolute top-0 left-0 w-24 opacity-60 pointer-events-none" />
          <img src={borderImage} className="absolute bottom-0 right-0 w-24 opacity-60 rotate-180 pointer-events-none" />

          <div className="z-10 w-full text-center space-y-8">
            <div className="font-serif text-2xl text-accent">Dearest Friend,</div>
            
            <MessageLoop />
            
            <div className="w-full h-px bg-border my-6" />
            
            <p className="font-sans text-sm text-muted-foreground leading-relaxed px-4">
              May your year be filled with as much beauty and kindness as you bring into the world.
            </p>

            <div className="pt-8">
              <p className="font-script text-2xl text-foreground">With Love</p>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Floating hint */}
      {!isFlipped && (
        <motion.div 
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-muted-foreground/60 text-sm font-sans flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 5, 0] }}
          transition={{ delay: 2, duration: 2, repeat: Infinity }}
        >
          Click card to flip
        </motion.div>
      )}
    </div>
  );
}
