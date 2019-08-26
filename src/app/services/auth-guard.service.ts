import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})//pour injecter un service dans un autre il faut utiliser le décorateur @Injectable()
export class AuthGuard implements CanActivate{
    
    constructor(private securityService: SecurityService,private router: Router){//grace à @Injectable()

    }
    canActivate(): Observable<boolean> | Promise<boolean> | boolean {//il va return soit un  Observable qui sera de type boolean soit ...un observable est un objet qui emmet des infos dans le temps
        if(localStorage.getItem('token')){
            return true;
        }
        // else{
        //     this.router.navigate(['/connexion']);
        // }
    }
}