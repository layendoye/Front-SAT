import { SecurityService } from './../services/security.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  image:string;
  constructor(private router:Router,private securityService:SecurityService,private appComponent:AppComponent) { }
  connecter:boolean=false;
  nom:string;
  MonPoste:string;
  ngOnInit() {
    if(localStorage.getItem('token')){
      this.connecter=true;
    }
    this.securityService.getUserConnecte().then(
      rep=>{
        localStorage.setItem("idEntreprise",rep.entreprise.id);
        localStorage.setItem("idUser",rep.id);
        const roles=localStorage.getItem("roles");
        if(roles.search("ROLE_utilisateur")>=0 || roles.search("ROLE_admin-Principal")>=0 || roles.search("ROLE_admin")>=0)
          this.appComponent.getUserCompte(rep.id);
        this.nom=rep.nom;
        this.MonPoste=this.poste(localStorage.getItem("roles"));
        localStorage.setItem("image",rep.image);
        this.image="assets/img/"+rep.image;
      }
    )
  }
  logOut(){
    localStorage.clear();
    window.location.reload();
    this.router.navigate(['/connexion']);
  }
  poste(roles:string){
    var poste;
    if(roles.search("ROLE_Super-admin")>=0 || roles.search('ROLE_admin-Principal')>=0 || roles.search('ROLE_admin')>=0){
      poste='Administrateur';
    }
    else if(roles.search('ROLE_Caissier')>=0){
      poste='Caissier';
    }
     else if(roles.search('ROLE_utilisateur')>=0){
      poste='Guichetier';
    }
    return poste;
  }
  parametre(){
    this.router.navigate(["/update",localStorage.getItem("idUser")])
  }
}
