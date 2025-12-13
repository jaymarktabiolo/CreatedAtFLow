import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Petal = ({ delay }: { delay: number }) => {
  const randomX = Math.random() * 100; // Random start position %
  const duration = 10 + Math.random() * 10; // Random fall duration
  const rotation = Math.random() * 360; // Random initial rotation

  return (
    <motion.div
      className="absolute top-[-5%] w-3 h-3 md:w-4 md:h-4 opacity-70"
      style={{ 
        left: `${randomX}%`,
      }}
      initial={{ y: -20, rotate: rotation, opacity: 0 }}
      animate={{ 
        y: "110vh", 
        rotate: rotation + 360 + Math.random() * 180,
        x: [0, 20, -20, 0], // Swaying motion
        opacity: [0, 0.8, 0.8, 0]
      }}
      transition={{ 
        duration: duration, 
        delay: delay,
        ease: "linear", 
        repeat: Infinity,
        x: {
          duration: 3 + Math.random() * 2, // Sway duration
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
    >
      {/* Simple SVG Petal Shape */}
      <svg viewBox="0 0 24 24" fill="currentColor" className="text-primary/60 drop-shadow-sm">
        <path d="M12 2C12 2 14 8 18 10C22 12 18 16 14 18C10 20 6 18 4 14C2 10 8 8 12 2Z" />
      </svg>
    </motion.div>
  );
};

export default function FallingPetals() {
  const [petals, setPetals] = useState<number[]>([]);

  useEffect(() => {
    // Generate a fixed number of petals
    const count = 15;
    const newPetals = Array.from({ length: count }, (_, i) => i * (15 / count)); // Stagger delays
    setPetals(newPetals);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((delay, i) => (
        <Petal key={i} delay={delay} />
      ))}
    </div>
  );
}
