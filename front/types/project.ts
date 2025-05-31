import { Media } from "./media";
import { Student } from "./student";
 
export type Project = {
    id: number;
    title: string;
    details: string;
    year: number;
    stack: string[];
    link: string;
    visibility: boolean;
    students: Student[];
    medias? : Media[];
};
