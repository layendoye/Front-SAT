import { TransactionService } from './../../services/transaction.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import Swal from 'node_modules/sweetalert2/dist/sweetalert2.js';
import * as jsPDF from 'jspdf';
@Component({
  selector: 'app-envois',
  templateUrl: './envois.component.html',
  styleUrls: ['./envois.component.scss']
})
export class EnvoisComponent implements OnInit {
  sendForm: FormGroup;
  errorMessage: string;
  afficherRecu=false;
  rep:any;
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
      { type: 'min', message: 'Montant minimum 500 fr' },
      { type: 'max', message: 'Montant maximum 3 000 000 fr' },
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
      montant:['',[Validators.required,Validators.pattern(/[0-9]/),Validators.min(500),Validators.max(3000000)]]
    });
  
  }
  onSubmit(){
    this.transactionService.envois(this.sendForm.value).then(
      rep=>{
        if(rep[0] && rep[0].property_path){
             this.entrepriseService.errerForm(rep);
          }else{
            this.rep=rep;
            Swal.fire({
              title: '<strong>Info</strong>',
              type: 'success',
              html:
                   '<h2>Bénéficiaire</h2>'
                  +'<p>Nom : '+rep.Beneficiaire.Nom+'</p>'
                  +'<p>Pays : '+rep.Beneficiaire.Pays+'</p>'
                  +'<p>Téléphone : '+rep.Beneficiaire.Telephone+'</p>'
                  +'<h2>Envoyeur</h2>'
                  +'<p>Nom : '+rep.Envoyeur.Nom+'</p>'
                  +'<p>NCI : '+rep.Envoyeur.NCI+'</p>'
                  +'<p>Pays : '+rep.Envoyeur.Pays+'</p>'
                  +'<p>Téléphone : '+rep.Envoyeur.Telephone+'</p>'
                  +'<h2>Transaction</h2>'
                  +'<p>Code : <strong>'+rep.Transaction.CodeTransaction+'</strong></p>'
                  +'<p>Commissions TTC : '+rep.Transaction.CommissionsTTC+' </p>'
                  +'<p>Montant Envoyé : '+rep.Transaction.MontantEnvoye+'</p>'
                  +'<p>Total : '+rep.Transaction.Total+'</p>',
              showCloseButton: true,
              focusConfirm: false,
              confirmButtonText:
                '<i class="fa fa-thumbs-up"></i> Ok',
              confirmButtonAriaLabel: 'Thumbs up, great!',
            }).then((result) => {
              if (result.value) {
                this.recu();
              }
            })
          }
          console.log(rep);
      },
      error=>{
        console.log('Erreur : '+error.message);
        if(error.error.message){
          Swal.fire(
            'Erreur',
            error.error.message,
            'error'
          )
        }


      }
    )
  }
  recu(){
    this.afficherRecu=true;
    setTimeout(()=>{
      window.print();
    },3000)
  }
}