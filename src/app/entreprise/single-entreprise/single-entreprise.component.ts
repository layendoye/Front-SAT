import { Compte } from './../../models/Compte.model';
import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  comptes:Compte[]=[{numeroCompte:'1254 2541 3526',solde:'100000'},{numeroCompte:'1254 2541 3526',solde:'100000'},{numeroCompte:'1254 2541 3526',solde:'100000'},{numeroCompte:'1254 2541 3526',solde:'100000'},{numeroCompte:'1254 2541 3526',solde:'100000'}];
  constructor(private formBuilder: FormBuilder,
              private entrepriseService: EntrepriseService,
              private router: Router) { }

  displayedColumns: string[] = ['numeroCompte', 'solde'];
  dataSource: MatTableDataSource<Compte>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.initForm();
    this.dataSource = new MatTableDataSource(this.comptes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
