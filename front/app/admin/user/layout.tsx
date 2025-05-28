import type { Metadata } from "next";
 
export const metadata: Metadata = {
  title: "Liste des administrateurs",
  description: " Liste des administrateurs de la plateforme",
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