import { Compte } from './../../models/Compte.model';
import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import { Utilisateur } from 'src/app/models/Utilisateur.model';
import { Entreprise } from 'src/app/models/Entreprise.model';
import Swal from 'node_modules/sweetalert2/dist/sweetalert2.js';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-single-entreprise',
  templateUrl: './single-entreprise.component.html',
  styleUrls: ['./single-entreprise.component.scss']
})
export class SingleEntrepriseComponent implements OnInit {

  entrepriseForm: FormGroup;
  errorMessage: string;
  id:number
  comptes:Compte[];
  entreprise:Entreprise;
  responsable:Utilisateur;
  charger:boolean=false;
  constructor(private formBuilder: FormBuilder,
              private entrepriseService: EntrepriseService,
              private router: Router,private route: ActivatedRoute) { }

  displayedColumns: string[] = ['numeroCompte', 'solde'];
  dataSource: MatTableDataSource<Compte>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.getComptes();
    this.getEntreprise();
  }
  getComptes(){
    this.id=this.route.snapshot.params['id'];
    this.entrepriseService.getComptesEntreprise(+this.id).then(
      response=>{
        this.comptes=response;
        this.dataSource = new MatTableDataSource(this.comptes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(response)
      },
      error=>console.log(error)
    )
  }
  getEntreprise(){
    this.id=this.route.snapshot.params['id'];
    this.entrepriseService.getUneEntreprise(+this.id).then(
      response=>{
        this.entreprise=response;
        console.log(response)
         this.getResponsable(+this.id)//on initialise le formulaire ici
      },
      error=>{
        console.log(error)
      }
    )
  }
  getResponsable(id:number){
    this.entrepriseService.getRepsonsable(id).then(
      response=>{
        this.responsable=response;
        console.log(response)
        this.initForm();
      },
      error=>{
        console.log(error)
      }
    )
  }

  initForm(){
    this.charger=true;
    this.entrepriseForm=this.formBuilder.group({   
      raisonSociale:[this.entreprise.raisonSociale],
      ninea:[this.entreprise.ninea],
      adresse:[this.entreprise.adresse],
      emailEntreprise:[this.entreprise.emailEntreprise],
      telephoneEntreprise:[this.entreprise.telephoneEntreprise],
      nom:[this.responsable.nom],
      username:[this.responsable.username],
      email:[this.responsable.email],
      telephone:[this.responsable.telephone],
      nci:[this.responsable.nci]
    });
  }
}
