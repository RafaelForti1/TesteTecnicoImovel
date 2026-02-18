import type { Imovel } from '@/types';
import { PropertyCardVertical } from './PropertyCardVertical';
import { PropertyCardHorizontal } from './PropertyCardHorizontal';

interface PropertyCardProps {
  imovel: Imovel;
  layout: 'vertical' | 'horizontal';
  index?: number;
}

export function PropertyCard({ imovel, layout, index = 0 }: PropertyCardProps) {
  if (layout === 'horizontal') {
    return <PropertyCardHorizontal imovel={imovel} index={index} />;
  }
  return <PropertyCardVertical imovel={imovel} index={index} />;
}
