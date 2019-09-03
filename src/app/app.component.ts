import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { EntrepriseService } from 'src/app/services/entreprise.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'SA Transfert';
  isAuth:boolean=false;
  jwtHelper = new JwtHelperService();
  detruit:boolean=false;
  numeroCompte:string;
  solde:number;
  constructor(private router: Router, private entrepriseService:EntrepriseService){}
  ngOnInit(){
      
    this.auth();
    this.tokenExpire();
    
  }

  auth(){
    console.log(localStorage);
    if(!this.isAuth && localStorage.getItem('token')){     
      this.isAuth=true;
      this.router.navigate(['/entreprises/liste']);
      this.getUserCompte();
    }
  }
  tokenExpire(){
    const token=localStorage.getItem('token')
    if(localStorage.getItem('token') && this.jwtHelper.isTokenExpired(token)){
      localStorage.clear();
      this.detruit=true;
      window.location.reload();
    }
  }
  getUserCompte(){//deplacer la fonction u header ici recuperer id du user
    this.entrepriseService.getMonCompteActu().then(
      resp=>{
        console.log(resp);
        this.numeroCompte=resp.compte.numeroCompte;
        this.solde=resp.compte.solde;
      }
    )
  }
}
