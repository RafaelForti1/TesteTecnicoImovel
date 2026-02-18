import { NextRequest, NextResponse } from 'next/server';
import { tenantRegistry, DEFAULT_TENANT } from '@/config/tenants';
import { filterImoveisByTenant } from '@/lib/filter-imoveis';

export async function GET(request: NextRequest) {
  const tenant = request.nextUrl.searchParams.get('tenant') || DEFAULT_TENANT;
  const config = tenantRegistry[tenant];

  if (!config) {
    return NextResponse.json({ error: 'Tenant não encontrado' }, { status: 404 });
  }

  const imoveis = filterImoveisByTenant(config.allowedTags);

  return NextResponse.json({ imoveis, tenant: config.slug });
}
