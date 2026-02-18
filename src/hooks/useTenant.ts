'use client';

import { useContext } from 'react';
import { TenantContext } from '@/context/TenantContext';
import type { TenantConfig } from '@/types';

export function useTenant(): TenantConfig {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
}
