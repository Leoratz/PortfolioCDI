
import { listePrograms } from '@/types/types';

export default function OneProgram({title, description, icon}: listePrograms) {  
    return (
        <div className="flex p-3 gap-4 bg-white justify-center rounded-lg m-2 h-auto hover:scale-105 transition-transform duration-300">
            {/* La div qui reprend l'icône */}
            <div className='flex justify-center '>
                <span className='text-3xl text-white bg-black p-2 rounded w-12 h-12 flex justify-center items-center'>
                    {icon}
               </span>
            </div>
            {/* La div qui reprend le titre et le sous-titre */}
            <div className=" flex-1 flex flex-col  gap-1">
                <h2 className="font-bold">{title}</h2>
                <p className="text-gray-600 w-4/6">{description}</p>    
            </div>
        </div>
    );
}