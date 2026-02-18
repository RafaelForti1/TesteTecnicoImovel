import type { Imovel } from '@/types';
import { PropertyCard } from '@/components/cards/PropertyCard';

interface PropertyGridProps {
  imoveis: Imovel[];
  layout: 'vertical' | 'horizontal';
  gridColumns: 2 | 3;
}

export function PropertyGrid({ imoveis, layout, gridColumns }: PropertyGridProps) {
  const gridClass = gridColumns === 3
    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'
    : 'grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8';

  if (imoveis.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted text-lg">Nenhum imóvel encontrado para este tenant.</p>
      </div>
    );
  }

  return (
    <div className={gridClass}>
      {imoveis.map((imovel, index) => (
        <PropertyCard key={imovel.id} imovel={imovel} layout={layout} index={index} />
      ))}
    </div>
  );
}
