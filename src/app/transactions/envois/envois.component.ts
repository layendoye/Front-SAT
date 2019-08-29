import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import { Utilisateur } from 'src/app/models/Utilisateur.model';
import { Entreprise } from 'src/app/models/Entreprise.model';
import Swal from 'node_modules/sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-envois',
  templateUrl: './envois.component.html',
  styleUrls: ['./envois.component.scss']
})
export class EnvoisComponent implements OnInit {
  entrepriseUpd:Entreprise;
  entrepriseUpdForm: FormGroup;
  errorMessage: string;
  constructor(private formBuilder: FormBuilder,
              private entrepriseService: EntrepriseService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }
  initForm(){
     this.entrepriseUpdForm=this.formBuilder.group({   
      raisonSociale:['',[Validators.required]],
      ninea:['',[Validators.required,Validators.pattern(/[0-9]{2,}/)]],
      adresse:['',[Validators.required]],
      emailEntreprise:['',[Validators.required,Validators.email]],
      telephoneEntreprise:['',[Validators.required,Validators.pattern(/[0-9]{2,}/)]]
    });
  
  }
  onSubmit(){}
}