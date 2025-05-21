import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import Menu from "@/components/Menu";
 
export const metadata: Metadata = {
  title: "Portfolio",
  description: "Découvrez la filière de coding & digital innovation",
};
 
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <header>
          <Menu />
        </header>
        <main> 
         {children}
        </main>
       <Footer />
      </body>
    </html>
  );
}