export default function Footer() {
  return (
    <footer className="bg-orange-100 text-gray-700 px-6 py-10 sm:px-10 md:px-20 mt-10">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-orange-500">IMM</h2>
          <p className="text-sm">
            Formons les innovateurs de demain grâce à une pédagogie orientée projet, humaine et audacieuse.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg text-orange-500">Liens utiles</h3>
          <ul className="flex flex-col gap-1 text-sm">
            <li><a href="https://www.iim.fr/admissions/?utm_source=google&utm_medium=display&utm_campaign=iim&utm_term=&utm_campaign=_IIM_+Paris+Display_Generique&utm_source=adwords&utm_medium=ppc&hsa_acc=1727540537&hsa_cam=22429152908&hsa_grp=&hsa_ad=&hsa_src=x&hsa_tgt=&hsa_kw=&hsa_mt=&hsa_net=adwords&hsa_ver=3&gad_source=1&gad_campaignid=22432688299&gbraid=0AAAAAD5oc_VieiF7fAg7nu_63IGy8VBbT&gclid=Cj0KCQjwotDBBhCQARIsAG5pinP557ycuSIePGjy5ySkF3DCW3GMutq-8oQ4FXV2SXg7WjjvsWalVnQaAj5CEALw_wcB" className="hover:underline">Admission</a></li>
            <li><a href="https://www.iim.fr/cursus/" className="hover:underline">Programme</a></li>
            <li><a href="https://www.iim.fr/la-grande-ecole-du-numerique/presentation/" className="hover:underline">L&apos;équipe pédagogique</a></li>
            <li><a href="https://www.iim.fr/contact-iim/" className="hover:underline">Contact</a></li>
          </ul>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-lg text-orange-500">Contact</h3>
          <p className="text-sm">admission@imm.fr</p>
          <p className="text-sm">+33 1 23 45 67 89</p>
          <div className="flex gap-4 mt-2">
            <a href="https://www.linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <svg className="w-5 h-5 text-orange-500 hover:text-orange-600 transition" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761..."></path>
              </svg>
            </a>
            <a href="https://www.instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <svg className="w-5 h-5 text-orange-500 hover:text-orange-600 transition" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0..."></path>
              </svg>
            </a>
            {/* Ajoute d'autres icônes si besoin */}
          </div>
        </div>
      </div>

      {/* Bas de page */}
      <div className="mt-10 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} IMM. Tous droits réservés.
      </div>
    </footer>
  );
}
