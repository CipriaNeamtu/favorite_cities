import type { Metadata } from "next";
import "reflect-metadata"
import { Provider } from "@/components/ui/provider"
import Nav from "./components/Nav";
import { SessionProvider } from "next-auth/react"
import { AuthProvider } from "@/app/context/Auth";
import Script from 'next/script';  // Importă componenta Script
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Favorite Cities",
  description: "Generated by CN",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <head>
        <link rel="stylesheet" href="https://api.windy.com/assets/map-forecast/libBoot.js" />
      </head> */}
      
      <body>
        <Provider>
          <SessionProvider>
            <AuthProvider >
              <Nav />
              {children}
              <Footer />
            </AuthProvider>
          </SessionProvider>
        </Provider>
        <Script
          src="https://unpkg.com/leaflet@1.4.0/dist/leaflet.js"
          strategy="beforeInteractive" // Încarcă scriptul înainte de a interacționa cu aplicația
        />
        <Script
          src="https://api.windy.com/assets/map-forecast/libBoot.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
