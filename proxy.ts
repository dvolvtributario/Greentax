import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_ADMIN, sessaoValida } from "@/lib/admin-auth";


export function proxy(request: NextRequest) {
  const autenticado = sessaoValida(
    request.cookies.get(COOKIE_ADMIN)?.value,
  );
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    if (autenticado) {
      return NextResponse.redirect(new URL("/admin", request.url), 303);
    }
    return NextResponse.next();
  }

  if (!autenticado) {
    return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
