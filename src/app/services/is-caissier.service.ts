import { CanActivate} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IsCaissierService implements CanActivate{
    
    constructor(){

    }
    canActivate(): Observable<boolean> | Promise<boolean> | boolean {//il va return soit un  Observable qui sera de type boolean soit ...un observable est un objet qui emmet des infos dans le temps
        const roles:string=localStorage.getItem("roles");
        if(roles.search("ROLE_Caissier")>=0){
            return true;
        }
    }
}