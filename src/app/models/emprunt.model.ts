export interface Emprunt{
    id:number;
    livreId:number;
    lecteurId:number;
    dateEmprunt:string;
    dateLimite: string;
    dateRetour:string | null;
    
}