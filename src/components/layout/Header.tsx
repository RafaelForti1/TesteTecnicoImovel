'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { useTenant } from '@/hooks/useTenant';
import { Navigation } from './Navigation';
import { Container } from '@/components/ui/Container';

export function Header() {
  const config = useTenant();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logoPositionClasses: Record<string, string> = {
    left: '',
    center: 'md:justify-center',
    right: 'md:flex-row-reverse',
  };

  const positionClass = logoPositionClasses[config.layout.headerLogoPosition] ?? '';

  return (
    <>
      <motion.header
        className={[
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-[var(--tenant-transition-default)]',
          isScrolled
            ? 'bg-surface/80 shadow-md'
            : 'bg-transparent',
        ].join(' ')}
        style={{
          backdropFilter: isScrolled ? `blur(var(--tenant-blur-header))` : 'none',
          WebkitBackdropFilter: isScrolled ? `blur(var(--tenant-blur-header))` : 'none',
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <Container>
          <div className={`flex items-center justify-between h-16 md:h-20 ${positionClass}`}>
            <Link href="/" className="flex-shrink-0 relative z-10">
              <Image
                src={config.header.logoSrc}
                alt={config.header.logoAlt}
                width={160}
                height={40}
                className="h-8 md:h-10 w-auto"
                priority
              />
            </Link>

            <nav className="hidden md:flex items-center gap-8" aria-label="Navegação principal">
              {config.header.navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={[
                    'text-sm font-medium transition-colors',
                    'duration-[var(--tenant-transition-default)]',
                    isScrolled
                      ? 'text-[var(--tenant-color-text)] hover:text-primary'
                      : 'text-white/90 hover:text-white',
                  ].join(' ')}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <button
              className={[
                'md:hidden relative z-10 p-2 rounded-md',
                'transition-colors duration-200',
                isScrolled ? 'text-[var(--tenant-color-text)]' : 'text-white',
              ].join(' ')}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={isMobileMenuOpen}
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <motion.span
                  className="block h-0.5 w-full bg-current origin-left"
                  animate={isMobileMenuOpen ? { rotate: 45, x: 2 } : { rotate: 0, x: 0 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="block h-0.5 w-full bg-current"
                  animate={isMobileMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="block h-0.5 w-full bg-current origin-left"
                  animate={isMobileMenuOpen ? { rotate: -45, x: 2 } : { rotate: 0, x: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </button>
          </div>
        </Container>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <Navigation
            links={config.header.navLinks}
            onClose={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
