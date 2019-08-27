import { Component, OnInit,ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'node_modules/sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';
import { Utilisateur } from 'src/app/models/Utilisateur.model';
import { EntrepriseService } from 'src/app/services/entreprise.service';
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
    this.entrepriseService.showUsers().then(
      user=>{
        this.users=user
        console.log(user);
      },
      error=>{
        console.log(error);
      }
    )
    this .dtOption = { 
      "aLengthMenu": [[5,10, 25, 50, -1], [5,10, 25, 50, "All"]]
     }; 
    
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable(this.dtOption);
  }
  updateUser(id:number){

  }
  bloquer(id:number){

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
