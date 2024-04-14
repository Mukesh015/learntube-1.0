import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UiProviders } from "@/components/providers";
import "react-toastify/dist/ReactToastify.css";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LearnTube",
  description: "All learning content is available here",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='dark'>
      <body className={inter.className}>
        <NextTopLoader />
        <UiProviders>
          {children}
        </UiProviders>
      </body>
    </html>
  );
}
