import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  
  constructor(private httpClient: HttpClient) { 
    
  }
  login(username:string,password:string){
    var ObjetToken;
    const data={
      username: username,
      password: password
    };
    return new Promise(
      (resolve, reject)=>{
      this.httpClient
        .post('http://127.0.0.1:8000/connexion',data)
        .subscribe(
          (rep)=>{
            ObjetToken=rep;
            localStorage.setItem('token', ObjetToken.token);
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
