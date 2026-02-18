import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const VALID_TENANTS = ['premium', 'moderno'] as const;
type ValidTenant = (typeof VALID_TENANTS)[number];
const DEFAULT_TENANT: ValidTenant = 'moderno';

function isValidTenant(value: string | null | undefined): value is ValidTenant {
  return VALID_TENANTS.includes(value as ValidTenant);
}

export function middleware(request: NextRequest) {
  const { searchParams, pathname } = request.nextUrl;
  const response = NextResponse.next();

  // Priority 1: Query parameter ?tenant=xxx
  const queryTenant = searchParams.get('tenant');
  if (isValidTenant(queryTenant)) {
    response.headers.set('x-tenant-slug', queryTenant);
    response.cookies.set('tenant', queryTenant, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
      sameSite: 'lax',
    });
    return response;
  }

  // Priority 2: Path prefix /premium or /moderno for shorter links
  const pathMatch = pathname.match(/^\/(premium|moderno)(\/.*)?$/);
  if (pathMatch) {
    const shortTenant = pathMatch[1] as ValidTenant;
    const restPath = pathMatch[2] || '/';
    const url = request.nextUrl.clone();
    url.pathname = restPath;
    const rewrite = NextResponse.rewrite(url);
    rewrite.headers.set('x-tenant-slug', shortTenant);
    rewrite.cookies.set('tenant', shortTenant, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
      sameSite: 'lax',
    });
    return rewrite;
  }

  // Priority 3: Subdomain detection (e.g., premium.localhost:3000)
  const hostname = request.headers.get('host') || '';
  const subdomain = hostname.split('.')[0];
  if (isValidTenant(subdomain)) {
    response.headers.set('x-tenant-slug', subdomain);
    response.cookies.set('tenant', subdomain, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
      sameSite: 'lax',
    });
    return response;
  }

  // Priority 4: Existing cookie
  const cookieTenant = request.cookies.get('tenant')?.value;
  if (isValidTenant(cookieTenant)) {
    response.headers.set('x-tenant-slug', cookieTenant);
    return response;
  }

  // Fallback: default tenant
  response.headers.set('x-tenant-slug', DEFAULT_TENANT);
  response.cookies.set('tenant', DEFAULT_TENANT, {
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    sameSite: 'lax',
  });
  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|fonts).*)'],
};
