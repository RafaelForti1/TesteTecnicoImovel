import type { TenantConfig } from '@/types';
import premiumConfig from './premium.json';
import modernoConfig from './moderno.json';

export const tenantRegistry: Record<string, TenantConfig> = {
  premium: premiumConfig as TenantConfig,
  moderno: modernoConfig as TenantConfig,
};

export const DEFAULT_TENANT = 'moderno';

export const tenantSlugs = Object.keys(tenantRegistry);
