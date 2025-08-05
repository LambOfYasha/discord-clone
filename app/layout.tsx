import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { ModalProvider } from "@/components/providers/modal-provider";
import { SocketProvider } from "@/components/providers/socket-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { Inter } from "next/font/google";
import { ImageErrorDebugger } from "@/components/debug/image-error-debugger";

// Load Inter font with error handling
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  title: "Discord Clone",
  description: "Discord Clone written in TypeScript with Next.js 15",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <meta name="apple-mobile-web-app-title" content="Discord Clone" />
          <meta
            name="google-site-verification"
            content="aHfl2qQoUMINMiWMdSU3y2XatWuB3RECA5xw8tafs18"
          />
          {/* Fallback font loading */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        </head>
        <body
          className={cn(
            "antialiased",
            "dark:bg-[#313338] bg-white",
            inter.className
          )}
          style={{
            fontFamily: inter.style.fontFamily,
          }}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
            storageKey="discord-theme"
          >
            <SocketProvider>
              <ModalProvider />
              <QueryProvider>
                {children}
                {process.env.NODE_ENV === 'development' && (
                  <ImageErrorDebugger />
                )}
              </QueryProvider>
            </SocketProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
