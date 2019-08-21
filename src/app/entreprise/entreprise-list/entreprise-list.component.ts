import { Component, OnInit,ViewChild, OnDestroy } from '@angular/core';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import { Entreprise } from 'src/app/models/Entreprise.model';
import { Subscription } from 'rxjs';
declare var $;
@Component({
  selector: 'app-entreprise-list',
  templateUrl: './entreprise-list.component.html',
  styleUrls: ['./entreprise-list.component.scss']
})
export class EntrepriseListComponent implements OnInit{
  @ViewChild('dataTable') table;
  dataTable: any;

  entreprises: Entreprise[];
  entrepriseSubscription: Subscription;
  constructor(private entrepriseServ:EntrepriseService) { }

  ngOnInit() {
    this.entrepriseSubscription=this.entrepriseServ.entrepriseSubject.subscribe(
      (entreprises: Entreprise[])=>{
        this.entreprises=entreprises;
        console.log(entreprises);
      }
    );
    this.entrepriseServ.emitEntreprise();
    this.entrepriseServ.getEntreprise();
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable();
  }
  bloquer(id: number){
    this.entrepriseServ.bloquer(id);
    this.entrepriseServ.getEntreprise();
  }
}
