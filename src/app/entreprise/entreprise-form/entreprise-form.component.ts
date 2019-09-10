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
  fileToUpload:File=null;
  entrepriseForm: FormGroup;
  errorMessage: string;
  next:boolean=false;
  imageUrl:string="assets/img/exemple.jpg";
   ValidationMsg = {
    'raisonSociale': [
      { type: 'required', message: 'La raison sociale est obligatoire' },
      { type: 'minlength', message: 'Vous devez remplir au moins 2 caracteres' },
      { type: 'pattern', message: 'Rentrer une  raison sociale valide' }
    ],
    'ninea': [
      { type: 'required', message: 'Le ninea est obligatoire' },
      { type: 'minlength', message: 'Vous devez remplir au moins 2 caracteres' },
      { type: 'pattern', message: 'Rentrer un ninea valide' }
    ],
    'adresse': [
      { type: 'required', message: 'L\' adresse est obligatoire' },
      { type: 'minlength', message: 'Vous devez remplir au moins 2 caracteres' },
      { type: 'pattern', message: 'Rentrer une adresse valide' }
    ],
    'emailEntreprise': [
      { type: 'required', message: 'L\' email est obligatoire' },
      { type: 'minlength', message: 'Vous devez remplir au moins 2 caracteres' },
      { type: 'email', message: 'Vous devez remplir un email valide' },
      { type: 'pattern', message: 'Rentrer un email valide' }
    ],
    'telephoneEntreprise': [
      { type: 'required', message: 'Le téléphone est obligatoire' },
      { type: 'minlength', message: 'Vous devez remplir au moins 2 caracteres' },
      { type: 'pattern', message: 'Rentrer un téléphone valide' }
    ],
    'nom': [
      { type: 'required', message: 'Le nom est obligatoire' },
      { type: 'minlength', message: 'Vous devez remplir au moins 2 caracteres' },
      { type: 'pattern', message: 'Rentrer un nom valide' }
    ],
    'username': [
      { type: 'required', message: 'Le login est obligatoire' },
      { type: 'minlength', message: 'Vous devez remplir au moins 2 caracteres' },
      { type: 'pattern', message: 'Rentrer un login valide' }
    ],
    'password': [
      { type: 'required', message: 'Le mot de passe est obligatoire' },
      { type: 'minlength', message: 'Vous devez remplir au moins 2 caracteres' },
      { type: 'pattern', message: 'Rentrer un login valide' }
    ],
    'confirmPassword': [
      { type: 'required', message: 'La confirmation est obligatoire' },
      { type: 'minlength', message: 'Vous devez remplir au moins 2 caracteres' },
      { type: 'pattern', message: 'Rentrer un mot de passe valide' }
    ],
    'email': [
      { type: 'required', message: 'L\' email est obligatoire' },
      { type: 'minlength', message: 'Vous devez remplir au moins 2 caracteres' },
      { type: 'email', message: 'Vous devez remplir un email valide' },
      { type: 'pattern', message: 'Rentrer un email valide' }
    ],
    'telephone': [
      { type: 'required', message: 'Le téléphone est obligatoire' },
      { type: 'minlength', message: 'Vous devez remplir au moins 2 caracteres' },
      { type: 'pattern', message: 'Rentrer un téléphone valide' }
    ],
    'nci': [
      { type: 'required', message: 'Le nci est obligatoire' },
      { type: 'minlength', message: 'Vous devez remplir au moins 2 caracteres' },
      { type: 'pattern', message: 'Rentrer un nci valide' }
    ],
    'profil': [
      { type: 'required', message: 'Le profil est obligatoire' },
      { type: 'minlength', message: 'Vous devez remplir au moins 2 caracteres' },
      { type: 'pattern', message: 'Rentrer un profil valide' }
    ],
    'image': [
      { type: 'required', message: 'L\' image obligatoire' }
    ]
  }
  constructor(private formBuilder: FormBuilder,
              private entrepriseService: EntrepriseService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }
  initForm(){
    this.entrepriseForm=this.formBuilder.group({   
      raisonSociale:['',[Validators.required,Validators.minLength(2)]],
      ninea:['',[Validators.required,Validators.minLength(2),Validators.pattern(/[0-9]/)]],
      adresse:['',[Validators.required,Validators.minLength(2)]],
      emailEntreprise:['',[Validators.required,Validators.email,Validators.minLength(2)]],
      telephoneEntreprise:['',[Validators.required,Validators.minLength(2),Validators.pattern(/[0-9]/)]],
      nom:['',[Validators.required,Validators.minLength(2),,Validators.pattern(/[a-z-A-Z]/)]],
      username:['',[Validators.required,Validators.minLength(2)]],
      password: ['azerty',[Validators.required,Validators.minLength(2),,Validators.pattern(/[0-9a-z-A-Z]/)]],//comme ca le password va contenir au moins 2 caracteres
      confirmPassword:['azerty',[Validators.required,Validators.minLength(2),]],
      email:['',[Validators.required,Validators.email,Validators.minLength(2)]],
      telephone:['',[Validators.required,Validators.minLength(2),Validators.pattern(/[0-9]/)]],
      nci:['',[Validators.required,Validators.minLength(2),Validators.pattern(/[0-9]/)]],
      image:['']
    });
  }
  onSubmit(){
    this.entrepriseService.addEntreprise(this.entrepriseForm.value,this.fileToUpload).then(
        (rep)=>{
          if(rep[0] && rep[0].property_path){
            this.entrepriseService.errerForm(rep);
          }else{
            Swal.fire({
              title: '<strong>Partenaire enregistré</strong>',
              type: 'success',
              html:
                   '<p>Raison Sosiale : '+this.entrepriseForm.value.raisonSociale+'</p>'
                  +'<p>Pays : Sénégal </p>'
                  +'<p>Adresse : '+this.entrepriseForm.value.adresse+'</p>'
                  +'<p>'+rep.compte+'</p>'
                  +'<h2>Responsable</h2>'
                  +'<p>Nom : '+this.entrepriseForm.value.nom+'</p>'
                  +'<p>Login : '+this.entrepriseForm.value.username+'</p>'
                  +'<p>NCI : '+this.entrepriseForm.value.nci+'</p>'
                  +'<p>Téléphone : '+this.entrepriseForm.value.telephone+'</p>'
                  +'<p>Email : <strong>'+this.entrepriseForm.value.email+'</strong></p>',
              showCloseButton: false,
              focusConfirm: false,
              confirmButtonText:
                '<i class="fa fa-thumbs-up"></i> Ok',
              confirmButtonAriaLabel: 'Thumbs up, great!',
            }).then((result) => {
              if (result.value) {
                this.router.navigate(['/contrat',this.entrepriseForm.value.raisonSociale]);
              }
            })
            
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
  handleFileInput(file:FileList){
     this.fileToUpload=file.item(0);
    console.log( this.fileToUpload);
    var reader=new FileReader();
    reader.onload=(event:any)=>{
      this.imageUrl=event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
    console.log(this.imageUrl)
    
  }
}
