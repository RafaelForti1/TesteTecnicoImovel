'use client';

import { motion, Variants } from 'motion/react';
import { ReactNode } from 'react';

interface PropertyCardAnimationProps {
  children: ReactNode;
  index: number;
  className?: string;
  premium?: boolean;
}

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
    rotateY: -15,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateY: 0,
    transition: {
      duration: 0.6,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

const premiumCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 80,
    scale: 0.8,
    rotateX: -20,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.23, 1, 0.32, 1],
      scale: { duration: 0.6 },
      filter: { duration: 0.8 },
    },
  },
};

export function PropertyCardAnimation({ 
  children, 
  index, 
  className, 
  premium = false 
}: PropertyCardAnimationProps) {
  const variants = premium ? premiumCardVariants : cardVariants;
  
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.15 }}
      className={className}
      whileHover={premium ? {
        scale: 1.05,
        y: -10,
        rotateX: 5,
        transition: { duration: 0.3 }
      } : {
        scale: 1.02,
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      {premium && (
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)',
            pointerEvents: 'none',
          }}
        />
      )}
      {children}
    </motion.div>
  );
}

interface ShineEffectProps {
  children: ReactNode;
  className?: string;
  color?: string;
}

export function ShineEffect({ children, className, color = '#ffffff' }: ShineEffectProps) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      whileHover="hover"
      initial="rest"
    >
      <motion.div
        className="absolute inset-0 z-10"
        style={{
          background: `linear-gradient(105deg, transparent 40%, ${color}40 50%, transparent 60%)`,
          transform: 'translateX(-100%)',
        }}
        variants={{
          rest: { transform: 'translateX(-100%)' },
          hover: {
            transform: 'translateX(100%)',
            transition: { duration: 0.8, ease: 'easeInOut' },
          },
        }}
      />
      {children}
    </motion.div>
  );
}