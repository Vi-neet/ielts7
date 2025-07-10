import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  try {
    // Get user agent from request headers
    const userAgent = request.headers.get("user-agent") || "";

    // Check if it's Android using multiple patterns for better coverage
    const isAndroid = /android/i.test(userAgent);

    if (isAndroid) {
      // Multiple regex patterns to catch different Android version formats
      const androidPatterns = [
        /Android\s+(\d+)(?:\.(\d+))?/i, // Standard: Android 8.0
        /Android[\s\/](\d+)/i, // Alternative: Android/8
        /;\s*wv\).*Android\s+(\d+)/i, // WebView: ; wv) Android 8
      ];

      let majorVersion = null;

      for (const pattern of androidPatterns) {
        const match = userAgent.match(pattern);
        if (match && match[1]) {
          majorVersion = parseInt(match[1], 10);
          console.log("Android version detected:", majorVersion);
          break;
        }
      }

      // Check if it's Android 8
      if (majorVersion === 8) {
        console.log("Android 8 detected, redirecting...");
        // Create redirect response with proper status
        return NextResponse.redirect(
          new URL("https://i7-pink.vercel.app/", request.url),
          307
        );
      }
    }

    // Continue with the request if not Android 8
    return NextResponse.next();
  } catch (error) {
    // Fallback: if middleware fails, continue with request
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
}

// Configure which paths the middleware should run on
export const config = {
  // Run on all paths except static files and API routes
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
