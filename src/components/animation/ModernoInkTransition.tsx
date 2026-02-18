'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

interface ModernoInkTransitionProps {
  children: React.ReactNode;
  color?: string;
}

export function ModernoInkTransition({ children, color = '#3B82F6' }: ModernoInkTransitionProps) {
  const [isAnimating, setIsAnimating] = useState(true);
  const [windowHeight, setWindowHeight] = useState(800); // Fixed value for SSR consistency

  useEffect(() => {
    // Only update window height on client side after hydration
    if (typeof window !== 'undefined') {
      setWindowHeight(window.innerHeight);
    }
    
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Fixed positions for SSR consistency
  const dropPositions = [15, 30, 45, 60, 75, 20, 50, 80];
  const splatterPositions = [
    { left: 20, top: 30 }, { left: 40, top: 20 }, { left: 60, top: 40 },
    { left: 80, top: 25 }, { left: 25, top: 60 }, { left: 50, top: 70 },
    { left: 70, top: 65 }, { left: 35, top: 45 }, { left: 55, top: 35 },
    { left: 75, top: 50 }, { left: 30, top: 80 }, { left: 65, top: 75 }
  ];

  return (
    <div className="relative w-full h-full">
      <AnimatePresence>
        {isAnimating && (
          <>
            {/* Blue ink drops falling */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`drop-${i}`}
                className="absolute w-4 h-8 rounded-full"
                style={{
                  backgroundColor: color,
                  left: `${dropPositions[i]}%`,
                  top: '-50px',
                  filter: 'blur(1px)',
                  opacity: 0.8,
                }}
                initial={{ y: 0, scale: 0.5 }}
                animate={{
                  y: windowHeight + 100,
                  scale: [0.5, 1.2, 0.8, 1],
                  rotate: [0, 45, -30, 15],
                }}
                transition={{
                  duration: 2.5 + (i * 0.2),
                  delay: i * 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  scale: {
                    times: [0, 0.3, 0.7, 1],
                  },
                }}
              />
            ))}

            {/* Ink splatter effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {splatterPositions.map((pos, i) => (
                <motion.div
                  key={`splatter-${i}`}
                  className="absolute rounded-full"
                  style={{
                    backgroundColor: color,
                    left: `${pos.left}%`,
                    top: `${pos.top}%`,
                    width: `${15 + (i % 3) * 5}px`,
                    height: `${15 + (i % 3) * 5}px`,
                    filter: 'blur(2px)',
                    opacity: 0.6,
                  }}
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{
                    scale: [0, 1.5, 1],
                    rotate: (i * 30) % 360,
                  }}
                  transition={{
                    duration: 1.5,
                    delay: 0.5 + (i * 0.1),
                    ease: 'easeOut',
                  }}
                />
              ))}
            </motion.div>

            {/* Main ink pool */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 3, 2.5],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 2,
                ease: 'easeOut',
              }}
            />

            {/* Dripping effect */}
            <motion.div
              className="absolute top-0 left-1/2 transform -translate-x-1/2"
              initial={{ height: 0, opacity: 1 }}
              animate={{ height: '100vh', opacity: 0 }}
              transition={{
                duration: 2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <div
                className="w-32 h-full"
                style={{
                  background: `linear-gradient(to bottom, ${color} 0%, transparent 100%)`,
                  filter: 'blur(8px)',
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isAnimating ? 0.3 : 1 }}
        transition={{ duration: 0.5, delay: isAnimating ? 0 : 1.5 }}
      >
        {children}
      </motion.div>
    </div>
  );
}