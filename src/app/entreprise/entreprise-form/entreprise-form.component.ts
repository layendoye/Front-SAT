import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import { Utilisateur } from 'src/app/models/Utilisateur.model';
import { Entreprise } from 'src/app/models/Entreprise.model';

@Component({
  selector: 'app-entreprise-form',
  templateUrl: './entreprise-form.component.html',
  styleUrls: ['./entreprise-form.component.scss']
})
export class EntrepriseFormComponent implements OnInit {
  
 entrepriseForm: FormGroup;
  errorMessage: string;
  constructor(private formBuilder: FormBuilder,
              private entrepriseService: EntrepriseService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }
  initForm(){
    this.entrepriseForm=this.formBuilder.group({   
      raisonSociale:['',[Validators.required]],
      ninea:['',[Validators.required]],
      adresse:['',[Validators.required]],
      emailEntreprise:['',[Validators.required]],
      telephoneEntreprise:['',[Validators.required]],
      nom:['',[Validators.required]],
      username:['',[Validators.required]],
      password: ['',[Validators.required,Validators.pattern(/[0-9a-z-A-Z]{2,}/)]],//comme ca le password va contenir au moins 2 caracteres
      confirmPassword:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      telephone:['',[Validators.required]],
      nci:['',[Validators.required]]
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
    this.entrepriseService.addEntreprise(entreprise,user);
    
    this.router.navigate(['entreprises/liste']);
  }
}
