'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import { useTenant } from '@/hooks/useTenant';
import { Button } from '@/components/ui/Button';
import { StaggeredElement, FloatingElement, GlowElement } from '@/components/animation/ElementAnimations';

export function HeroSection() {
  const config = useTenant();
  const { hero, layout } = config;
  const isPremium = config.slug === 'premium';
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Floating elements positions (deterministic for SSR)
  const floatingElements = [
    { top: '20%', left: '10%', delay: 0, size: 'w-2 h-2' },
    { top: '30%', left: '85%', delay: 0.2, size: 'w-3 h-3' },
    { top: '60%', left: '15%', delay: 0.4, size: 'w-2 h-2' },
    { top: '70%', left: '80%', delay: 0.6, size: 'w-4 h-4' },
    { top: '40%', left: '70%', delay: 0.8, size: 'w-2 h-2' },
  ];

  return (
    <section
      ref={ref}
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
      aria-label="Banner principal"
    >
      {/* Floating particles for Moderno */}
      {!isPremium && hero.particles && (
        <div className="absolute inset-0 z-15 pointer-events-none">
          {floatingElements.map((element, index) => (
            <FloatingElement
              key={index}
              duration={4 + index}
              amplitude={15}
              delay={element.delay}
              className="absolute"
              style={{ top: element.top, left: element.left }}
            >
              <div className={`${element.size} bg-[var(--tenant-color-primary-light)] rounded-full opacity-60`} />
            </FloatingElement>
          ))}
        </div>
      )}

      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <Image
          src={hero.backgroundImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover scale-110"
        />
      </motion.div>

      {isPremium ? (
        <div
          className="absolute inset-0 z-10"
          style={{
            background: `linear-gradient(to top, rgba(26,26,46,0.75), rgba(26,26,46,0.35) 40%, transparent)`,
          }}
        />
      ) : (
        <div
          className="absolute inset-0 z-10"
          style={{
            background: `linear-gradient(${hero.gradientDirection}, var(--tenant-color-overlay), var(--tenant-color-overlay) 40%, transparent)`,
          }}
        />
      )}

      {isPremium ? (
        <motion.div
          className="relative z-20 max-w-3xl mx-auto px-4 text-center"
          style={{ opacity: contentOpacity }}
        >
          <StaggeredElement index={0} className="mb-8">
            <motion.h1
              className="font-display leading-tight text-balance text-white"
              style={{ fontSize: 'var(--tenant-font-size-hero)' }}
            >
              {hero.headline}
            </motion.h1>
          </StaggeredElement>
          <StaggeredElement index={1} className="mb-10">
            <motion.p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed italic">
              {hero.subheadline}
            </motion.p>
          </StaggeredElement>
          <StaggeredElement index={2}>
            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                size="lg"
                href={hero.ctaLink}
                className="border-[1px] border-[var(--tenant-color-primary-light)] text-white hover:bg-[var(--tenant-color-primary)] hover:text-white"
              >
                {hero.ctaText}
              </Button>
              {layout.showSecondaryCtaInHero && hero.secondaryCtaText && (
                <Button variant="primary" size="lg" href={hero.secondaryCtaLink}>
                  {hero.secondaryCtaText}
                </Button>
              )}
            </motion.div>
          </StaggeredElement>
        </motion.div>
      ) : (
        <motion.div
          className="relative z-20 max-w-4xl mx-auto px-4 text-center"
          style={{ opacity: contentOpacity }}
        >
          <StaggeredElement index={0} className="mb-6">
            <motion.h1
              className="font-display text-on-primary leading-tight text-balance"
              style={{ fontSize: 'var(--tenant-font-size-hero)' }}
            >
              {hero.headline}
            </motion.h1>
          </StaggeredElement>

          <StaggeredElement index={1} className="mb-10">
            <motion.p
              className="text-on-primary/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            >
              {hero.subheadline}
            </motion.p>
          </StaggeredElement>

          <StaggeredElement index={2}>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <GlowElement glowColor={config.theme.colorPrimary} intensity={15}>
                <Button variant="primary" size="lg" href={hero.ctaLink}>
                  {hero.ctaText}
                </Button>
              </GlowElement>

              {layout.showSecondaryCtaInHero && hero.secondaryCtaText && (
                <FloatingElement duration={3} amplitude={8}>
                  <Button variant="outline" size="lg" href={hero.secondaryCtaLink}>
                    {hero.secondaryCtaText}
                  </Button>
                </FloatingElement>
              )}

              {/* Additional floating elements for Moderno */}
              {hero.floatingElements && (
                <>
                  <FloatingElement duration={5} amplitude={12} delay={1}>
                    <div className="absolute -top-20 -right-20 w-16 h-16 bg-[var(--tenant-color-primary-light)] rounded-full opacity-20" />
                  </FloatingElement>
                  <FloatingElement duration={6} amplitude={10} delay={1.5}>
                    <div className="absolute -bottom-24 -left-16 w-20 h-20 bg-[var(--tenant-color-primary)] rounded-full opacity-15" />
                  </FloatingElement>
                </>
              )}
            </motion.div>
          </StaggeredElement>
        </motion.div>
      )}
    </section>
  );
}
