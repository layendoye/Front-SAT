import { Component, OnInit,ViewChild } from '@angular/core';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import { Entreprise } from 'src/app/models/Entreprise.model';
import { Subscription } from 'rxjs';
import Swal from 'node_modules/sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
// export interface EntrepriseData {
//   raisonSociale:string, 
//   ninea:string,
//   emailEntreprise:string, 
//   telephoneEntreprise:string, 
//   adresse:string,
//   status?:string, 
//   soldeGlobal?:number
// }

@Component({
  selector: 'app-entreprise-list',
  templateUrl: './entreprise-list.component.html',
  styleUrls: ['./entreprise-list.component.scss']
})
export class EntrepriseListComponent implements OnInit{

  entreprises: Entreprise[]=[];
  entrepriseSubscription: Subscription;
  charger:boolean=false;
  constructor(private entrepriseServ:EntrepriseService,private router:Router) { }
  displayedColumns: string[] = ['raisonSociale', 'ninea', 'emailEntreprise', 'telephoneEntreprise', 'adresse', 'soldeGlobal', 'status', 'Modifier'];
  dataSource: MatTableDataSource<Entreprise>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {

    this.entrepriseSubscription=this.entrepriseServ.entrepriseSubject.subscribe(
      (entreprises: Entreprise[])=>{
        this.entreprises=entreprises;
        this.dataSource = new MatTableDataSource(this.entreprises);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
    
    this.entrepriseServ.emitEntreprise();
    this.entrepriseServ.getEntreprise();
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  bloquer(id: number){
    this.entrepriseServ.bloquer(id).then(
      (rep)=>{//si la promesse est resulue
        this.entrepriseServ.getEntreprise();
          Swal.fire(
            rep.message,'',
            'success'
          )
      }
    );
  }
  updatePart(id: number){
    this.router.navigate(['partenaires','add',id]);
  }
}
