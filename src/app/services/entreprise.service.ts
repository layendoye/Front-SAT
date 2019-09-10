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
  emitUser(){//on peut utiliser le this.ngOnInt() dans les components aussi pour regler le probleme de l affichage apres la modification du statut par exemple
    this.userSubject.next(this.users);//la methode next force le subject à emmetre ce qu on lui passe en argument (ici la liste des entreprises)
  }
  getEntreprise(){//ne pas factoriser
    return new Promise<any[]>(
      (resolve,reject)=>{
        this.httpClient
          .get<any[]>(this.urlBack+'/entreprises/liste',this.headers)
          .subscribe(
            (response)=>{
              this.entreprises=response;
              this.emitEntreprise();
              resolve(response);
            },
            (error)=>{
              console.log('Erreur de chargement ! '+error.message);
              
              reject(error)
            }
          );
      }
    )
  }
  getUsers(){//ne pas factoriser à cause de emitUser()
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
  getUserAffectation(){
    return this.getElement('/lister/users/all');
  }
  bloquer(id: number){//ne pas factoriser
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
            //alert('Impossible de bloquer ce partenaire !');
            if(error.error.message){
              Swal.fire(
                'Erreur',
                error.error.message,
                'error'
              )
            }
            reject(error);
          }
        );
      })
  }
  bloquerUser(id: number){//ne pas factoriser
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
      return this.postElement(formData,'/partenaires/add');
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
    return this.postElement(data,'/partenaires/update/'+id);
  }
  updateUser(formData:FormData,id:number){
    return this.getElement('/user/update/'+id)
  }
  recupEntreprise(id:number){
    return this.getElement('/entreprise/'+id)
  }
  recupUser(id:number){
      return this.getElement('/user/'+id)
  }
  depot(data:any){
    return this.postElement(data,'/nouveau/depot');
  }
  getDepotCaissierCompte(numeroCompte:string){
    const data={
      numeroCompte:numeroCompte
    }
    return this.postElement(data,"/compte/Mesdepots")
  }
  getAllDepot(id:number){
    return this.getElement('/depot/all/'+id);
  }
  getCompte(){
    return this.getElement('/MesComptes');
  }
  getComptesEntreprise(id:number){
    return this.getElement('/compte/entreprise/'+id);
  }
  affecterCompt(data:any){
      return this.postElement(data,'/changer/compte');
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
 
  getUneEntreprise(id:number){
    return this.getElement('/entreprise/'+id);
  }
  getRepsonsable(id:number){
    return this.getElement('/entreprise/responsable/'+id);
  }
  getUnCompte(data:any){//data est un objet avec le numero de compte
    return this.postElement(data,"/compte/numeroCompte")
  }
  getMonCompteActu(id:number){
    return this.getElement("/compte/user/"+id);
  }
  getAllCompte(){
    return this.getElement("/comptes/all");
  }
  getUsersDuCompte(id:number){
    return this.getElement("/utilisateur/affecterCompte/"+id);
  }
  postElement(data:any,url:string){//return une promise
    return new Promise<any>(
      (resolve,reject)=>{
      this.httpClient
        .post<any>(this.urlBack+url,data,this.headers).subscribe(
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
  errerForm(rep:any){//ne pas supprimer, cette fonction est utilisée dans d autres components
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
}
