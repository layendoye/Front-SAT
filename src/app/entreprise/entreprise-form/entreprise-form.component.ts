import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import { Utilisateur } from 'src/app/models/Utilisateur.model';
import { Entreprise } from 'src/app/models/Entreprise.model';
import Swal from 'node_modules/sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-entreprise-form',
  templateUrl: './entreprise-form.component.html',
  styleUrls: ['./entreprise-form.component.scss']
})
export class EntrepriseFormComponent implements OnInit {
  
  entrepriseForm: FormGroup;
  errorMessage: string;
  next:boolean=false;
  constructor(private formBuilder: FormBuilder,
              private entrepriseService: EntrepriseService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }
  initForm(){
    this.entrepriseForm=this.formBuilder.group({   
      raisonSociale:['',[Validators.required]],
      ninea:['',[Validators.required,Validators.pattern(/[0-9]{2,}/)]],
      adresse:['',[Validators.required]],
      emailEntreprise:['',[Validators.required,Validators.email]],
      telephoneEntreprise:['',[Validators.required,Validators.pattern(/[0-9]{2,}/)]],
      nom:['',[Validators.required,Validators.pattern(/[a-z-A-Z]{2,}/)]],
      username:['',[Validators.required]],
      password: ['',[Validators.required,Validators.pattern(/[0-9a-z-A-Z]{2,}/)]],//comme ca le password va contenir au moins 2 caracteres
      confirmPassword:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      telephone:['',[Validators.required,Validators.pattern(/[0-9]{2,}/)]],
      nci:['',[Validators.required,Validators.pattern(/[0-9]{2,}/)]],
      image:['']
    });
  }
  onSubmit(){
    const raisonSociale=this.entrepriseForm.get('raisonSociale').value;
    const ninea=this.entrepriseForm.get('ninea').value;
    const adresse=this.entrepriseForm.get('adresse').value;
    const emailEntreprise=this.entrepriseForm.get('emailEntreprise').value;
    const telephoneEntreprise=this.entrepriseForm.get('telephoneEntreprise').value;
    const nom=this.entrepriseForm.get('nom').value;
    const username=this.entrepriseForm.get('username').value;
    const password=this.entrepriseForm.get('password').value;
    const confirmPassword=this.entrepriseForm.get('confirmPassword').value;
    const email=this.entrepriseForm.get('email').value;
    const telephone=this.entrepriseForm.get('telephone').value;
    const nci=this.entrepriseForm.get('nci').value;
    const entreprise=new Entreprise(raisonSociale, ninea, adresse,telephoneEntreprise, emailEntreprise);
    const user=new Utilisateur(nom,username,password,email,telephone,nci,confirmPassword);
    this.entrepriseService.addEntreprise(entreprise, user).subscribe(
        (rep)=>{
          if(rep[0] && rep[0].property_path){
            this.entrepriseService.errerForm(rep);
          }else{
            Swal.fire(
              'Partenaire enregistré',
              rep.message+"\n"+rep.compte,
              'success'
            )
            this.router.navigate(['entreprises/liste']);
          }
          console.log(rep);
        },
        (error)=>{
          console.log('Erreur : '+error.message);
        }
      );
  }
  nextForm(){
    if(!this.next){
      this.next=true;
    }else{
      this.next=false;
    }
    
  }
}
