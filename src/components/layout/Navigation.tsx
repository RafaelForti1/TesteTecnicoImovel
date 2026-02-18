'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import type { NavLink } from '@/types';

interface NavigationProps {
  links: NavLink[];
  onClose: () => void;
}

export function Navigation({ links, onClose }: NavigationProps) {
  return (
    <motion.div
      className="fixed inset-0 z-40 md:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <motion.nav
        className="absolute top-0 right-0 h-full w-72 bg-surface shadow-2xl flex flex-col"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        aria-label="Menu mobile"
      >
        <div className="h-16 flex items-center justify-end px-4">
          <button
            onClick={onClose}
            className="p-2 text-muted hover:text-[var(--tenant-color-text)] transition-colors"
            aria-label="Fechar menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="flex-1 px-4 py-4 space-y-1">
          {links.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 + 0.1 }}
            >
              <Link
                href={link.href}
                onClick={onClose}
                className="block px-4 py-3 rounded-md text-base font-medium text-[var(--tenant-color-text)] hover:bg-primary/5 hover:text-primary transition-colors duration-[var(--tenant-transition-default)]"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.nav>
    </motion.div>
  );
}
