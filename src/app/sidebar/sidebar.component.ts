import { SecurityService } from './../services/security.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  image:string;
  constructor() { }
  MonPoste:string;
  ngOnInit() {
    this.MonPoste=this.poste(localStorage.getItem("roles"));
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
