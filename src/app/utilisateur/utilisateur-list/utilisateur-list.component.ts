import { Component, OnInit,ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'node_modules/sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';
import { Utilisateur } from 'src/app/models/Utilisateur.model';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import { SecurityService } from 'src/app/services/security.service';
declare var $;
@Component({
  selector: 'app-utilisateur-list',
  templateUrl: './utilisateur-list.component.html',
  styleUrls: ['./utilisateur-list.component.scss']
})
export class UtilisateurListComponent implements OnInit {
  @ViewChild('dataTable') table;
  dataTable: any;
  dtOption: any = {}; 
  users: Utilisateur[]=[];
  userSubscription: Subscription;
  constructor(private entrepriseService:EntrepriseService,private router:Router) { }

  ngOnInit() {
    this.userSubscription=this.entrepriseService.userSubject.subscribe(
      (users: Utilisateur[])=>{
        this.users=users;
      }
    );
    this.entrepriseService.emitUser();
    this.entrepriseService.getUsers();
    this .dtOption = { 
      "aLengthMenu": [[5,10, 25, 50, -1], [5,10, 25, 50, "All"]]
     }; 
    
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable(this.dtOption);
  }
  updateUser(id:number){
    this.router.navigate(['inscription',id]);
  }
  bloquer(id: number){
    this.entrepriseService.bloquerUser(id).then(
      (rep)=>{//si la promesse est resulue
        this.entrepriseService.getUsers();
          Swal.fire(
            rep.message,'',
            'success'
          )
      }
    );
  }
  poste(roles:any){
    var poste;
    if(roles[0]=='ROLE_Super-admin' || roles[0]=='ROLE_admin-Principal' || roles[0]=='ROLE_admin'){
      poste='Administrateur';
    }
    else if(roles[0]=='ROLE_Caissier'){
      poste='Caissier';
    }
     else if(roles[0]=='ROLE_utilisateur'){
      poste='Guichetier';
    }
    return poste;
  }
}
