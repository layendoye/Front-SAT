import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Entreprise } from '../models/Entreprise.model';
import { Utilisateur } from '../models/Utilisateur.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {
  
  entrepriseSubject=new Subject<any[]>();//le subject emmettra la liste des entreprises lorsqu on lui demandera, <any[]> veut dire qu il va retourner un tableau de type any (string, int...)
  private entreprises: Entreprise[];
  constructor(private httpClient: HttpClient) { }
  emitEntreprise(){
    this.entrepriseSubject.next(this.entreprises);//la methode next force le subject à emmetre ce qu on lui passe en argument (ici la liste des entreprises)
  }
  getEntreprise(){
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    this.httpClient
      .get<any[]>('http://127.0.0.1:8000/entreprises/liste',{headers: headers})
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
  bloquer(id: number){
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return new Promise(
      (resolve, reject)=>{
      this.httpClient
        .get<any[]>('http://127.0.0.1:8000/bloque/entreprises/'+id,{headers: headers})
        .subscribe(
          ()=>{
            console.log('Partenaire bloqué ! ');
            this.emitEntreprise();
            resolve();
          },
          (error)=>{
            console.log('Erreur : '+error.message);
            alert('Impossible de bloquer ce partenaire !');
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
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    this.httpClient
      .post<any>('http://127.0.0.1:8000/partenaires/add',data,{headers: headers})
      .subscribe(
        (rep)=>{
          console.log(rep);
          alert(rep.message+"\n"+rep.compte);
        },
        (error)=>{
          console.log('Erreur : '+error.message);
        }
      );
  }
}
