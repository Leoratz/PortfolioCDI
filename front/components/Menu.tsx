import Link from "next/link";

export default function Menu() {
  return (
    <nav
      className="bg-white shadow-md py-4"
      aria-label="Menu principal"
    >
      <ul className="flex justify-center gap-8 items-center" role="menubar">
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
        <li role="none">
          <Link
            href="/projects"
            className="text-black font-semibold hover:text-orange-500 transition-colors"
            role="menuitem"
            tabIndex={0}
            aria-label="Projets"
          >
            Projects
          </Link>
        </li>
        <li role="none">
          <Link
            href="/contact"
            className="text-black font-semibold hover:text-orange-500 transition-colors"
            role="menuitem"
            tabIndex={0}
            aria-label="Contact"
          >
            Contact
          </Link>
        </li>
        <li role="none">
          <Link
            href="/login"
            className="text-black font-semibold hover:text-orange-500 transition-colors"
            role="menuitem"
            tabIndex={0}
            aria-label="Connexion"
          >
            Connexion
          </Link>
        </li>
        <li role="none">
          <Link
            href="/register"
            className="text-black font-semibold hover:text-orange-500 transition-colors"
            role="menuitem"
            tabIndex={0}
            aria-label="Inscription"
          >
            Inscription
          </Link>
        </li>
        <li role="none">
          <Link
            href="#"
            className="text-white bg-orange-500 py-2 px-4 rounded-3xl font-semibold hover:bg-orange-600 transition-colors"
            role="menuitem"
            tabIndex={0}
            aria-label="Déconnexion"
          >
            Déconnexion
          </Link>
        </li>
      </ul>
    </nav>
  );
}