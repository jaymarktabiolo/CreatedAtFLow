import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Volume2, VolumeX } from "lucide-react";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const playerRef = useRef<HTMLIFrameElement>(null);

  // YouTube video ID for "Your Universe - Rico Blanco"
  const VIDEO_ID = "-aTIk86XW1E";

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end gap-2">
      <motion.button
        onClick={togglePlay}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-full shadow-lg backdrop-blur-sm border transition-all duration-300
          ${isPlaying 
            ? "bg-primary/90 text-primary-foreground border-primary/20 pr-3" 
            : "bg-white/80 text-foreground border-border hover:bg-white"}
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className={`relative ${isPlaying ? "animate-spin-slow" : ""}`}>
          <Music size={18} className={isPlaying ? "text-white" : "text-primary"} />
        </div>
        <span className="font-sans text-sm font-medium">
          {isPlaying ? "Playing Your Universe" : "Play Song"}
        </span>
      </motion.button>

      {/* Hidden YouTube Embed */}
      <div className="absolute opacity-0 pointer-events-none w-1 h-1 overflow-hidden">
        {isPlaying && (
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&loop=1&playlist=${VIDEO_ID}&controls=0&showinfo=0`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
}
