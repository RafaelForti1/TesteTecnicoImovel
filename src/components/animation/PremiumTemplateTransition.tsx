'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

interface PremiumTemplateTransitionProps {
  isActive: boolean;
  targetColor: string;
  onAnimationComplete?: () => void;
}

export function PremiumTemplateTransition({ 
  isActive, 
  targetColor, 
  onAnimationComplete 
}: PremiumTemplateTransitionProps) {
  const [gridItems, setGridItems] = useState<Array<{ id: number; delay: number }>>([]);

  useEffect(() => {
    if (isActive) {
      const items = Array.from({ length: 25 }, (_, i) => ({
        id: i,
        delay: (i % 5) * 0.1 + Math.floor(i / 5) * 0.15,
      }));
      setGridItems(items);
    }
  }, [isActive]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-[9999] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Grid dissolve effect */}
          <div className="absolute inset-0 grid grid-cols-5 grid-rows-5">
            {gridItems.map((item) => (
              <motion.div
                key={item.id}
                className="relative overflow-hidden"
                initial={{ opacity: 1, scale: 1 }}
                animate={{ 
                  opacity: [1, 0.8, 0],
                  scale: [1, 0.9, 0.8],
                  rotateY: [0, 90, 180]
                }}
                transition={{
                  duration: 0.8,
                  delay: item.delay,
                  ease: "easeInOut"
                }}
              >
                <div 
                  className="w-full h-full"
                  style={{
                    background: `linear-gradient(135deg, ${targetColor}30 0%, ${targetColor}10 50%, transparent 100%)`,
                    backdropFilter: 'blur(5px)'
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Liquid morph effect */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1.5, 2, 3],
              opacity: [0, 0.6, 0.3, 0]
            }}
            transition={{
              duration: 2,
              times: [0, 0.3, 0.6, 1],
              ease: "easeOut"
            }}
            onAnimationComplete={onAnimationComplete}
          >
            <div 
              className="w-64 h-64 rounded-full"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${targetColor}80 0%, ${targetColor}40 50%, transparent 100%)`,
                filter: 'blur(15px)',
                transform: 'scale(1.2)'
              }}
            />
          </motion.div>

          {/* Neon pulse rings */}
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 2, 4],
                opacity: [0, 0.8, 0]
              }}
              transition={{
                duration: 1.5,
                delay: index * 0.3,
                ease: "easeOut"
              }}
            >
              <div 
                className="w-48 h-48 rounded-full border-2"
                style={{
                  borderColor: targetColor,
                  boxShadow: `0 0 30px ${targetColor}, inset 0 0 30px ${targetColor}`,
                  filter: 'blur(1px)'
                }}
              />
            </motion.div>
          ))}

          {/* Chromatic aberration effect */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.4, 0.2, 0],
              x: [0, -3, 3, 0],
              y: [0, 3, -3, 0]
            }}
            transition={{
              duration: 0.6,
              delay: 0.8,
              times: [0, 0.3, 0.6, 1]
            }}
          >
            <div 
              className="w-full h-full"
              style={{
                background: `linear-gradient(45deg, ${targetColor}60 0%, transparent 50%, ${targetColor}60 100%)`,
                mixBlendMode: 'multiply',
                filter: 'blur(2px)'
              }}
            />
          </motion.div>

          {/* Holographic shimmer */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.5, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: 1,
              delay: 0.5,
              ease: "linear"
            }}
          >
            <div 
              className="w-full h-full"
              style={{
                background: `conic-gradient(from 0deg, transparent 0%, ${targetColor}30 25%, transparent 50%, ${targetColor}30 75%, transparent 100%)`,
                mixBlendMode: 'screen'
              }}
            />
          </motion.div>

          {/* Final white flash with color tint */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0] }}
            transition={{
              duration: 0.4,
              delay: 1.6,
              ease: "easeOut"
            }}
          >
            <div 
              className="w-full h-full"
              style={{
                background: `linear-gradient(135deg, white 0%, ${targetColor}20 100%)`
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}