import { TransactionService } from './../../services/transaction.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import Swal from 'node_modules/sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-envois',
  templateUrl: './envois.component.html',
  styleUrls: ['./envois.component.scss']
})
export class EnvoisComponent implements OnInit {
  sendForm: FormGroup;
  errorMessage: string;
  ValidationMsg = {
    'nomClientEmetteur': [
      { type: 'required', message: 'Le nom du client emetteur est obligatoire' },
      { type: 'minlength', message: 'Vous devez remplir au moins 2 caracteres' },
      { type: 'pattern', message: 'Rentrer un nom valide' }
    ],
    'telephoneEmetteur': [
      { type: 'required', message: 'Le numéro de téléphone de l\'emetteur est obligatoire' },
      { type: 'minlength', message: 'Vous devez remplir au moins 2 caracteres' },
      { type: 'pattern', message: 'Rentrer un numéro téléphone valide' }
    ],
    'nciEmetteur': [
      { type: 'required', message: 'Le nci du recepteur est obligatoire' },
      { type: 'minlength', message: 'Vous devez remplir au moins 2 caracteres' },
      { type: 'pattern', message: 'Rentrer un nci valide' }
    ],
    'nomClientRecepteur': [
      { type: 'required', message: 'Le nom du client recepteur est obligatoire' },
      { type: 'minlength', message: 'Vous devez remplir au moins 2 caracteres' },
      { type: 'pattern', message: 'Rentrer un nom valide' }
    ],
    'telephoneRecepteur': [
      { type: 'required', message: 'Le numéro de téléphone du recepteur est obligatoire' },
      { type: 'minlength', message: 'Vous devez remplir au moins 2 caracteres' },
      { type: 'pattern', message: 'Rentrer un numéro de téléphone valide' }
    ],
    'montant': [
      { type: 'required', message: 'Le montant est obligatoire' },
      { type: 'minlength', message: 'Vous devez remplir au moins 2 caracteres' },
      { type: 'pattern', message: 'Rentrer un montant valide' }
    ]
  }
  constructor(private formBuilder: FormBuilder,
              private transactionService:TransactionService,private entrepriseService:EntrepriseService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }
  initForm(){
     this.sendForm=this.formBuilder.group({   
      nomClientEmetteur:['',[Validators.required,Validators.minLength(2),Validators.pattern(/[a-z-A-Z]/)]],
      telephoneEmetteur:['',[Validators.required,Validators.pattern(/[0-9]/),Validators.minLength(2)]],
      nciEmetteur:['',[Validators.required,Validators.minLength(2),Validators.pattern(/[0-9]/)]],
      nomClientRecepteur:['',[Validators.required,Validators.minLength(2),Validators.pattern(/[a-z-A-Z]/)]],
      telephoneRecepteur:['',[Validators.required,Validators.pattern(/[0-9]/),Validators.minLength(2)]],
      montant:['',[Validators.required,Validators.pattern(/[0-9]/),Validators.minLength(2)]]
    });
  
  }
  onSubmit(){
    this.transactionService.envois(this.sendForm.value).then(
      rep=>{
        if(rep[0] && rep[0].property_path){
             this.entrepriseService.errerForm(rep);
          }else{
            Swal.fire(
              'Envoyer',
              rep.message,
              'success'
            )
          }
      },
      error=>{
        console.log('Erreur : '+error.message);
       
      }
    )
  }
}