import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IsSuperAdminService implements CanActivate{
    
    constructor(){

    }
    canActivate(): Observable<boolean> | Promise<boolean> | boolean {//il va return soit un  Observable qui sera de type boolean soit ...un observable est un objet qui emmet des infos dans le temps
        const roles:string=localStorage.getItem("roles");
        if(roles.search("ROLE_Super-admin")>=0){
            return true;
        }
    }
}
