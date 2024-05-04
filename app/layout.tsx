import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UiProviders } from "@/components/providers";
import { DarkModeProvider } from "@/components/hooks/theme";
import "react-toastify/dist/ReactToastify.css";
import NextTopLoader from "nextjs-toploader";
import { ApolloWrapper } from "@/configurations/apollo/client"
import { StoreProvider } from "@/configurations/redux/storeProvider"
import "react-toastify/dist/ReactToastify.css";
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
        <DarkModeProvider>
          <NextTopLoader />
          <StoreProvider>
            <ApolloWrapper>
              <UiProviders>
                {children}
              </UiProviders>
            </ApolloWrapper>
          </StoreProvider>
        </DarkModeProvider>
      </body>
    </html>
  );
}
