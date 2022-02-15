export interface ICollection {
    id: number;
    image: string;
    name: string;
    description: string;
    productArr: number[];
    hasSubCollection :boolean;
    subCollection: number[] | null;
}
export interface ISubCollection {
    id: number;
    image: string;
    name: string;
    description: string;
    productArr: number[];
}