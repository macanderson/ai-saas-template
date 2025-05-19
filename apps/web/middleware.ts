import { authMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define the shape of our custom claims
interface CustomClaims {
  metadata: {
    role?: string;
    tenant_id?: string;
  };
}

export default authMiddleware({
  publicRoutes: ["/"],
  afterAuth(auth, req) {
    // If the user is trying to access /super and is not a super admin, redirect them
    if (req.nextUrl.pathname === "/super") {
      const metadata = (auth.sessionClaims as CustomClaims)?.metadata;
      const isSuper = metadata?.role === "super";
      if (!auth.userId || !isSuper) {
        const homeUrl = new URL("/", req.url);
        return NextResponse.redirect(homeUrl);
      }
    }

    if (auth.userId && auth.sessionClaims?.tenant_id) {
      const headers = new Headers(req.headers);
      headers.set("x-tenant-id", auth.sessionClaims.tenant_id as string);
      return NextResponse.next({ request: { headers } });
    }
    
    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
