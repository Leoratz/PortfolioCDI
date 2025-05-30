
import React from "react";
import OneProgram from "./OneProgram";

import { listePrograms } from "@/types/types";

type ProgramsProps = {
    listPrograms: listePrograms[];
};


const Programs : React.FC<ProgramsProps> = ({listPrograms}) => {
    return (
        <div className=" bg-gray-100 py-6 flex flex-col gap-4 bg-white px-18">
            <div className=" flex flex-col justify-center items-center gap-1 py-4">
                <p className=" font-semibold text-sm text-center uppercase"> Nos programmes</p>
                <p className=" font-bold text-2xl text-center">Formation informatique de pointe </p>
                <p className=" font-normal text-md text-center text-gray-600 w-1/2">Choisissez parmi nos programmes spécialisés conçus pour répondre aux besoins de l’industrie technologique d’aujourd’hui. </p>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 w-full justify-center items-center">
                {listPrograms.map((program, index) => (
                    <OneProgram
                        key={index}
                        title={program.title}
                        description={program.description}
                        icon={program.icon}
                    />
                ))}
            </div>
        </div>
    );
};

export default Programs;