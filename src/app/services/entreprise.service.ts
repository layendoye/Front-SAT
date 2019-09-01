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
  addEntreprise(data:any,imageFile:File){
    const formData:FormData=new FormData();
    formData.append('raisonSociale',data.raisonSociale)
    formData.append('ninea',data.ninea)
    formData.append('adresse',data.adresse)
    formData.append('emailEntreprise',data.emailEntreprise)
    formData.append('telephoneEntreprise',data.telephoneEntreprise)
    formData.append('nom',data.nom)
    formData.append('username',data.username)
    formData.append('password',data.password)
    formData.append('confirmPassword',data.confirmPassword)
    formData.append('email',data.email)
    formData.append('telephone',data.telephone)
    formData.append('nci',data.nci)
    formData.append('image',imageFile,data.image)
    return this.httpClient
      .post<any>(this.urlBack+'/partenaires/add',formData,this.headers)
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
  updateUser(formData:FormData,id:number){
    return this.httpClient
      .post<any>(this.urlBack+'/user/update/'+id,formData,this.headers)
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
  getComptesEntreprise(id:number){
    return this.getElements('/compte/entreprise/'+id);
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
  getElements(url:string){
    return new Promise<any[]>(
      (resolve,reject)=>{
      this.httpClient
        .get<any[]>(this.urlBack+url,this.headers).subscribe(
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
  addCompte(id:number){
    return this.getElement('/nouveau/compte/'+id);
  }
  getDepotCaissierCompte(numeroCompte:string){
    const data={
      numeroCompte:numeroCompte
    }
    return this.postElement(data,"/compte/Mesdepots")
  }
  getUneEntreprise(id:number){
    return this.getElement('/entreprise/'+id);
  }
  getRepsonsable(id:number){
    return this.getElement('/entreprise/responsable/'+id);
  }
}
