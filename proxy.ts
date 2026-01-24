import { clerkMiddleware , createRouteMatcher , clerkClient } from '@clerk/nextjs/server';
import {  NextRequest, NextResponse } from 'next/server'; 


const isPublicRoute = createRouteMatcher([
    "/",
    "/api/webhook/register",
    "/sign-up(.*)",
    "/sign-in(.*)",
]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isProtectedRoute = createRouteMatcher(["/admin(.*)","/dashboard(.*)"]);

// export default clerkMiddleware()

export default clerkMiddleware(async (auth, req : NextRequest) => {
    const {  isAuthenticated ,  userId } = await auth()
    try {
        // Protect all non-public routes
        if (!isAuthenticated && !isPublicRoute(req)) {
            return NextResponse.redirect(
                new URL("/sign-in", req.url)
            );

        }

        if (userId) {
            const client = await clerkClient();
            const user = await client.users?.getUser(userId);
            const role = user.publicMetadata.role as string | undefined;
            if (isAdminRoute(req) && role !== "admin") {
                return NextResponse.redirect(new URL("/dashboard", req.url));
            }

            if (role === "admin" && req.nextUrl.pathname === "/dashboard") {
                return NextResponse.redirect(new URL("/admin/dashboard", req.url));
            }

            //redirect auth users to access public routes
            if (isPublicRoute(req) && (
                req.nextUrl.pathname.startsWith("/sign-in") ||
                req.nextUrl.pathname.startsWith("/sign-up")
            )) {
                const redirectUrl = role === "admin" ? "/admin/dashboard" : "/dashboard";
                return NextResponse.redirect(new URL(redirectUrl, req.url));
            }
        }
    
        return NextResponse.next();
    } catch (error) {
        console.error("Middleware error:", error);
        return NextResponse.redirect(new URL("/error", req.url));
    }
})

export const config = {
    matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    ],
};