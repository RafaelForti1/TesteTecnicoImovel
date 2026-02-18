import { headers, cookies } from 'next/headers';
import { tenantRegistry, DEFAULT_TENANT } from '@/config/tenants';
import type { TenantConfig } from '@/types';

export async function getTenantConfig(): Promise<TenantConfig> {
  const headerStore = await headers();
  const slug = headerStore.get('x-tenant-slug');

  if (slug && tenantRegistry[slug]) {
    return tenantRegistry[slug];
  }

  const cookieStore = await cookies();
  const cookieSlug = cookieStore.get('tenant')?.value;

  if (cookieSlug && tenantRegistry[cookieSlug]) {
    return tenantRegistry[cookieSlug];
  }

  return tenantRegistry[DEFAULT_TENANT];
}
