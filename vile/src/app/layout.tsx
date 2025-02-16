import type { Metadata } from 'next'
import { Inter, Manrope } from 'next/font/google'
import './globals.css'
import { ClerkProvider} from "@clerk/nextjs"
import { ThemeProvider } from '@/components/theme'
import Script from 'next/script'
import { Toaster } from '@/components/ui/toaster'
import ReactQueryProvider from '@/react-query'

const manrope = Manrope({
subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "AIVid Pro - Revolutionary AI Video Collaboration",
  description:
    "Experience the future of video creation and collaboration with advanced AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-[#000000] text-white min-h-screen font-mono">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            <ReactQueryProvider>
              {children}
              <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" />
            </ReactQueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
