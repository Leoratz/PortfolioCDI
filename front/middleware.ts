import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "@/utils/jwt";

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("token");
    const session = await getSession()

    if (token && session && request.nextUrl.pathname === "/login") {
        return NextResponse.redirect(new URL("/", request.url)); 
    }

    if((!session || !token ) && request.nextUrl.pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/login"], 
};