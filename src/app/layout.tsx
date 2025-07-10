import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IELTS 7+ House - Your Path to IELTS Success",
  description: "Practice materials and resources to help you achieve your target IELTS scores",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics - Must be immediately after <head> */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-RVMMCZDLS0"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-RVMMCZDLS0');
            `,
          }}
        />
        {/* Client-side fallback for Android 8 detection */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Only run if middleware didn't catch it (fallback)
                  if (typeof window !== 'undefined' && navigator.userAgent) {
                    var ua = navigator.userAgent;
                    console.log('Client-side UA check:', ua);
                    
                    // Multiple patterns for better Android 8 detection
                    var patterns = [
                      /Android\\s+8/i,
                      /Android[\\s\\/]8/i,
                      /;\\s*wv\\).*Android\\s+8/i
                    ];
                    
                    for (var i = 0; i < patterns.length; i++) {
                      if (patterns[i].test(ua)) {
                        console.log('Client-side Android 8 detected, redirecting...');
                        window.location.replace('https://i7-pink.vercel.app/');
                        return;
                      }
                    }
                  }
                } catch (e) {
                  console.error('Client-side detection error:', e);
                }
              })();
            `,
          }}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
