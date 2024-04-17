import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UiProviders } from "@/components/providers";
import "react-toastify/dist/ReactToastify.css";
import NextTopLoader from "nextjs-toploader";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
const inter = Inter({ subsets: ["latin"] });

const client = new ApolloClient({

  uri: 'http://localhost:9063/graphql',

  cache: new InMemoryCache(),

});

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
        <ApolloProvider client={client}>
        <UiProviders>
          {children}
        </UiProviders>
        </ApolloProvider>
      </body>
    </html>
  );
}
