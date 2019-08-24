import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utilisateur } from '../models/Utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  
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
