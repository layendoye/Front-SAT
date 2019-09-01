import { Entreprise } from './../../models/Entreprise.model';
import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import Swal from 'node_modules/sweetalert2/dist/sweetalert2.js';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
export interface MesDepots {
  date:string, 
  montant:string
}
declare var $;
@Component({
  selector: 'app-depot-form',
  templateUrl: './depot-form.component.html',
  styleUrls: ['./depot-form.component.scss']
})
export class DepotFormComponent implements OnInit {
  displayedColumns: string[] = ['date', 'montant'];
  dataSource: MatTableDataSource<MesDepots>;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort;
  depotForm: FormGroup;
  errorMessage: string;
  mesDepots:MesDepots[];
  isCompte:boolean=false;
  entreprise:Entreprise;
  charger:boolean=false;
  entrepriseForm: FormGroup;
   ValidationMsg = {
    'numeroCompte': [
      { type: 'required', message: 'Le numéro compte est obligatoire' },
      { type: 'minlength', message: 'Vous devez remplir un numéro compte valide (Ex: xxxx xxxx xxxx)' },
      { type: 'pattern', message: 'Rentrer un numéro compte valide' }
    ],
    'montant': [
      { type: 'required', message: 'Le montant est obligatoire' },
      { type: 'minlength', message: 'Dêpot minimal 75.000' },
      { type: 'pattern', message: 'Rentrer un montant valide' }
    ]
  }
  constructor(private formBuilder: FormBuilder,
              private entrepriseService: EntrepriseService,
              private router: Router,private route: ActivatedRoute) { }


  ngOnInit() {
    this.initForm();
  }
        
  initForm(){
     this.depotForm=this.formBuilder.group({   
      numeroCompte:['',[Validators.required,Validators.minLength(14)]],
      montant:['',[Validators.required,Validators.pattern(/[0-9]/),Validators.minLength(5)]],//surperieur à 75000
    });
  }
  onSubmit(){
    const numeroCompte=this.depotForm.get('numeroCompte').value;
    const montant=this.depotForm.get('montant').value;
    this.entrepriseService.depot(numeroCompte,montant).then(
      rep=>{
        if(rep[0] && rep[0].property_path){
           this.entrepriseService.errerForm(rep);
        }else{
          Swal.fire({width: 400,
              title:'Dêpot effectué',
              text:rep.message,
              type: 'success'},

          )
         this.router.navigate(['entreprises/liste']);
        }
      },
      error=>{
        Swal.fire(
          'Erreur',
          error.message,
          'success'
        )
      }
    );
  }
  getDepotCaissierCompte(numeroCompte:string){
    this.isCompte=false;//on initialise s il change de numero de compte
    this.charger=false;// on initialise s il change de numero de compte
    this.entrepriseService.getDepotCaissierCompte(numeroCompte).then(
      res=>{
        this.mesDepots=res;
        console.log(res);
        this.isCompte=true;
        this.dataSource = new MatTableDataSource(this.mesDepots);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.EntrepriseCompte(numeroCompte);
      },
      error=>{
        console.log(error);
        if(numeroCompte.length>=14 && !this.isCompte){//14 à cause des espaces
          Swal.fire({
              width: 400,
              title:'Erreur',
              text:'Ce compte n\'existe pas !',
              type: 'error'
            },

          )
        }
      }
    )
    
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getEntreprise(id:number){
    this.entrepriseService.getUneEntreprise(id).then(
      response=>{
        this.charger=true;
        this.entreprise=response;
        console.log(response)
        this.initForm2();
      },
      error=>{
        console.log(error)
      }
    )
  }
  initForm2(){
    
    this.entrepriseForm=this.formBuilder.group({   
      raisonSociale:[this.entreprise.raisonSociale],
      ninea:[this.entreprise.ninea],
      adresse:[this.entreprise.adresse],
      emailEntreprise:[this.entreprise.emailEntreprise],
      telephoneEntreprise:[this.entreprise.telephoneEntreprise],
      soldeActu:[this.entreprise.soldeGlobal]
    });
  }
  EntrepriseCompte(numeroCompte:string){
    const data={
      numeroCompte:numeroCompte
    }
    this.entrepriseService.getUnCompte(data).then(
      response=>{//un objet de type compte
        this.getEntreprise(response.entreprise.id);
        console.log(response)
      },
      error=>{
        console.log(error)
      }
    )
  }
}
