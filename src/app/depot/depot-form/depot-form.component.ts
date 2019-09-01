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
   ValidationMsg = {
    'numeroCompte': [
      { type: 'required', message: 'Le numéro compte est obligatoire' },
      { type: 'minlength', message: 'Vous devez remplir au moins 2 caracteres' },
      { type: 'pattern', message: 'Rentrer un numéro compte valide' }
    ],
    'montant': [
      { type: 'required', message: 'Le montant est obligatoire' },
      { type: 'minlength', message: 'Vous devez remplir au moins 2 caracteres' },
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
      numeroCompte:['',[Validators.required]],
      montant:['',[Validators.required,Validators.pattern(/[0-9]/),Validators]],
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
    this.entrepriseService.getDepotCaissierCompte(numeroCompte).then(
      res=>{
        this.mesDepots=res;
        console.log(res);
        this.isCompte=true;
        this.dataSource = new MatTableDataSource(this.mesDepots);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error=>{
        console.log(error);
      }
    )
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
