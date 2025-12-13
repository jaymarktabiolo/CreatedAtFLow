import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const messages = [
  "Haiiii pooo...",
  "Sori natagalan kaka debug...",
  "But worthit hayts.",
  "Pero anyways,",
  "Sana pasundogon pako nimo pu",
  "Alam mo nman yung BOBO pu",
  "Alam ko nman na galit ka eggg",
  "Pero san magustohan moto pu",
  "Pero if dili EDIWAWWWW",
  "Pero what if noh?",
  "Maka storya ang iring?",
  "BTW HAHAHAHHAHA",
  "Ng dahil sa lemon na yan",
  "Na Stress ako :(((((",
];

export default function MessageLoop() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-24 flex items-center justify-center overflow-hidden relative w-full">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          className="absolute font-script text-3xl md:text-4xl text-primary-foreground text-center w-full px-4"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {messages[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
