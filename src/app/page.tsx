import { Suspense } from 'react';
import { getTenantConfig } from '@/lib/get-tenant-config';
import { filterImoveisByTenant } from '@/lib/filter-imoveis';
import { HeroSection } from '@/components/sections/HeroSection';
import { PropertyGrid } from '@/components/sections/PropertyGrid';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { PropertyCardSkeleton } from '@/components/cards/PropertyCardSkeleton';
import { Container } from '@/components/ui/Container';
import { SlideUp } from '@/components/animation/SlideUp';

function GridSkeleton({ layout, count }: { layout: 'vertical' | 'horizontal'; count: number }) {
  return (
    <div className={layout === 'vertical'
      ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'
      : 'grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8'
    }>
      {Array.from({ length: count }).map((_, i) => (
        <PropertyCardSkeleton key={i} layout={layout} />
      ))}
    </div>
  );
}

async function PropertySection() {
  const config = await getTenantConfig();
  const imoveis = filterImoveisByTenant(config.allowedTags);

  return (
    <PropertyGrid
      imoveis={imoveis}
      layout={config.layout.propertyCardLayout}
      gridColumns={config.layout.gridColumns}
    />
  );
}

export default async function HomePage() {
  const config = await getTenantConfig();
  const featuredTitle = config.slug === 'premium' ? 'Destaques de Luxo' : 'Imóveis em Destaque';
  const featuredSubtitle = config.slug === 'premium'
    ? 'Seleção criteriosa de residências de alto padrão'
    : 'Confira nossa seleção exclusiva de imóveis nos melhores bairros';

  return (
    <>
      <HeroSection />

      {/* Services Section - Moderno only */}
      {config.layout.showServices && config.services && (
        <ServicesSection
          title={config.services.title}
          subtitle={config.services.subtitle}
          services={config.services.items}
          premium={config.slug === 'premium'}
        />
      )}

      {/* Stats Section - Moderno only */}
      {config.layout.showStats && config.stats && (
        <StatsSection
          title={config.stats.title}
          stats={config.stats.items}
          premium={config.slug === 'premium'}
        />
      )}

      <Container className="py-16 lg:py-24">
        <SlideUp>
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="font-display text-3xl lg:text-4xl mb-4 text-[var(--tenant-color-text)]">{featuredTitle}</h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">{featuredSubtitle}</p>
          </div>
        </SlideUp>

        <Suspense
          fallback={
            <GridSkeleton
              layout={config.layout.propertyCardLayout}
              count={config.layout.gridColumns === 3 ? 6 : 4}
            />
          }
        >
          <PropertySection />
        </Suspense>
      </Container>

      {/* Testimonials Section */}
      {config.layout.showTestimonials && config.testimonials && (
        <TestimonialsSection
          title={config.testimonials.title}
          testimonials={config.testimonials.items}
          premium={config.slug === 'premium'}
        />
      )}

      <section className="bg-surface py-16 lg:py-24" id="sobre">
        <Container>
          <SlideUp>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-3xl lg:text-4xl mb-6 text-[var(--tenant-color-text)]">
                Sobre a {config.name}
              </h2>
              <p className="text-muted text-lg leading-relaxed">
                {config.tagline}. Somos especialistas nos melhores bairros de São Paulo,
                oferecendo um serviço personalizado e dedicado para encontrar o imóvel
                perfeito para você e sua família.
              </p>
            </div>
          </SlideUp>
        </Container>
      </section>

      <section className="py-16 lg:py-24" id="contato">
        <Container>
          <SlideUp>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div>
                <h2 className="font-display text-3xl lg:text-4xl mb-4 text-[var(--tenant-color-text)]">
                  {config.slug === 'premium' ? 'Fale com nosso Concierge' : 'Fale com nossa equipe'}
                </h2>
                <p className="text-muted text-lg mb-8 max-w-xl">
                  {config.slug === 'premium'
                    ? 'Agende uma consultoria personalizada para conhecer as melhores oportunidades de alto padrão em São Paulo.'
                    : 'Envie uma mensagem e nossa equipe retorna com as melhores opções de imóveis para o seu perfil.'}
                </p>
                {config.slug === 'premium' ? (
                  <div className="space-y-4 text-sm text-[var(--tenant-color-text)]">
                    <div>
                      <span className="font-semibold">Contato direto</span>
                      <p className="text-muted">contato@premiumimobiliaria.com.br</p>
                    </div>
                    <div>
                      <span className="font-semibold">Telefone</span>
                      <p className="text-muted">(11) 4000-2000</p>
                    </div>
                    <div>
                      <span className="font-semibold">Atendimento Concierge</span>
                      <p className="text-muted">Segunda a sábado, das 9h às 20h</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 text-sm text-[var(--tenant-color-text)]">
                    <div>
                      <span className="font-semibold">WhatsApp</span>
                      <p className="text-muted">(11) 90000-0000</p>
                    </div>
                    <div>
                      <span className="font-semibold">E-mail</span>
                      <p className="text-muted">contato@modernoimoveis.com.br</p>
                    </div>
                    <div>
                      <span className="font-semibold">Horário de atendimento</span>
                      <p className="text-muted">Segunda a sexta, das 9h às 18h</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-surface rounded-card border border-tenant-border p-6 lg:p-8">
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[var(--tenant-color-text)] mb-1">
                        Nome
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-md border border-tenant-border bg-background px-3 py-2 text-sm outline-none focus:border-[var(--tenant-color-primary)]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--tenant-color-text)] mb-1">
                        E-mail
                      </label>
                      <input
                        type="email"
                        className="w-full rounded-md border border-tenant-border bg-background px-3 py-2 text-sm outline-none focus:border-[var(--tenant-color-primary)]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--tenant-color-text)] mb-1">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      className="w-full rounded-md border border-tenant-border bg-background px-3 py-2 text-sm outline-none focus:border-[var(--tenant-color-primary)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--tenant-color-text)] mb-1">
                      Mensagem
                    </label>
                    <textarea
                      rows={4}
                      className="w-full rounded-md border border-tenant-border bg-background px-3 py-2 text-sm outline-none focus:border-[var(--tenant-color-primary)] resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-button text-sm font-medium bg-[var(--tenant-color-primary)] text-[var(--tenant-color-text-on-primary)] hover:bg-[var(--tenant-color-primary-dark)] transition-colors w-full md:w-auto"
                  >
                    {config.slug === 'premium' ? 'Solicitar atendimento exclusivo' : 'Enviar mensagem'}
                  </button>
                </form>
              </div>
            </div>
          </SlideUp>
        </Container>
      </section>
    </>
  );
}
