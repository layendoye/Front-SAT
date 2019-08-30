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
            console.log(rep)
            localStorage.setItem('token', rep.token);
            const tokenDeco=this.jwtHelper.decodeToken(rep.token);
            localStorage.setItem('username', tokenDeco.username);
            localStorage.setItem('roles', tokenDeco.roles);
            console.log(this.headers)            
            resolve();
          },
          (error)=>{
            console.log('Erreur d\'authentification : '+error.message);
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
  addUser(user:Utilisateur){
    const formData:FormData=new FormData();
    formData.append('image',user.imageFile,user.image)
    formData.append('nom',user.nom)
    formData.append('username',user.username)
    formData.append('password',user.password)
    formData.append('email',user.email)
    formData.append('telephone',user.telephone)
    formData.append('nci',user.nci)
    formData.append('confirmPassword',user.confirmPassword)
    formData.append('profil',user.profil)
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
  
}
