export default function HomePresentation() {
    return (
        <div className="w-full relative flex justify-center">
           <div className="absolute z-0 w-full h-120 bg-gray-400 rounded-lg">
                <img src="/images/desktop.avif" alt="Logo TechFutura" className=" h-120 w-full object-cover"/>
           </div>
           <div className="flex flex-col relative gap-2 z-10 w-full h-120 justify-center items-center">
                <div className="flex flex-col relative z-10 justify-center items-center gap-2">
                        <h1 className="text-5xl text-white font-bold text-center mt-4 w-4/6 text-center">Lance ta carrière avec l&apos;académie TechFutura</h1>
                        <p className="text-center text-white text-gray-600 text-lg w-4/6 mt-2">Une formation informatique de pointe conçue pour vous préparer aux rôles les plus demandés du secteur technologique.</p>
                </div>
                <div className="flex gap-4 mt-4">
                    <button className="bg-black text-white text-lg px-6 py-2 rounded-lg hover:bg-gray-700 focus:outline-2"> <a href="#projects"> Explorer </a></button>
                    <button className="bg-orange-500 text-white text-lg px-6 py-2 rounded-lg hover:bg-orange-600 focus:outline-2"> <a href="#formulaire"> S&apos;inscrire</a> </button>
                </div>
           </div>
        </div>
    );
}