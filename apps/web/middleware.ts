import { authMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default authMiddleware({
  afterAuth(auth, req) {
    if (auth.userId && auth.sessionClaims?.tenant_id) {
      const headers = new Headers(req.headers);
      headers.set("x-tenant-id", auth.sessionClaims.tenant_id as string);
      return NextResponse.next({ request: { headers } });
    }
    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!_next|.*..*).*)"],
};
