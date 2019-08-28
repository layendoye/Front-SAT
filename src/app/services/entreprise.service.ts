import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Entreprise } from '../models/Entreprise.model';
import { Compte } from '../models/Compte.model';
import { Utilisateur } from '../models/Utilisateur.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { resolve, reject } from 'q';
import Swal from 'node_modules/sweetalert2/dist/sweetalert2.js';
@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {
  entrepriseSubject=new Subject<any[]>();//le subject emmettra la liste des entreprises lorsqu on lui demandera, <any[]> veut dire qu il va retourner un tableau de type any (string, int...)
  private entreprises: Entreprise[];
  
  userSubject=new Subject<any[]>();//le subject emmettra la liste des users lorsqu on lui demandera, <any[]> veut dire qu il va retourner un tableau de type any (string, int...)
  private users: Utilisateur[];

  private headers={headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))};
  private urlBack='http://127.0.0.1:8000';
  constructor(private httpClient: HttpClient) { }
  emitEntreprise(){
    this.entrepriseSubject.next(this.entreprises);//la methode next force le subject à emmetre ce qu on lui passe en argument (ici la liste des entreprises)
  }
  emitUser(){
    this.userSubject.next(this.users);//la methode next force le subject à emmetre ce qu on lui passe en argument (ici la liste des entreprises)
  }
  getEntreprise(){
    this.httpClient
      .get<any[]>(this.urlBack+'/entreprises/liste',this.headers)
      .subscribe(
        (response)=>{
          this.entreprises=response;
          this.emitEntreprise();
        },
        (error)=>{
          console.log('Erreur de chargement ! '+error.message);
        }
      );
  }
  getUsers(){
    return new Promise<any[]>(
      (resolve,reject)=>{
        this.httpClient.get<any[]>(this.urlBack+'/lister/users',this.headers).subscribe(
          rep=>{
            this.users=rep;
            this.emitUser();
            resolve(rep);
          },
          error=>{
            reject(error)
          }
        )
      }
    )
  }
  bloquer(id: number){
    return new Promise<any>(
      (resolve, reject)=>{
      this.httpClient
        .get<any>(this.urlBack+'/bloque/entreprises/'+id,this.headers)
        .subscribe(
          (rep)=>{
            this.emitEntreprise();
            resolve(rep);
          },
          (error)=>{
            console.log('Erreur : '+error.message);
            alert('Impossible de bloquer ce partenaire !');
            reject(error);
          }
        );
      })
  }
  bloquerUser(id: number){
    return new Promise<any>(
      (resolve, reject)=>{
      this.httpClient
        .get<any>(this.urlBack+'/bloque/user/'+id,this.headers)
        .subscribe(
          (rep)=>{
            this.emitUser();
            resolve(rep);
          },
          (error)=>{
            console.log('Erreur : '+error.message);
            reject(error);
          }
        );
      })
  }
  addEntreprise(entreprise: Entreprise,user:Utilisateur){
    const data={
      raisonSociale:entreprise.raisonSociale,
      ninea:entreprise.ninea,
      adresse:entreprise.adresse,
      emailEntreprise:entreprise.emailEntreprise,
      telephoneEntreprise:entreprise.telephoneEntreprise,
      nom:user.nom,
      username:user.username,
      password:user.password,
      confirmPassword:user.confirmPassword,
      email:user.email,
      telephone:user.telephone,
      nci:user.nci
    }
    return this.httpClient
      .post<any>(this.urlBack+'/partenaires/add',data,this.headers)
  }
  updateEntreprise(entreprise: Entreprise){
    const id=entreprise.id;
    const data={
      raisonSociale:entreprise.raisonSociale,
      ninea:entreprise.ninea,
      adresse:entreprise.adresse,
      emailEntreprise:entreprise.emailEntreprise,
      telephoneEntreprise:entreprise.telephoneEntreprise
    }
    return this.httpClient
      .post<any>(this.urlBack+'/partenaires/update/'+id,data,this.headers)
  }
  updateUser(user: Utilisateur,id:number){
    const data={
      username:user.username,
      nom:user.nom,
      email:user.email,
      telephone:user.telephone,
      nci:user.nci,
      image:'',
      profil:user.profil
    }
    console.log(data);
    return this.httpClient
      .post<any>(this.urlBack+'/user/update/'+id,data,this.headers)
  }
  recupEntreprise(id:number){
    return new Promise<any>(
      (resolve,reject)=>{
      this.httpClient
        .get<Entreprise>(this.urlBack+'/entreprise/'+id,this.headers).subscribe(
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
  recupUser(id:number){
    return new Promise<Utilisateur>(
      (resolve,reject)=>{
      this.httpClient
        .get<Utilisateur>(this.urlBack+'/user/'+id,this.headers).subscribe(
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
  depot(numeroCompte:string,montant:number){
    const data={
      compte:numeroCompte,
      montant:montant
    }
    return new Promise<any>(
      (resolve,reject)=>{
      this.httpClient
        .post<any>(this.urlBack+'/nouveau/depot',data,this.headers).subscribe(
          rep=>{
          resolve(rep);
          },
          error=>{
            console.log('Erreur : '+error.message);
            reject(error);
          }
        );
      })
    //return this.postElement(data,'/nouveau/depot');
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
  getCompte(){
    return new Promise<Compte[]>(
      (resolve,reject)=>{
      this.httpClient
        .get<Compte[]>(this.urlBack+'/MesComptes',this.headers).subscribe(
          rep=>{
            resolve(rep);
          },
          error=>{
            console.log('Erreur : '+error.message);
            reject(error);
          }
        );
      })
    //this.getElement('/MesComptes');
  }
  postElement(data:any,url:string){//return une promise
    return new Promise<any[]>(
      (resolve,reject)=>{
      this.httpClient
        .post<any[]>(this.urlBack+url,data,this.headers).subscribe(
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
  getElement(url:string){
    return new Promise<any>(
      (resolve,reject)=>{
      this.httpClient
        .get<any>(this.urlBack+url,this.headers).subscribe(
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
  affecterCompt(data:any){
    return new Promise<any>(
      (resolve,reject)=>{
      this.httpClient
        .post<any>(this.urlBack+'/changer/compte',data,this.headers).subscribe(
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
  getCompteActuel(id:number){
    return this.getElement('/compte/user/'+id);
  }
  getComptesUser(id:number){
    return this.getElement('/comptes/affecte/user/'+id);
  }
}
