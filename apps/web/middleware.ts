import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { userId, sessionClaims } = getAuth(req);
  if (userId && sessionClaims?.tenant_id) {
    req.headers.set("x-tenant-id", sessionClaims.tenant_id as string);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|.*..*).*)"],
};
