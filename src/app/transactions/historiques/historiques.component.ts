import { EntrepriseService } from './../../services/entreprise.service';
import { TransactionService } from './../../services/transaction.service';
import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import Swal from 'node_modules/sweetalert2/dist/sweetalert2.js';
import { Utilisateur } from 'src/app/models/Utilisateur.model';
export interface InfoTransaction {
  date:any,
  nomClientEmetteur:string,
  telephoneEmetteur:string,
  code:string,
  montant:number,
  nomClientRecepteur:string,
  telephoneRecepteur:string,
  dateReception:any,
}


@Component({
  selector: 'app-historiques',
  templateUrl: './historiques.component.html',
  styleUrls: ['./historiques.component.scss']
})
export class HistoriquesComponent implements OnInit {
  displayedColumns: string[] = ['date','nomClientEmetteur', 'telephoneEmetteur',  'nomClientRecepteur', 'telephoneRecepteur','code', 'montant'];
  displayedColumns2: string[] = ['date', 'nomClientRecepteur', 'telephoneRecepteur','nomClientEmetteur', 'telephoneEmetteur','code', 'montant'];
  dataSource: MatTableDataSource<InfoTransaction>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  histoForm: FormGroup;

  transaction:InfoTransaction[]=[];

  errorDate:string;
  lesDeux:boolean=false;

  afficherEnvois:boolean=false;
  afficherRetraits:boolean=false;

  users:Utilisateur[];

  histoGuichetier=false;
  constructor(private formBuilder: FormBuilder,
              private transactionService: TransactionService,
              private router: Router,
              private entrepriseService: EntrepriseService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getUser();//le formulaire est initialisé dans la fonction
  }
  initForm(){
    var id=0;
    if(this.route.snapshot.params['type']){
      id=(+localStorage.getItem("idUser"));
      this.histoGuichetier=true
    }

    const now=new Date();
    console.log(now)
    this.histoForm=this.formBuilder.group({   
      dateDebut:[now,[Validators.required]],
      dateFin:[now,[Validators.required]],
      idUser:[id,[Validators.required]],
      action:['envois',[Validators.required]],
    });
  }
  getInfoTransaction(data:any){
    this.transactionService.historiqueTransaction(data).then(
      response=>{
          this.transaction=response;
          this.dataSource = new MatTableDataSource(this.transaction);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        if(data.action=="envois"){  
          this.afficherEnvois=true;
          this.afficherRetraits=false;
        }
        else{
          this.afficherRetraits=true;
          this.afficherEnvois=false;
        }
      },
      error=>{
        console.log(error);
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
  onSubmit(numero:number){
    this.lesDeux=false;
    this.afficherEnvois=false;
    this.afficherRetraits=false;
    this.errorDate='';
    var text;
    if(numero==1){
       text='début';
    }
    else{
      text='fin';
    }

    if(new Date(this.histoForm.value.dateDebut)>new Date() || new Date(this.histoForm.value.dateFin)>new Date()){//si une des 2 dates est superieurs à celle d aujourd hui
      this.errorDate=text;
      Swal.fire(
        'Erreur',
        'la date de '+text+' est supérieure à la date d\'aujourd\'hui !',
        'error'
      )
    }
    else if(new Date(this.histoForm.value.dateDebut)>new Date(this.histoForm.value.dateFin)){
       Swal.fire(
        'Erreur',
        'la date de début est supérieure à la date de fin !',
        'error'
      )
      this.lesDeux=true;
    }
    else{
      this.getInfoTransaction(this.histoForm.value);
    }
  }
  getUser(){
    this.entrepriseService.getUserAffectation().then(//pour le select des users
      users=>{
        this.users=users;
        this.initForm();
      },error=>{
        console.log('Erreur : '+error)
      }
    );
  }
}

