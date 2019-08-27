import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'node_modules/sweetalert2/dist/sweetalert2.js';
import { SecurityService } from 'src/app/services/security.service';
import { Utilisateur } from 'src/app/models/Utilisateur.model';
@Component({
  selector: 'app-utilisateur-form',
  templateUrl: './utilisateur-form.component.html',
  styleUrls: ['./utilisateur-form.component.scss']
})
export class UtilisateurFormComponent implements OnInit {
  userForm: FormGroup;
  errorMessage: string;
  constructor(private formBuilder: FormBuilder,private router: Router,private securityService:SecurityService) { }

  ngOnInit() {
    this.initForm();
  }
  initForm(){
    this.userForm=this.formBuilder.group({   
      nom:['',[Validators.required,Validators.pattern(/[a-z-A-Z]{2,}/)]],
      username:['',[Validators.required]],
      password: ['',[Validators.required,Validators.pattern(/[0-9a-z-A-Z]{2,}/)]],//comme ca le password va contenir au moins 2 caracteres
      confirmPassword:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      telephone:['',[Validators.required,Validators.pattern(/[0-9]{2,}/)]],
      nci:['',[Validators.required,Validators.pattern(/[0-9]{2,}/)]],
      profil:['',[Validators.required]],
      image:['']
    });
  }
  onSubmit(){
    const nom=this.userForm.get('nom').value;
    const username=this.userForm.get('username').value;
    const password=this.userForm.get('password').value;
    const confirmPassword=this.userForm.get('confirmPassword').value;
    const email=this.userForm.get('email').value;
    const telephone=this.userForm.get('telephone').value;
    const nci=this.userForm.get('nci').value;
    const profil=this.userForm.get('profil').value;
    const image=this.userForm.get('image').value;
    console.log(this.userForm);
    const user=new Utilisateur(nom,username,password,email,telephone,nci,confirmPassword,profil,image);
    // this.securityService.addUser(user).then(
    //     (rep)=>{
    //       if(rep[0] && rep[0].property_path){
    //         this.securityService.errerForm(rep);
    //       }else{
    //         Swal.fire(
    //           'Utilisateur enregistré',
    //           rep.message,
    //           'success'
    //         )
    //         this.router.navigate(['entreprises/liste']);
    //       }
    //       console.log(rep);
    //     },
    //     (error)=>{
    //       console.log('Erreur : '+error.message);
    //     }
    //   );
  }
  recupProfil(){
    
  }
}
