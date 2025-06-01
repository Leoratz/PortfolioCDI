import Image from "next/image";

export default function HomePresentation() {
    return (
        <div className="w-full relative flex justify-center">
           <div className="absolute z-0 w-full h-120 bg-gray-400 rounded-lg">
                <Image height={500} width={500} src="/images/desktop.avif" alt="Logo TechFutura" className=" h-120 w-full object-cover"/>
           </div>
           <div className="flex flex-col relative gap-2 z-10 w-full h-120 justify-center items-center">
                        <h1 className="text-5xl text-white font-bold mt-4 w-4/6 text-center">Lance ta carrière avec l&apos;académie TechFutura</h1>
                        <p className="text-center text-white text-lg w-4/6 mt-2">Une formation informatique de pointe conçue pour vous préparer aux rôles les plus demandés du secteur technologique.</p>
                
           </div>
        </div>
    );
}