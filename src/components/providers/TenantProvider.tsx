'use client';

import { TenantContext } from '@/context/TenantContext';
import type { TenantConfig } from '@/types';

interface TenantProviderProps {
  config: TenantConfig;
  children: React.ReactNode;
}

export function TenantProvider({ config, children }: TenantProviderProps) {
  return (
    <TenantContext.Provider value={config}>
      {children}
    </TenantContext.Provider>
  );
}
