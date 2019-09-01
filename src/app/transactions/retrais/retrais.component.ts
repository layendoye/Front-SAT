import { TransactionService } from './../../services/transaction.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import Swal from 'node_modules/sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-retrais',
  templateUrl: './retrais.component.html',
  styleUrls: ['./retrais.component.scss']
})
export class RetraisComponent implements OnInit {
  receptionForm: FormGroup;
  codeForm: FormGroup;
  errorMessage: string;
  code:string='';
  info:any;
  isTransaction:boolean=false;
  ValidationMsg = {
    'code': [
      { type: 'required', message: 'Le code est obligatoire' },
      { type: 'minlength', message: 'Entrer un code valide (Ex: xxxx xxxx xxxxx)' },
      { type: 'pattern', message: 'Le code ne doit contenir que des chiffres' }
    ],
    'nciRecepteur': [
      { type: 'required', message: 'Le nci est obligatoire' },
      { type: 'minlength', message: 'Vous devez remplir au moins 2 caracteres' },
      { type: 'pattern', message: 'Rentrer un nci valide' }
    ]
  }
  constructor(private formBuilder: FormBuilder,
              private transactionService:TransactionService,private entrepriseService:EntrepriseService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }
  initForm(){
    this.codeForm=this.formBuilder.group({
      code:[this.code,[Validators.required,Validators.minLength(16),Validators.pattern(/[0-9]/)]],
      nciRecepteur:['',[Validators.required,Validators.minLength(2),Validators.pattern(/[0-9]/)]]   
    });
  }
  initForm2(){
     this.receptionForm=this.formBuilder.group({
      code:[this.code,[Validators.required,Validators.minLength(16),Validators.pattern(/[0-9]/)]],
      nciRecepteur:["",[Validators.required,Validators.minLength(2),Validators.pattern(/[0-9]/)]],   
      nomClientEmetteur:[ this.info.nomClientEmetteur],
      telephoneEmetteur:[ this.info.telephoneEmetteur],
      nomClientRecepteur:[ this.info.nomClientRecepteur],
      telephoneRecepteur:[ this.info.telephoneRecepteur],
      montant:[this.info.montant]
    });
  
  }
  onSubmit(){
    this.transactionService.retrais(this.receptionForm.value).then(
      rep=>{
        if(rep[0] && rep[0].property_path){
             this.entrepriseService.errerForm(rep);
          }else{
            Swal.fire(
              'Valider',
              rep.message,
              'success'
            )
          }
      },
      error=>{
        console.log('Erreur : '+error.message);
        if(error.message.search('403')>=0){
          Swal.fire(
              'Erreur',
              'Montant déja retiré !',
              'error'
            )
        }
      }
    )
  }
  entrerCode(code:string){
    this.transactionService.getInfoRetraits(code).then(
      rep=>{//si le compte n existe pas rep = null
        if(rep){
          this.code=code;
          this.info=rep;
          this.isTransaction=true;
          console.log(rep);
          this.initForm2();
        }else if(code.length>=16){
          Swal.fire(
              'Erreur',
              'Le code de transaction n\' existe pas',
              'error'
            )
        }
      },
      error=>{
        console.log(error);
      }
    )
  }
  modifCode(code:string){
    this.code=code;
    this.isTransaction=false;
    this.info=null;
    this.initForm();
    this.entrerCode(code);
  }
}
