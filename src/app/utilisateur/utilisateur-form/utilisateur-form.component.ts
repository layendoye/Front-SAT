import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'node_modules/sweetalert2/dist/sweetalert2.js';
import { SecurityService } from 'src/app/services/security.service';
import { Utilisateur } from 'src/app/models/Utilisateur.model';
import { Profil } from 'src/app/models/Profil.model';
import { EntrepriseService } from 'src/app/services/entreprise.service';
@Component({
  selector: 'app-utilisateur-form',
  templateUrl: './utilisateur-form.component.html',
  styleUrls: ['./utilisateur-form.component.scss']
})
export class UtilisateurFormComponent implements OnInit {
  imageUrl:string="assets/img/exemple.png";//pour l image par defaut au chargement du formulaire
  fileToUpload:File=null;
  userForm: FormGroup;
  errorMessage: string;
  profils: Profil[] = [];
  role: string = localStorage.getItem('roles');
  userUpd = new Utilisateur('','','','','','','','','',0);
  id: number
  update: boolean = false;
  charger: boolean = false;
  constructor(private formBuilder: FormBuilder, private router: Router,
    private securityService: SecurityService, private route: ActivatedRoute,
    private entrepriseService: EntrepriseService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
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
    } else {
      this.charger=true;
      this.initForm(this.userUpd);
    }

    this.securityService.getProfil().then(
      profil => {//tableau des profils
        if (this.role.search('ROLE_Super-admin') != -1) {
          this.profils = [profil[0], profil[1]];
        }
        else {
          this.profils = [profil[2], profil[3], profil[4]];
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
       user.password=user.confirmPassword="azerty";//juste pour l'affichier sur l input car le mot de passe ne sera pas modifié ici
    }
      
    this.userForm=this.formBuilder.group({   
      nom:[user.nom,[Validators.required,Validators.pattern(/[a-z-A-Z]{2,}/)]],
      username:[user.username,[Validators.required]],
      password: [user.password,[Validators.required,Validators.pattern(/[0-9a-z-A-Z]{2,}/)]],//comme ca le password va contenir au moins 2 caracteres
      confirmPassword:[user.confirmPassword,[Validators.required]],
      email:[user.email,[Validators.required,Validators.email]],
      telephone:[user.telephone,[Validators.required,Validators.pattern(/[0-9]{2,}/)]],
      nci:[user.nci,[Validators.required,Validators.pattern(/[0-9]{2,}/)]],
      profil:[idProfil,[Validators.required]],
      image:['']
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
    const image = this.fileToUpload.name;
    const imageFile = this.fileToUpload;
    console.log(this.userForm);
    const user = new Utilisateur(nom, username, password, email, telephone, nci, confirmPassword, profil, image,0,'',imageFile);
    if(!this.update){
      this.securityService.addUser(user).then(
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
            this.router.navigate(['entreprises/liste']);
          }
        },
        (error) => {
           this.remplirChamp()
          console.log('Erreur : ' + error.message);
        }
      );
    }
    else{
      this.entrepriseService.updateUser(user,this.id).subscribe(
        (rep)=>{
          if(rep[0] && rep[0].property_path){
             this.entrepriseService.errerForm(rep);
          }else{
            Swal.fire(
              'Modification',
              rep.message,
              'success'
            )
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
    // console.log(this.profils)
    // console.log(role[0])
    // for(var i=0;i<this.profils.length;i++){
    //   if(this.profils[i]==role[0]){
    //     id=i;
    //   }
    // }
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