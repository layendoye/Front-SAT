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
  displayedColumns: string[] = ['raisonSociale', 'ninea', 'emailEntreprise', 'telephoneEntreprise', 'adresse', 'soldeGlobal','details','ajoutCompte', 'status', 'Modifier'];
  dataSource: MatTableDataSource<Entreprise>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    this.getEntreprises();
  }
  getEntreprises(){
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
  bloquer(id: number,statut:string){
    var titreBloquer;
    var textBloquer;
    if(statut=='Actif'){
      titreBloquer="Etes vous sure de vouloir le bloquer?";
      textBloquer="Les utilisateurs du partenaire ne pourrons plus se connecter";
    }
      
    else{
      titreBloquer="Etes vous sure de vouloir le débloquer?";
      textBloquer="Les utilisateurs du partenaire pourrons se reconnecter";
    }
      

    Swal.fire({
      title: titreBloquer,
      width: 600,
      text: textBloquer,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.value) {
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
    })


    
  }
  updatePart(id: number){
    this.router.navigate(['partenaires',id]);
  }
  show(id:number){
    this.router.navigate(['partenaires','show',id]);
  }
  addCompte(id:number){
    
    Swal.fire({
      title: "Etes vous sure de vouloir lui ajouter un nouveau compte?",
      width: 700,
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.value) {
        this.entrepriseServ.addCompte(id).then(
        response=>{
          Swal.fire({
              title: response.message+' le numéro de compte est : '+ response.compte,
              width: 700,
              type:'success'
            });
        },
        error=>{
          console.log(error);
        }
      );
      }
    })


    
  }
}
