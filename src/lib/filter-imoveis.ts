import type { Imovel } from '@/types';
import allImoveisData from '@/data/imoveis.json';

const allImoveis: Imovel[] = allImoveisData;

export function filterImoveisByTenant(allowedTags: string[]): Imovel[] {
  return allImoveis.filter((imovel) => allowedTags.includes(imovel.bairroTag));
}

export function getImovelById(id: string): Imovel | undefined {
  return allImoveis.find((imovel) => imovel.id === id);
}
