import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTenantConfig } from '@/lib/get-tenant-config';
import { getImovelById } from '@/lib/filter-imoveis';
import { Container } from '@/components/ui/Container';
import { Tag } from '@/components/ui/Tag';
import { PriceDisplay } from '@/components/ui/PriceDisplay';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/animation/FadeIn';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const imovel = getImovelById(id);
  const config = await getTenantConfig();

  if (!imovel) {
    return { title: `Imóvel não encontrado | ${config.name}` };
  }

  return {
    title: `${imovel.titulo} | ${config.name}`,
    description: imovel.descricao,
    openGraph: {
      title: imovel.titulo,
      description: imovel.descricao,
      images: [imovel.imagem],
    },
  };
}

export default async function ImovelPage({ params }: PageProps) {
  const { id } = await params;
  const imovel = getImovelById(id);
  const config = await getTenantConfig();

  if (!imovel) {
    notFound();
  }

  const isAllowed = config.allowedTags.includes(imovel.bairroTag);
  if (!isAllowed) {
    notFound();
  }

  return (
    <div className="pt-24 pb-16">
      <Container>
        <Link
          href="/imoveis"
          className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors mb-8"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Voltar para listagem
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <FadeIn>
            <div className="relative aspect-[4/3] rounded-card overflow-hidden">
              <Image
                src={imovel.imagem}
                alt={imovel.titulo}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute top-4 left-4">
                <Tag label={imovel.bairroTag} />
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="font-display text-3xl lg:text-4xl mb-4 text-[var(--tenant-color-text)]">
                  {imovel.titulo}
                </h1>

                <p className="text-muted text-lg leading-relaxed mb-8">
                  {imovel.descricao}
                </p>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  {imovel.caracteristicas.map((c) => (
                    <div
                      key={c.label}
                      className="bg-surface border border-tenant-border rounded-card p-4 text-center"
                    >
                      <span className="text-2xl block mb-1">{c.icone}</span>
                      <span className="text-sm text-muted block">{c.label}</span>
                      <span className="font-display font-bold text-[var(--tenant-color-text)]">
                        {c.valor}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-surface border border-tenant-border rounded-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-muted text-sm">Valor do imóvel</span>
                  <PriceDisplay value={imovel.preco} />
                </div>
                <Button variant="primary" size="lg" className="w-full">
                  Agendar Visita
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </div>
  );
}
