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
  constructor(private formBuilder: FormBuilder,
              private entrepriseService: EntrepriseService,
              private router: Router,private route: ActivatedRoute) { }

  displayedColumns: string[] = ['numeroCompte', 'solde'];
  dataSource: MatTableDataSource<Compte>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.initForm();
    this.getComptes();
    
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
  initForm(){
    this.entrepriseForm=this.formBuilder.group({   
      raisonSociale:[''],
      ninea:[''],
      adresse:[''],
      emailEntreprise:[''],
      telephoneEntreprise:[''],
      nom:[''],
      username:[''],
      password: [''],//comme ca le password va contenir au moins 2 caracteres
      confirmPassword:[''],
      email:['',[Validators.required,Validators.email]],
      telephone:['',[Validators.required,Validators.pattern(/[0-9]{2,}/)]],
      nci:[''],
      image:['']
    });
  }
}
