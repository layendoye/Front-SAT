import { Component, OnInit,ViewChild } from '@angular/core';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import Swal from 'node_modules/sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface ListeCompte {
  numeroCompte:string, 
  solde:number,
  info:string
}

export interface UserCompte {
  numeroCompte:string, 
  solde:number,
  nmbUser:number
}

@Component({
  selector: 'app-listes-comptes',
  templateUrl: './listes-comptes.component.html',
  styleUrls: ['./listes-comptes.component.scss']
})
export class ListesComptesComponent implements OnInit {

  listeComptes:ListeCompte[] = [];
  usersCompte:UserCompte[] = [];

  displayedColumns: string[] = ['numeroCompte', 'solde','nmbUser','info'];
  dataSource: MatTableDataSource<ListeCompte>;

  displayedColumns1: string[] = ['dateAffectation', 'nom'];
  dataSource1: MatTableDataSource<UserCompte>;
  afficherInfo:boolean=false;

  nmbUser:number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private entrepriseService:EntrepriseService,private router:Router) { }
  ngOnInit() {
    this.getComptes();
  }
  getComptes(){
    const idPart=localStorage.getItem("idEntreprise");
    this.entrepriseService.getComptesEntreprise(+idPart).then(
      rep=>{
        this.listeComptes=rep;
        this.dataSource = new MatTableDataSource(this.listeComptes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(rep);
      },
      error=>console.log(error)
    );
  }
  getUserEncour(id:number){
    this.entrepriseService.getUsersDuCompte(id).then(
      rep=>{
        this.usersCompte=rep;
        this.dataSource1 = new MatTableDataSource(this.usersCompte);
        this.dataSource1.paginator = this.paginator;
        this.dataSource1.sort = this.sort;
        this.afficherInfo=true;
        console.log(rep);
      },
      error=>console.log(error)
    );
    
  }
  nmbrUser(id){
    this.entrepriseService.getUsersDuCompte(id).then(
      rep=>{
        console.log(rep.length);
        return rep.length
        
      },
      error=>console.log(error)
    );
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  applyFilter1(filterValue: string) {
    this.dataSource1.filter = filterValue.trim().toLowerCase();
    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }
}
