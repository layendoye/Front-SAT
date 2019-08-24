import { Component, OnInit,ViewChild } from '@angular/core';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import { Entreprise } from 'src/app/models/Entreprise.model';
import { Subscription } from 'rxjs';
import Swal from 'node_modules/sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';
declare var $;
@Component({
  selector: 'app-entreprise-list',
  templateUrl: './entreprise-list.component.html',
  styleUrls: ['./entreprise-list.component.scss']
})
export class EntrepriseListComponent implements OnInit{
  @ViewChild('dataTable') table;
  dataTable: any;
  dtOption: any = {}; 
  entreprises: Entreprise[];
  entrepriseSubscription: Subscription;
  constructor(private entrepriseServ:EntrepriseService,private router:Router) { }

  ngOnInit() {
    
    this.entrepriseSubscription=this.entrepriseServ.entrepriseSubject.subscribe(
      (entreprises: Entreprise[])=>{
        this.entreprises=entreprises;
        console.log(entreprises);
        
      }
    );
    this.entrepriseServ.emitEntreprise();
    this.entrepriseServ.getEntreprise();
    this .dtOption = { 
      "aLengthMenu": [[5,10, 25, 50, -1], [5,10, 25, 50, "All"]]
     }; 
    
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable(this.dtOption);
  }

  bloquer(id: number){
    this.entrepriseServ.bloquer(id).then(
      ()=>{//si la promesse est resulue
        this.entrepriseServ.getEntreprise();
      }
    );
  }
  updatePart(id: number){
    this.router.navigate(['partenaires','add',id]);
  }
}
