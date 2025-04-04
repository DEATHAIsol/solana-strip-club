import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import ClientLayout from "@/components/ClientLayout";
import AgeVerification from "@/components/AgeVerification";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Solana Strip Club",
  description: "The first virtual strip club on Solana",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>
          <AgeVerification />
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
