import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import Swal from 'node_modules/sweetalert2/dist/sweetalert2.js';
import { Utilisateur } from 'src/app/models/Utilisateur.model';
import { Compte } from 'src/app/models/Compte.model';
declare var $;

@Component({
  selector: 'app-octroie-compte-form',
  templateUrl: './octroie-compte-form.component.html',
  styleUrls: ['./octroie-compte-form.component.scss']
})
export class OctroieCompteFormComponent implements OnInit {
 @ViewChild('dataTable') table;
  dataTable: any;
  dtOption: any = {}; 
  affectationForm: FormGroup;
  userForm: FormGroup;
  errorMessage: string;
  users:Utilisateur[];
  comptes:Compte[];
  userChoisi= new Utilisateur('','','','','','','','','',0);
  afficherFormUser:boolean=false;
  afficherTableau:boolean=false;
  constructor(private formBuilder: FormBuilder,
              private entrepriseService: EntrepriseService,
              private router: Router,private route: ActivatedRoute) { }
  ngOnInit() {
    
    this .dtOption = { 
      "aLengthMenu": [[3,10, 25, 50, -1], [3,10, 25, 50, "All"]]
     }; 
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable(this.dtOption);
    this.entrepriseService.getUsers().then(//pour le select des users
      users=>{
        this.users=users;
      },error=>{
        console.log('Erreur : '+error)
      }
    );
    this.entrepriseService.getCompte().then(//pour le select des users
      comptes=>{
        this.comptes=comptes;
      },error=>{
        console.log('Erreur : '+error)
      }
    );
    this.initForm1();
  }
  initForm1(){
    this.affectationForm=this.formBuilder.group({   
      utilisateur:['',[Validators.required,Validators.pattern(/[a-z-A-Z]{2,}/)]],
      compte:['',[Validators.required]]
    });
    
  }
  initForm2(){
    if(this.userChoisi.roles){
      var poste=this.poste(this.userChoisi.roles);
    }    
     this.userForm=this.formBuilder.group({   
      nom:[this.userChoisi.nom,[Validators.required,Validators.pattern(/[a-z-A-Z]{2,}/)]],
      email:[this.userChoisi.email,[Validators.required,Validators.email]],
      telephone:[this.userChoisi.telephone,[Validators.required,Validators.pattern(/[0-9]{2,}/)]],
      nci:[this.userChoisi.nci,[Validators.required,Validators.pattern(/[0-9]{2,}/)]],
      poste:[poste,[Validators.required]],
      soldeActu:['',[Validators.required]]
    });
  }
  onSubmit(){
    console.log(this.affectationForm.value)
    this.entrepriseService.affecterCompt(this.affectationForm.value).then(
        (rep) => {
          if (rep[0] && rep[0].property_path) {
            this.entrepriseService.errerForm(rep);
          } else {
            Swal.fire(
              'Affectation',
              rep.message,
              'success'
            )
            this.router.navigate(['/lister/users']);
          }
        },
        (error) => {
          console.log('Erreur : ' + error.message);
        }
      );
  }
  poste(roles:any){
    var poste;
    if(roles[0]=='ROLE_Super-admin' || roles[0]=='ROLE_admin-Principal' || roles[0]=='ROLE_admin'){
      poste='Administrateur';
    }
    else if(roles[0]=='ROLE_Caissier'){
      poste='Caissier';
    }
     else if(roles[0]=='ROLE_utilisateur'){
      poste='Guichetier';
    }
    return poste;
  }
  getUserChoisi(id:number){
    for(var i=0;i<this.users.length;i++){
      if(this.users[i].id==id){
        this.userChoisi=this.users[i];
      }
    }
    this.afficherTableau=true;
    this.afficherFormUser=true;
    this.initForm2();
    console.log(this.userChoisi);
  }
}
