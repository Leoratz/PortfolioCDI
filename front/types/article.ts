import { Category } from "./category";
import { User } from "./user";
 
export type Article = {
    id: number;
    title: string;
    content: string;
    category: Category;
    author: User;
};