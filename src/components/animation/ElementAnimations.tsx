'use client';

import { motion, Variants } from 'motion/react';
import type { ReactNode, CSSProperties } from 'react';

interface StaggeredElementProps {
  children: ReactNode;
  index: number;
  className?: string;
  delay?: number;
}

const elementVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.9,
    rotateX: -15,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.6,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

export function StaggeredElement({ 
  children, 
  index, 
  className, 
  delay = 0 
}: StaggeredElementProps) {
  return (
    <motion.div
      variants={elementVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: delay + index * 0.1 }}
      className={className}
      whileHover={{ 
        scale: 1.02,
        y: -2,
        transition: { duration: 0.2 }
      }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
}

export function Stagger({ children, className }: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, staggerChildren: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  amplitude?: number;
  delay?: number;
  style?: CSSProperties;
}

export function FloatingElement({ 
  children, 
  className, 
  duration = 4,
  amplitude = 10,
  delay = 0,
  style,
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      style={style}
      animate={{
        y: [0, -amplitude, 0, amplitude, 0],
        rotate: [0, 2, 0, -2, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

interface GlowElementProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  intensity?: number;
}

export function GlowElement({ 
  children, 
  className, 
  glowColor = '#ffffff',
  intensity = 20 
}: GlowElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        filter: [
          `drop-shadow(0 0 ${intensity}px ${glowColor})`,
          `drop-shadow(0 0 ${intensity * 1.5}px ${glowColor})`,
          `drop-shadow(0 0 ${intensity}px ${glowColor})`,
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
