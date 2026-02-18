'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTransition({ children, className }: PageTransitionProps) {
  const [key, setKey] = useState(0);

  useEffect(() => {
    // Force re-render when template changes
    setKey(prev => prev + 1);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={key}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{
          duration: 0.6,
          ease: [0.23, 1, 0.32, 1],
          scale: { duration: 0.4 },
          y: { duration: 0.5 }
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}