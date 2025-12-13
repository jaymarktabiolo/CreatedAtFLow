import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import MessageLoop from "./MessageLoop";
import bouquetImage from "@assets/generated_images/minimalist_single_line_art_rose_drawing.png";
import borderImage from "@assets/generated_images/delicate_floral_corner_border_element.png";

export default function Card3D() {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isFlipped) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Dynamic sizing logic
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      // Calculate max available space (padding accounted for)
      const availableHeight = vh - 40; 
      const availableWidth = vw - 40;
      
      // Base dimensions for aspect 3/4
      const baseWidth = 400; 
      const baseHeight = (400 / 3) * 4;

      const scaleW = availableWidth / baseWidth;
      const scaleH = availableHeight / baseHeight;

      // Use the smaller scale to fit both dimensions, capped at 1.2 for large screens
      setScale(Math.min(scaleW, scaleH, 1.2));
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Init

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      className="relative perspective-1000 flex items-center justify-center"
      style={{ 
        width: 400 * scale, 
        height: (400/3)*4 * scale 
      }}
    >
      <motion.div
        ref={cardRef}
        className="w-full h-full relative transform-style-3d cursor-pointer group"
        onClick={() => setIsFlipped(!isFlipped)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={false}
        animate={{ 
          rotateY: isFlipped ? 180 : 0,
          rotateX: isFlipped ? 0 : rotateX.get(), // Only tilt when not flipped to avoid confusion
          // z: isFlipped ? 0 : 50 // Slight pop when interacting
        }}
        style={{
          rotateX: isFlipped ? 0 : rotateX,
          rotateY: isFlipped ? 180 : rotateY,
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Front Face */}
        <div className="absolute inset-0 backface-hidden bg-card rounded-xl overflow-hidden border border-border/50 flex flex-col items-center justify-center p-[6%] shadow-2xl">
          <div className="absolute inset-0 paper-texture opacity-50" />
          
          {/* Shine effect on hover */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent z-20 pointer-events-none"
            style={{ 
              backgroundPosition: useTransform(mouseXSpring, [-0.5, 0.5], ["0% 0%", "100% 100%"]) 
            }} 
          />

          <motion.div 
            className="w-full relative z-10"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              y: [0, -5, 0],
              rotate: [0, 1, 0, -1, 0] // Subtle sway
            }}
            transition={{ 
              scale: { duration: 1.2, ease: "easeOut" },
              opacity: { duration: 1 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <img 
              src={bouquetImage} 
              alt="Floral Bouquet" 
              className="w-full h-auto object-contain drop-shadow-lg"
            />
          </motion.div>
          
          <div className="mt-[8%] text-center z-10 relative">
            <h1 className="font-serif text-[clamp(2rem,5vw,3.5rem)] text-foreground mb-2 tracking-wide">For You</h1>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto rounded-full" />
            <p className="mt-4 font-sans text-xs md:text-sm text-muted-foreground uppercase tracking-widest">Tap to open</p>
          </div>

          {/* Decorative corners */}
          <div className="absolute top-4 left-4 w-[15%] h-[15%] border-t-2 border-l-2 border-gold/30 rounded-tl-lg" />
          <div className="absolute bottom-4 right-4 w-[15%] h-[15%] border-b-2 border-r-2 border-gold/30 rounded-br-lg" />
        </div>

        {/* Back Face */}
        <div className="absolute inset-0 backface-hidden bg-card rounded-xl overflow-hidden rotate-y-180 border border-border/50 flex flex-col items-center justify-center p-[8%] shadow-2xl">
          <div className="absolute inset-0 paper-texture opacity-50" />
          
          {/* Border Decoration */}
          <img src={borderImage} className="absolute top-0 left-0 w-[20%] opacity-60 pointer-events-none" />
          <img src={borderImage} className="absolute bottom-0 right-0 w-[20%] opacity-60 rotate-180 pointer-events-none" />

          <div className="z-10 w-full text-center space-y-[10%] h-full flex flex-col justify-center">
            <div className="flex flex-col gap-1">
              <div className="font-script text-[clamp(1.5rem,4vw,2.5rem)] text-accent/80">From Tabs</div>
            </div>
            
            <div className="flex-1 flex items-center justify-center">
              <MessageLoop />
            </div>
            
            <div className="w-full h-px bg-border my-2" />
            
            <p className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed px-2">
              May your year be filled with as much beauty and kindness as you bring into the world.
            </p>

            <div className="pt-4 flex flex-col items-center gap-1">
              <p className="font-serif italic text-muted-foreground text-sm">With Love</p>
              <p className="font-script text-[clamp(1.5rem,4vw,2.5rem)] text-foreground">To Bendoy</p>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Floating hint */}
      {!isFlipped && (
        <motion.div 
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-muted-foreground/60 text-sm font-sans flex items-center gap-2 whitespace-nowrap"
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
