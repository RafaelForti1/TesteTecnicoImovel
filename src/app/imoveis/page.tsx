import type { Metadata } from 'next';
import { getTenantConfig } from '@/lib/get-tenant-config';
import { filterImoveisByTenant } from '@/lib/filter-imoveis';
import { PropertyGrid } from '@/components/sections/PropertyGrid';
import { Container } from '@/components/ui/Container';
import { SlideUp } from '@/components/animation/SlideUp';

export async function generateMetadata(): Promise<Metadata> {
  const config = await getTenantConfig();
  return {
    title: `Imóveis | ${config.name}`,
    description: `Confira todos os imóveis disponíveis na ${config.name}`,
  };
}

export default async function ImoveisPage() {
  const config = await getTenantConfig();
  const imoveis = filterImoveisByTenant(config.allowedTags);

  return (
    <div className="pt-24 pb-16">
      <Container>
        <SlideUp>
          <div className="mb-12">
            <h1 className="font-display text-4xl lg:text-5xl mb-4 text-[var(--tenant-color-text)]">
              Nossos Imóveis
            </h1>
            <p className="text-muted text-lg max-w-2xl">
              {imoveis.length} imóveis disponíveis nos bairros{' '}
              {config.allowedTags.join(', ')}
            </p>
          </div>
        </SlideUp>

        <PropertyGrid
          imoveis={imoveis}
          layout={config.layout.propertyCardLayout}
          gridColumns={config.layout.gridColumns}
        />
      </Container>
    </div>
  );
}
