export class Entreprise{
    constructor(public raisonSociale:string, 
                public ninea:string, 
                public adresse:string,
                public telephoneEntreprise:string, 
                public emailEntreprise:string,
                public id?:number,
                public status?:string, 
                public soldeGlobal?:number
                ){}
}