import { TransactionService } from './../../services/transaction.service';
import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import Swal from 'node_modules/sweetalert2/dist/sweetalert2.js';
export interface Envois {
  date:any,
  nomClientEmetteur:string;
  telephoneEmetteur:string;
  nciEmetteur:string;
  montant:number;
  nomClientRecepteur:string;
  telephoneRecepteur:string;
}

@Component({
  selector: 'app-historiques',
  templateUrl: './historiques.component.html',
  styleUrls: ['./historiques.component.scss']
})
export class HistoriquesComponent implements OnInit {
  displayedColumns: string[] = ['dateEnvoi','nomClientEmetteur', 'telephoneEmetteur', 'nciEmetteur', 'nomClientRecepteur', 'telephoneRecepteur', 'montant'];
  dataSource: MatTableDataSource<Envois>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  histoForm: FormGroup;
  envois:Envois[]=[];
  errorDate:string='';
  lesDeux:boolean=false;
  afficherEnvois:boolean=false;
  constructor(private formBuilder: FormBuilder,
              private transactionService: TransactionService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();

  }
  initForm(){
    const now=new Date();
    console.log(now)
    this.histoForm=this.formBuilder.group({   
      dateDebut:[now,[Validators.required]],
      dateFin:[now,[Validators.required]],
      action:['envois',[Validators.required]],
    });
  }
  getEnvois(data:any){
    this.transactionService.historiqueTransaction(data).then(
      response=>{
        this.envois=response;
        this.dataSource = new MatTableDataSource(this.envois);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.afficherEnvois=true;
      },
      error=>{
        console.log(error);
        console.log(error.message.search('404'))
        if(error.message.search('404')>=0){
          Swal.fire(
            'Auccune transaction trouvée!',
            '',
            'info'
          )
        }
      }
    );
    
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onSubmit(date:any,numero:number){
    this.lesDeux=false;
    this.afficherEnvois=false;
    var text;
    if(numero==1){
       text='début';
    }
    else{
      text='fin';
      
    }
      
    console.log(new Date(date))
    if(new Date(date)>new Date()){
      this.errorDate=text;
      Swal.fire(
        'Affectation',
        'la date de '+text+' est supérieure à la date d\'aujourd\'hui !',
        'error'
      )
    }
    else if(new Date(this.histoForm.value.dateDebut)>new Date(this.histoForm.value.dateFin)){
       Swal.fire(
        'Affectation',
        'la date de début est supérieure à la date de fin !',
        'error'
      )
      this.lesDeux=true;
    }
    else if(this.histoForm.get("action").value=="envois"){
      this.getEnvois(this.histoForm.value);
    }
    // else if(this.histoForm.get("action").value=="retraits"){
    //   this.getRetraits(this.histoForm.value);
    // }
  }
}
