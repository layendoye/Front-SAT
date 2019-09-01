import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
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
  constructor(private router: Router){}
  ngOnInit(){
    console.log(localStorage);
    console.log(localStorage.getItem("roles").search("ROLE_utilisateur"))
    if(!this.isAuth && localStorage.getItem('token')){     
      this.isAuth=true;
      this.router.navigate(['/entreprises/liste']);

    }
    this.tokenExpire();
  }
  tokenExpire(){
    const token=localStorage.getItem('token')
    if(localStorage.getItem('token') && this.jwtHelper.isTokenExpired(token) ){
      localStorage.clear();
      this.detruit=true;
      window.location.reload();
    }
  }
  poste(roles:string){
    var role;
    if(roles.search("ROLE_Super-admin")>=0){
      role='Super-admin';
    }
    else if(roles.search('ROLE_admin-Principal')>=0){
      role='admin-Principal';
    }
    else if(roles.search('ROLE_admin')>=0){
      role='admin';
    }
    else if(roles.search('ROLE_Caissier')>=0){
      role='Caissier';
    }
     else if(roles.search('ROLE_utilisateur')>=0){
      role='Guichetier';
    }
    return role;
  }
}
