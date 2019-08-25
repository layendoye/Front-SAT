import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utilisateur } from '../models/Utilisateur.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  jwtHelper = new JwtHelperService;
  constructor(private httpClient: HttpClient) { 
    
  }
  login(username:string,password:string){
    
    const data={
      username: username,
      password: password
    };
    return new Promise(
      (resolve, reject)=>{
      this.httpClient
        .post<any>('http://127.0.0.1:8000/connexion',data)
        .subscribe(
          (rep)=>{
            localStorage.setItem('token', rep.token);
            const tokenDeco=this.jwtHelper.decodeToken(rep.token);
            localStorage.setItem('username', tokenDeco.username);
            localStorage.setItem('roles', tokenDeco.roles);
            resolve();
          },
          (error)=>{
            console.log('Erreur d\'authentification : '+error.message);
             reject(error);
          }
        );
      })
  }
}
