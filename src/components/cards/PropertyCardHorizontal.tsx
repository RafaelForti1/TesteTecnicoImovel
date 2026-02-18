'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import type { Imovel } from '@/types';
import { PriceDisplay } from '@/components/ui/PriceDisplay';
import { Tag } from '@/components/ui/Tag';
import { PropertyCardAnimation, ShineEffect } from '@/components/animation/PropertyCardAnimation';
import { useTenant } from '@/hooks/useTenant';

interface Props {
  imovel: Imovel;
}

export function PropertyCardHorizontal({ imovel, index = 0 }: Props & { index?: number }) {
  const config = useTenant();
  const isPremium = config.slug === 'premium';
  return (
    <PropertyCardAnimation 
      index={index} 
      premium={isPremium}
      className={[
        'group bg-surface rounded-card border border-tenant-border shadow-card overflow-hidden flex flex-col sm:flex-row transition-all duration-[var(--tenant-transition-default)] hover:shadow-card-hover',
        isPremium ? 'hover:border-[var(--tenant-color-primary-light)]' : '',
      ].join(' ')}
    >
      <Link href={`/imoveis/${imovel.id}`} className="flex flex-col sm:flex-row w-full">
        <ShineEffect color={config.theme.colorPrimary}>
          <div className="relative sm:w-2/5 aspect-[4/3] sm:aspect-auto sm:min-h-[220px] overflow-hidden">
            <Image
              src={imovel.imagem}
              alt={imovel.titulo}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-3 left-3">
              <Tag label={imovel.bairroTag} />
            </div>
          </div>
        </ShineEffect>

        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <h3 className={[
              'font-display text-lg font-bold mb-2 line-clamp-2 transition-colors',
              isPremium 
                ? 'text-[var(--tenant-color-text)] group-hover:text-[var(--tenant-color-primary-light)]' 
                : 'text-[var(--tenant-color-text)] group-hover:text-[var(--tenant-color-primary)]',
            ].join(' ')}>
              {imovel.titulo}
            </h3>
            <p className="text-muted text-sm mb-4 line-clamp-3">
              {imovel.descricao}
            </p>
            <div className="flex gap-4 mb-4 text-sm text-muted">
              {imovel.caracteristicas.map((c) => (
                <span key={c.label} className="flex items-center gap-1">
                  <span>{c.icone}</span>
                  <span>{c.valor}</span>
                </span>
              ))}
            </div>
          </div>
          <div className={isPremium ? 'border-t border-[var(--tenant-color-border)] pt-4 mt-4' : ''}>
            <PriceDisplay value={imovel.preco} />
          </div>
        </div>
      </Link>
    </PropertyCardAnimation>
  );
}
