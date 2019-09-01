import { Component, OnInit,ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'node_modules/sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';
import { Utilisateur } from 'src/app/models/Utilisateur.model';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import { SecurityService } from 'src/app/services/security.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-utilisateur-list',
  templateUrl: './utilisateur-list.component.html',
  styleUrls: ['./utilisateur-list.component.scss']
})
export class UtilisateurListComponent implements OnInit {
 
  users: Utilisateur[]=[];
  userSubscription: Subscription;
  constructor(private entrepriseService:EntrepriseService,private router:Router) { }
  displayedColumns: string[] = ['nom', 'email', 'telephone', 'nci', 'roles', 'status', 'Modifier'];
  dataSource: MatTableDataSource<Utilisateur>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    this.userSubscription=this.entrepriseService.userSubject.subscribe(
      (users: Utilisateur[])=>{
        this.users=users;
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
    this.entrepriseService.emitUser();
    this.entrepriseService.getUsers();
  }
  updateUser(id:number){
    this.router.navigate(['update',id]);
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
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
