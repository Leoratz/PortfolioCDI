import type { Metadata } from "next";
 
export const metadata: Metadata = {
  title: "Connexion",
  description: "Connexion à notre blog",
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