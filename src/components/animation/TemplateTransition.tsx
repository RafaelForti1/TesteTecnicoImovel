'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

interface TemplateTransitionProps {
  isActive: boolean;
  targetColor: string;
  onAnimationComplete?: () => void;
}

export function TemplateTransition({ 
  isActive, 
  targetColor, 
  onAnimationComplete 
}: TemplateTransitionProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    if (isActive) {
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 0.8,
      }));
      setParticles(newParticles);
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
          transition={{ duration: 0.6 }}
        >
          {/* Background morphing effect */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1.2, 1],
              opacity: [0, 0.8, 0.9]
            }}
            transition={{ 
              duration: 1.2,
              times: [0, 0.6, 1],
              ease: "easeInOut"
            }}
            style={{ 
              background: `radial-gradient(circle at center, ${targetColor}40 0%, ${targetColor}20 40%, transparent 70%)`,
              filter: 'blur(20px)'
            }}
          />

          {/* Particle explosion effect */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                backgroundColor: targetColor,
                boxShadow: `0 0 10px ${targetColor}`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.5, 0],
                opacity: [0, 1, 0],
                x: [(Math.random() - 0.5) * 200, (Math.random() - 0.5) * 400],
                y: [(Math.random() - 0.5) * 200, (Math.random() - 0.5) * 400],
              }}
              transition={{
                duration: 1.5,
                delay: particle.delay,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Ripple wave effect */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 3, 5] }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            onAnimationComplete={onAnimationComplete}
          >
            <div 
              className="w-32 h-32 rounded-full border-4"
              style={{ 
                borderColor: targetColor,
                opacity: 0.6,
                filter: 'blur(2px)'
              }}
            />
          </motion.div>

          {/* Glitch effect overlay */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.3, 0, 0.2, 0],
              x: [0, -10, 10, -5, 0]
            }}
            transition={{ 
              duration: 0.8,
              delay: 0.4,
              times: [0, 0.2, 0.4, 0.6, 1]
            }}
          >
            <div 
              className="w-full h-full"
              style={{
                background: `linear-gradient(45deg, transparent 30%, ${targetColor}40 50%, transparent 70%)`,
                mixBlendMode: 'screen'
              }}
            />
          </motion.div>

          {/* Final flash effect */}
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0] }}
            transition={{ 
              duration: 0.3,
              delay: 1.1,
              ease: "easeIn"
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}