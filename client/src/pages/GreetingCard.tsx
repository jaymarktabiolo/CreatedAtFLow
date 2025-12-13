import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import Card3D from "@/components/Card3D";
import FallingPetals from "@/components/FallingPetals";
import bouquetImage from "@assets/generated_images/minimalist_single_line_art_rose_drawing.png";

export default function GreetingCard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for assets
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center relative overflow-hidden p-4">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/50 to-transparent" />
        <div className="absolute inset-0 paper-texture opacity-30" />
        
        {/* Soft background blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-gold/10 rounded-full blur-[100px]" />
      </div>

      {/* Falling Petals Animation */}
      {!loading && <FallingPetals />}

      {/* Decorative Side Bouquets */}
      {!loading && (
        <>
          <motion.img
            src={bouquetImage}
            alt="Decorative Bouquet"
            className="absolute -bottom-12 -left-12 w-48 md:w-80 opacity-90 pointer-events-none z-20"
            initial={{ opacity: 0, x: -50, rotate: -20 }}
            animate={{ opacity: 0.9, x: 0, rotate: -10 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          />
           <motion.img
            src={bouquetImage}
            alt="Decorative Bouquet"
            className="absolute -top-12 -right-12 w-48 md:w-80 opacity-90 pointer-events-none z-20"
            initial={{ opacity: 0, x: 50, rotate: 200 }}
            animate={{ opacity: 0.9, x: 0, rotate: 170 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          />
        </>
      )}

      <AnimatePresence>
        {loading ? (
          <LoadingScreen key="loader" />
        ) : (
          <motion.div
            key="content"
            className="z-10 w-full flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Card3D />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
