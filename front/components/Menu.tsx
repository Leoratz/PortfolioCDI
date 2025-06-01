"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function Menu() {
  const { isLogged, logoutUser } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <nav className="bg-white shadow-md py-4" aria-label="Menu principal">
      {/* Hamburger for mobile */}
      <div className="flex justify-between items-center px-4 sm:px-8 md:px-16 lg:px-32">
        <button
          className="sm:hidden flex flex-col justify-center items-center"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          aria-controls="main-menu"
          onClick={() => setOpen(!open)}
        >
          <span
            className={`block w-6 h-0.5 bg-black mb-1 transition-all ${
              open ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-black mb-1 transition-all ${
              open ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-black transition-all ${
              open ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
      </div>
      {/* Menu ordi */}
      <ul
        id="main-menu"
        className={`
          flex-col sm:flex-row flex justify-center gap-8 items-center
          ${open ? "flex" : "hidden"} sm:flex
          bg-white sm:bg-transparent w-full sm:w-auto py-4 sm:py-0
          transition-all
        `}
        role="menubar"
      >
        <li role="none">
          <Link
            href="/"
            className="text-black font-semibold hover:text-orange-500 transition-colors"
            role="menuitem"
            tabIndex={0}
            aria-label="Accueil"
            onClick={() => setOpen(false)}
          >
            Accueil
          </Link>
        </li>

        {!isLogged && (
          <li role="none">
            <Link
              href="/login"
              className="text-white bg-orange-500 py-2 px-4 rounded-3xl font-semibold hover:bg-white focus:bg-white hover:text-orange-500 focus:text-orange-500 transition-colors duration-200 cursor-pointer border border-orange-500 text-white"
              role="menuitem"
              tabIndex={0}
              aria-label="Connexion"
              onClick={() => setOpen(false)}
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
                onClick={() => setOpen(false)}
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
                className="text-white bg-orange-500 py-2 px-4 rounded-3xl font-semibold hover:bg-white focus:bg-white hover:text-orange-500 focus:text-orange-500 transition-colors duration-200 cursor-pointer border border-orange-500 text-white"
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
