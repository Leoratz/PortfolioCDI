import type { Metadata } from "next";
 
export const metadata: Metadata = {
  title: "Liste des visiteurs",
  description: " Liste des visiteurs nous contactant via de la plateforme",
};
 
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      {children}
    </>
  );
}