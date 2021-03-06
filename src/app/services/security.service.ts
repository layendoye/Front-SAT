import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Profil } from '../models/Profil.model';
import Swal from 'node_modules/sweetalert2/dist/sweetalert2.js';
import { promise } from 'protractor';
import { resolve } from 'url';
import { reject } from 'q';
import { Utilisateur } from '../models/Utilisateur.model';
@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  jwtHelper = new JwtHelperService;
  private headers={headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))};
  private urlBack='http://127.0.0.1:8000';
  constructor(private httpClient: HttpClient) {
  }
  login(username:string,password:string){//ne pas factoriser
    
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
            console.log(rep)
            localStorage.setItem('token', rep.token);
            const tokenDeco=this.jwtHelper.decodeToken(rep.token);
            localStorage.setItem('username', tokenDeco.username);
            localStorage.setItem('roles', tokenDeco.roles);
            resolve();
          },
          (error)=>{
            console.log('Erreur d\'authentification : '+error.message);
            const message=error.message;
            if(message.search('403')>=0){
              Swal.fire(
                'Erreur',
                'Vous etes bloqué !',
                'error'
              )
            }
            reject(error);
          }
        );
      })
  }
  getProfil(){
     return new Promise<Profil[]>(
      (resolve, reject)=>{
      this.httpClient
        .get<any>(this.urlBack+'/profil',this.headers)
        .subscribe(
          (rep)=>{
            resolve(rep);
          },
          (error)=>{
            console.log('Erreur : '+error.message);
            reject(error);
          }
        );
      })
  }
  errerForm(rep:any){
    var err='';
    for(var i=0;i<rep.length;i++){
      var vrg='';
      if(i>0) vrg=', ';
      err+=vrg+rep[i].message;
    }
    Swal.fire(
      'Erreur',
      err,
      'error'
    )
  }
  addUser(formData:FormData){
    
    return new Promise<any>(
      (resolve,reject)=>{
      this.httpClient
        .post(this.urlBack+'/inscription',formData,this.headers).subscribe(
          rep=>{
          resolve(rep);
          },
          error=>{
            console.log('Erreur : '+error.message);
            reject(error);
          }
        );
      })
  }
  getUserConnecte(){
    return new Promise<any>(
      (resolve, reject)=>{
      this.httpClient
        .get<any>(this.urlBack+'/userConnecte',this.headers)
        .subscribe(
          (rep)=>{
            resolve(rep);
          },
          (error)=>{
            console.log('Erreur : '+error.message);
            reject(error);
          }
        );
      })
  }
}
