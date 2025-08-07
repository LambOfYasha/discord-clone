import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { ModalProvider } from "@/components/providers/modal-provider";
import { SocketProvider } from "@/components/providers/socket-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { ImageErrorDebugger } from "@/components/debug/image-error-debugger";

// Use local font instead of Google Fonts to avoid Turbopack issues
const inter = {
  className: "font-sans",
  style: {
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  },
};

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
          {/* Font configuration handled by CSS */}
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
