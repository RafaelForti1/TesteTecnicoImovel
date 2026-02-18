import type { Metadata } from 'next';
import { getTenantConfig } from '@/lib/get-tenant-config';
import { TenantProvider } from '@/components/providers/TenantProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { TenantSwitcher } from '@/components/ui/TenantSwitcher';
import { PageTransition } from '@/components/animation/PageTransition';
import './globals.css';

export async function generateMetadata(): Promise<Metadata> {
  const config = await getTenantConfig();
  return {
    title: config.meta.title,
    description: config.meta.description,
    openGraph: {
      title: config.meta.ogTitle,
      description: config.meta.ogDescription,
      images: [config.meta.ogImage],
      siteName: config.name,
      locale: 'pt_BR',
      type: 'website',
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = await getTenantConfig();

  return (
    <html lang="pt-BR" data-tenant={config.slug}>
      <body>
        <TenantProvider config={config}>
          <ThemeProvider theme={config.theme}>
            <Header />
            <main className="min-h-screen">
              <PageTransition>
                {children}
              </PageTransition>
            </main>
            <Footer config={config} />
            <TenantSwitcher />
          </ThemeProvider>
        </TenantProvider>
      </body>
    </html>
  );
}
