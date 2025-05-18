import { withClerkMiddleware, getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function middleware(req: NextRequest) {
  const { userId, sessionClaims } = getAuth(req);
  if (userId && sessionClaims?.tenant_id) {
    req.headers.set('x-tenant-id', sessionClaims.tenant_id as string);
  }
  return NextResponse.next();
}

export default withClerkMiddleware(middleware);

export const config = {
  matcher: ['/((?!_next|.*\..*).*)'],
};
