import type { Metadata } from "next";
import "./globals.css";
 
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
        {children}
      </body>
    </html>
  );
}