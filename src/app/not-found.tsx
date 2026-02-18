import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Container className="text-center">
        <h1 className="font-display text-6xl lg:text-8xl mb-4 text-primary">404</h1>
        <h2 className="font-display text-2xl lg:text-3xl mb-4 text-[var(--tenant-color-text)]">
          Página não encontrada
        </h2>
        <p className="text-muted text-lg mb-8 max-w-md mx-auto">
          O imóvel ou página que você procura não está disponível.
        </p>
        <Button href="/" variant="primary" size="lg">
          Voltar ao Início
        </Button>
      </Container>
    </div>
  );
}
