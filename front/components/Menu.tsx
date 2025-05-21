// import { getSession, logout } from "@/utils/jwt";
import Link from "next/link";
// import { redirect } from "next/navigation";
// import { useEffect, useState } from "react";

export default function Menu() {
  //   const [isLogged, setIsLogged] = useState(false);

  //   const fetchSession = async () => {
  //     const session = await getSession();
  //     if (session) {
  //       setIsLogged(true);
  //     }
  //   };

  //   const handleLogout = async () => {
  //     await logout();
  //     setIsLogged(false);
  //     redirect("/");
  //   };

  //   useEffect(() => {
  //     fetchSession();
  //   }, []);

  return (
    <nav className="bg-white shadow-md py-4">
      <ul className="flex justify-center gap-8 items-center">
        <li>{/* <a href="/">Home</a> */}</li>
        <li className="text-black font-semibold hover:text-orange-500 transition-colors">
          <a href="/projects">Projects</a>
        </li>
        <li className="text-black font-semibold hover:text-orange-500 transition-colors">
          <a href="/contact">Contact</a>
        </li>
        <>
          <li className="text-black font-semibold hover:text-orange-500 transition-colors">
            <Link href="/login">Connexion</Link>
          </li>
          <li className="text-black font-semibold hover:text-orange-500 transition-colors">
            <Link href="/register">Inscription</Link>
          </li>
        </>
        <li className="text-white bg-orange-500 py-2 px-2 rounded-3xl font-semibold hover:bg-orange-600 transition-colors">
          <Link href="#">Déconnexion</Link>
        </li>

        {/* {isLogged ? (
          <li>
            <Link href="#" onClick={handleLogout}>
              Déconnexion
            </Link>
          </li>
        ) : (
          <>
            <li>
              <Link href="/login">Connexion</Link>
            </li>
            <li>
              <Link href="/register">Inscription</Link>
            </li>
          </>
        )} */}
      </ul>
    </nav>
  );
}
