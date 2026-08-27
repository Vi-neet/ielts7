import type { Metadata } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque, Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { PaperTexture } from "@/components/ui/PaperTexture";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { AuthProvider } from "@/lib/AuthContext";
import OnboardingModal from "@/components/auth/OnboardingModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
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

        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} ${inter.variable} ${robotoMono.variable} antialiased`}
      >
        <AuthProvider>
          <OnboardingModal />
          <PaperTexture />
          <ScrollProgress />
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
