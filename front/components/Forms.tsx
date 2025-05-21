export default function Forms() {   
    return (
        // La div qui reprend le formulaire de contact
        <div className="w-full bg-white flex flex-col gap-6 p-2 "> 
            {/* La div qui reprend le titre et le sous-titre */}
            <div className=" flex flex-col justify-center items-center gap-1 py-10">
                <p className=" font-semibold text-sm text-center uppercase"> Contactez-nous</p>
                <p className=" font-bold text-2xl text-center">Prêt à rejoindre l&apos;aventure ? </p>
                <p className=" font-normal text-md text-center text-gray-600 w-1/2">Laisser un message à notre admission pour en savoir plus sur notre programme et le processus d&apos;admission </p>
            </div>
          {/* La div qui reprend les contacts de l'école et le formulaire de contact */}
            <div className=" grid grid-cols-2 w-full justify-center px-26 ">
                {/* La div qui reprend les contacts de l'école */}
                <div className=" w-full flex flex-col  gap-2"> 
                    <h2 className="font-bold pb-4">Contactez-nous ! </h2>
                    <div className="flex gap-2 items-center content-center"> 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                        </svg> 
                        <span className="text-sm">admission@imm.fr</span>
                    </div>
                    <div className="flex gap-2 items-center content-center"> 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                        </svg>
                        <span className="text-sm">+33 1 23 45 67 89</span>
                    </div>
                    <div className="flex gap-2 items-center content-center"> 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>

                        <span className="text-sm">admission@imm.fr</span>
                    </div>
                    
                </div>
                {/* La div du formulaire de contact */}
                <div className="w-full flex flex-col justify-center  ">
                    <h2 className="font-bold pb-4">Envoyez nous un message</h2>
                    <form className=" flex flex-col gap-2" action="/api/contact" method="POST">
                        <label htmlFor="name">Nom :</label>
                        <input className="shadow shadow-(box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;) p-2 rounded" placeholder="Votre nom" type="text" id="name" name="name" required />
                        <label htmlFor="email">Email :</label>
                        <input className="shadow shadow-(box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;) p-2 rounded" placeholder="Votre email" type="email" id="email" name="email" required />
                        <label htmlFor="message">Message :</label>
                        <textarea className="shadow shadow-(box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;) p-2 rounded" placeholder="Votre message" id="message" name="message" required></textarea>
                        <button className=" bg-orange-500 text-white p-2 rounded w-fit mt-4" type="submit">Envoyer</button>
                    </form>
                </div>
            </div>
        </div>
        
    );
}