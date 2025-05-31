"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Menu() {
  const { isLogged, logoutUser } = useAuth();
  
  const handleLogout = async () => {
    await logoutUser();
  }

  return (
    <nav
      className="bg-white shadow-md py-4"
      aria-label="Menu principal"
    >
      <ul
        className="flex justify-center gap-8 items-center"
        role="menubar"
      >
        <li role="none">
          <Link
            href="/"
            className="text-black font-semibold hover:text-orange-500 transition-colors"
            role="menuitem"
            tabIndex={0}
            aria-label="Accueil"
          >
            Accueil
          </Link>
        </li>

        {!isLogged && (
          <li role="none">
            <Link
              href="/login"
              className="text-white bg-orange-500 py-2 px-4 rounded-3xl font-semibold hover:bg-orange-600 transition-colors"
              role="menuitem"
              tabIndex={0}
              aria-label="Connexion"
            >
              Connexion
            </Link>
          </li>
        )}

        {isLogged && (
          <>
            <li role="none">
              <Link
                href="/admin/user"
                className="text-black font-semibold hover:text-orange-500 transition-colors"
                role="menuitem"
                tabIndex={0}
                aria-label="Utilisateurs"
              >
                Utilisateurs
              </Link>
            </li>
            <li role="none">
              <Link
                href="/admin/guest"
                className="text-black font-semibold hover:text-orange-500 transition-colors"
                role="menuitem"
                tabIndex={0}
                aria-label="Demandes de contact"
              >
                Demande de contacts
              </Link>
            </li>
            <li role="none">
              <button
                onClick={handleLogout}
                className="text-white bg-orange-500 py-2 px-4 rounded-3xl font-semibold hover:bg-orange-600 transition-colors"
                role="menuitem"
                tabIndex={0}
                aria-label="Déconnexion"
              >
                Déconnexion
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
