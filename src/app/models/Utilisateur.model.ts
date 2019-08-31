export class Utilisateur{
    constructor(public nom:string,
                public username:string,
                public password:string,
                public email:string,
                public telephone:string,
                public nci:string,
                public confirmPassword?:string,
                public profil?:string,
                public image?:any,
                public id?:number,
                public roles?:any
                ){}
}