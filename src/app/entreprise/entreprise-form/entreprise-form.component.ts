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
  imageUrl:string;
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
      password: ['',[Validators.required,Validators.minLength(2),,Validators.pattern(/[0-9a-z-A-Z]/)]],//comme ca le password va contenir au moins 2 caracteres
      confirmPassword:['',[Validators.required,Validators.minLength(2),]],
      email:['',[Validators.required,Validators.email,Validators.minLength(2)]],
      telephone:['',[Validators.required,Validators.minLength(2),Validators.pattern(/[0-9]/)]],
      nci:['',[Validators.required,Validators.minLength(2),Validators.pattern(/[0-9]/)]],
      image:['']
    });
  }
  onSubmit(){
    // const raisonSociale=this.entrepriseForm.get('raisonSociale').value;
    // const ninea=this.entrepriseForm.get('ninea').value;
    // const adresse=this.entrepriseForm.get('adresse').value;
    // const emailEntreprise=this.entrepriseForm.get('emailEntreprise').value;
    // const telephoneEntreprise=this.entrepriseForm.get('telephoneEntreprise').value;
    // const nom=this.entrepriseForm.get('nom').value;
    // const username=this.entrepriseForm.get('username').value;
    // const password=this.entrepriseForm.get('password').value;
    // const confirmPassword=this.entrepriseForm.get('confirmPassword').value;
    // const email=this.entrepriseForm.get('email').value;
    // const telephone=this.entrepriseForm.get('telephone').value;
    // const nci=this.entrepriseForm.get('nci').value;
    // const entreprise=new Entreprise(raisonSociale, ninea, adresse,telephoneEntreprise, emailEntreprise);
    // const user=new Utilisateur(nom,username,password,email,telephone,nci,confirmPassword);
    this.entrepriseService.addEntreprise(this.entrepriseForm.value,this.fileToUpload).subscribe(
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
  handleFileInput(file:FileList){
    this.fileToUpload=file.item(0);
    console.log( this.fileToUpload);
    var reader=new FileReader();
    reader.onload=(event:any)=>{
      this.imageUrl=event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
    Swal.fire({
      title: 'Image!',
      imageUrl: this.imageUrl,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Votre image',
      animation: false
    })
  }
}
