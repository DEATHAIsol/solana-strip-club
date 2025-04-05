import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import ClientLayout from "@/components/ClientLayout";
import AgeVerification from "@/components/AgeVerification";
import { Toaster } from 'react-hot-toast';
import WalletContextProvider from '@/components/WalletContextProvider';
import dynamic from 'next/dynamic';

const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false });

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Solana Strip Club",
  description: "Live streaming platform on Solana",
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover',
  themeColor: '#ec4899', // pink-500
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Solana Strip Club',
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#ec4899" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <CustomCursor />
        <WalletContextProvider>
          <ClientLayout>
            <AgeVerification />
            {children}
            <Toaster
              position="bottom-center"
              toastOptions={{
                className: 'bg-black/80 text-white backdrop-blur-sm',
                style: {
                  background: 'rgba(0, 0, 0, 0.8)',
                  color: '#fff',
                  padding: '12px 16px',
                  fontSize: '14px',
                  borderRadius: '12px',
                  maxWidth: '90vw',
                  wordBreak: 'break-word',
                },
              }}
            />
          </ClientLayout>
        </WalletContextProvider>
      </body>
    </html>
  );
}
