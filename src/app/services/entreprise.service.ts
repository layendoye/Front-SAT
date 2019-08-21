import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Entreprise } from '../models/Entreprise.model';
import { Utilisateur } from '../models/Utilisateur.model';
import { HttpClient } from '@angular/common/http';
import { AuthHttp } from 'angular-jwt';
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
    this.httpClient
      .get<any[]>('http://127.0.0.1:8000/entreprises/liste')
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
    this.httpClient
      .get<any[]>('http://127.0.0.1:8000/bloque/entreprises/'+id)
      .subscribe(
        ()=>{
          console.log('Partenaire bloqué ! ');
          this.emitEntreprise();
          
        },
        (error)=>{
          console.log('Erreur : '+error.message);
          alert('Impossible de bloquer ce partenaire !');
        }
      );
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
    this.httpClient
      .post('http://127.0.0.1:8000/partenaires/add',data)
      .subscribe(
        ()=>{
        },
        (error)=>{
          console.log('Erreur : '+error.message);
        }
      );
  }
}
