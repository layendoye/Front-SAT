import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'node_modules/sweetalert2/dist/sweetalert2.js';
import { SecurityService } from 'src/app/services/security.service';
import { Utilisateur } from 'src/app/models/Utilisateur.model';
import { Profil } from 'src/app/models/Profil.model';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import { HeaderComponent } from 'src/app/header/header.component';

@Component({
  selector: 'app-utilisateur-form',
  templateUrl: './utilisateur-form.component.html',
  styleUrls: ['./utilisateur-form.component.scss']
})
export class UtilisateurFormComponent implements OnInit {
  imageUrl:string="assets/img/exemple.jpg";//pour l image par defaut au chargement du formulaire
  fileToUpload:File=null;
  userForm: FormGroup;
  errorMessage: string;
  profils: Profil[] = [];
  role: string = localStorage.getItem('roles');
  userUpd = new Utilisateur('','','','','','','','','',0);
  id: number
  update: boolean = false;
  charger: boolean = false;

  SesParametres=false;
  // ValidationMsg = {
  //   'nom': [
  //     { type: 'required', message: 'Le nom est obligatoire' },
  //     { type: 'minlength', message: 'Vous devez remplir au moins 2 caracteres' },
  //     { type: 'maxlength', message: 'Username cannot be more than 25 characters long' },
  //     { type: 'pattern', message: 'Rentrer un login valide' },
  //     { type: 'validUsername', message: 'Your username has already been taken' }
  //   ]
  // }
  ValidationMsg = {
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
      { type: 'required', message: 'L\'email est obligatoire' },
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
      { type: 'required', message: 'L\'image obligatoire' }
    ]
  }
  constructor(private formBuilder: FormBuilder, private router: Router,
    private securityService: SecurityService, private route: ActivatedRoute,
    private entrepriseService: EntrepriseService, private header:HeaderComponent) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if(this.id== +localStorage.getItem("idUser")){
      this.SesParametres=true;
    }

    if (this.id) {
      this.updateFunction();
    } 
    else {
      this.charger=true;
      this.initForm(this.userUpd);
    }

    this.getProfil();
  }
  updateFunction(){
    this.update=true;
      this.entrepriseService.recupUser(+this.id).then(
        rep => {
          this.userUpd = rep;
          this.charger=true;
          this.initForm(this.userUpd);//on initialise le formulaire si la promesse est resolue
          
        },
        error => {
          console.log(error);
        }
      );
  }
  getProfil(){
    this.securityService.getProfil().then(
      profil => {//tableau des profils
        if (this.role.search('ROLE_Super-admin') != -1 || this.role.search('ROLE_Caissier') != -1) {
          this.profils = [profil[0], profil[1]];
        }
        else {
          this.profils = [profil[2],profil[3], profil[4]];
        }
        //console.log(profil);
      }
    )
  }
  initForm(user: Utilisateur) {
    console.log(user);
    var idProfil=0;
    if(user.roles){
      idProfil=this.getidProfil(user.roles)
    }
    console.log(idProfil);
    user.password=user.confirmPassword="azerty";//juste pour l'afficher sur l input car le mot de passe ne sera pas modifié ici
    this.userForm=this.formBuilder.group({   
      nom:[user.nom,[Validators.required,Validators.minLength(2),Validators.pattern(/[a-z-A-Z]/)]],
      username:[user.username,[Validators.required,Validators.minLength(2)]],
      password: [user.password,[Validators.required,Validators.minLength(2),Validators.pattern(/[0-9a-z-A-Z]/)]],//comme ca le password va contenir au moins 2 caracteres
      confirmPassword:[user.confirmPassword,[Validators.required,Validators.minLength(2),Validators.pattern(/[0-9a-z-A-Z]/)]],
      email:[user.email,[Validators.required,Validators.email,Validators.minLength(2)]],
      telephone:[user.telephone,[Validators.required,Validators.minLength(2),Validators.pattern(/[0-9]/)]],
      nci:[user.nci,[Validators.required,Validators.minLength(2),Validators.pattern(/[0-9]{2,}/)]],
      profil:[idProfil,[Validators.required]],
      image:[user.image,[Validators.required]]
    });
  }
  onSubmit() {
    const nom = this.userForm.get('nom').value;
    const username = this.userForm.get('username').value;
    const password = this.userForm.get('password').value;
    const confirmPassword = this.userForm.get('confirmPassword').value;
    const email = this.userForm.get('email').value;
    const telephone = this.userForm.get('telephone').value;
    const nci = this.userForm.get('nci').value;
    const profil = this.userForm.get('profil').value;
    var image='';//s il n y a pas d image
    if(this.fileToUpload)
      image = this.fileToUpload.name;
    const imageFile = this.fileToUpload;
 
    const formData:FormData=new FormData();
    formData.append('image',imageFile,image)
    formData.append('nom',nom)
    formData.append('username',username)
    formData.append('email',email)
    formData.append('telephone',telephone)
    formData.append('nci',nci)
    formData.append('profil',profil)
    if(this.SesParametres && password != "azerty" || !this.update){
      formData.append('password',password)//car dans le update on ne modifie pas le mot de passe
      formData.append('confirmPassword',confirmPassword)
    }
   
    if(!this.update){
      this.securityService.addUser(formData).then(
        (rep) => {
          if (rep[0] && rep[0].property_path) {
            this.securityService.errerForm(rep);
          } else {
            console.log(rep)
            Swal.fire(
              'Utilisateur enregistré',
              rep.message,
              'success'
            )
            this.router.navigate(['/lister/users']);
          }
        },
        (error) => {
           this.remplirChamp()
          console.log('Erreur : ' + error.message);
        }
      );
    }
    else{
      this.entrepriseService.updateUser(formData,this.id).subscribe(
        (rep)=>{
          if(rep[0] && rep[0].property_path){
            this.entrepriseService.errerForm(rep);
          }else{
            Swal.fire(
              'Modification',
              rep.message,
              'success'
            )
            this.header.ngOnInit();
           this.router.navigate(['/lister/users']);
          }
          console.log(rep);
        },
        (error)=>{
          this.remplirChamp()
          console.log('Erreur : '+error.message);
        }
      );
    }
    
  }
  getidProfil(role:any){
    var id=0;
    if(role[0]=='ROLE_Super-admin'){
      id=1;
    }else if(role[0]=='ROLE_Caissier'){
      id=2;
    }else if(role[0]=='ROLE_admin-Principal'){
      id=3;
    }else if(role[0]=='ROLE_admin'){
      id=4;
    }else if(role[0]=='ROLE_utilisateur'){
      id=5
    }
    return id;
  }
  remplirChamp(){
    Swal.fire(
      'Erreur',
      'Veuillez remplir tous les champs',
      'error'
    )
  }
  handleFileInput(file:FileList){
    this.fileToUpload=file.item(0);
    console.log( this.fileToUpload);
    var reader=new FileReader();
    reader.onload=(event:any)=>{
      this.imageUrl=event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
    
  }
}