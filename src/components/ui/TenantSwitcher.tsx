'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useCallback } from 'react';
import { useTenant } from '@/hooks/useTenant';
import { tenantSlugs } from '@/config/tenants';

const tenantLabels: Record<string, { name: string; color: string }> = {
  premium: { name: 'Premium', color: '#B8860B' },
  moderno: { name: 'Moderno', color: '#2563EB' },
};

export function TenantSwitcher() {
  const config = useTenant();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const handleSwitch = useCallback(
    (slug: string) => {
      if (slug === config.slug) return;
      setIsOpen(false);
      
      // Navigate immediately without ink transition
      window.location.href = `${pathname}?tenant=${slug}`;
    },
    [config.slug, pathname],
  );

  return (
    <>
      {/* Ink transitions removed */}

      {/* Switcher button */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute bottom-16 right-0 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden min-w-[200px]"
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
            >
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Trocar Tenant
                </p>
              </div>
              {tenantSlugs.map((slug) => {
                const info = tenantLabels[slug];
                const isActive = slug === config.slug;
                return (
                  <button
                    key={slug}
                    onClick={() => handleSwitch(slug)}
                    className={[
                      'w-full flex items-center gap-3 px-4 py-3 text-left transition-colors',
                      isActive
                        ? 'bg-gray-50 cursor-default'
                        : 'hover:bg-gray-50 cursor-pointer',
                    ].join(' ')}
                  >
                    <span
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: info?.color }}
                    />
                    <span className="text-sm font-medium text-gray-900">
                      {info?.name ?? slug}
                    </span>
                    {isActive && (
                      <span className="ml-auto text-xs text-gray-400">Ativo</span>
                    )}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-white text-gray-800 px-4 py-3 rounded-full shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: tenantLabels[config.slug]?.color }}
          />
          <span className="text-sm font-medium">
            {tenantLabels[config.slug]?.name}
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.button>
      </div>
    </>
  );
}
