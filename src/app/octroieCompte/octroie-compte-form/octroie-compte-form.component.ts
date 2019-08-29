import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import Swal from 'node_modules/sweetalert2/dist/sweetalert2.js';
import { Utilisateur } from 'src/app/models/Utilisateur.model';
import { Compte } from 'src/app/models/Compte.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
export interface Histo {
  dateAffectation:string, 
  numeroCompte:string
}
@Component({
  selector: 'app-octroie-compte-form',
  templateUrl: './octroie-compte-form.component.html',
  styleUrls: ['./octroie-compte-form.component.scss']
})
export class OctroieCompteFormComponent implements OnInit {
  displayedColumns: string[] = ['dateAffectation', 'numeroCompte'];
  dataSource: MatTableDataSource<Histo>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  affectationForm: FormGroup;
  userForm: FormGroup;
  errorMessage: string;
  users:Utilisateur[];
  comptes:Compte[];
  userChoisi= new Utilisateur('','','','','','','','','',0);
  afficherFormUser:boolean=false;
  afficherTableau:boolean=false;
  compteUserChoisi:string='';
  anciensComptes:any[];
  constructor(private formBuilder: FormBuilder,
              private entrepriseService: EntrepriseService,
              private router: Router,private route: ActivatedRoute) { }
  ngOnInit() {
    
    
    this.entrepriseService.getUsers().then(//pour le select des users
      users=>{
        this.users=users;
      },error=>{
        console.log('Erreur : '+error)
      }
    );
    this.entrepriseService.getCompte().then(//pour le select des comptes
      comptes=>{
        this.comptes=comptes;
      },error=>{
        console.log('Erreur : '+error)
      }
    );
    this.initForm1();
  }
  initForm1(){//celui de l affectation des compte
    this.affectationForm=this.formBuilder.group({   
      utilisateur:['',[Validators.required]],
      compte:['',[Validators.required]]
    });
  }
  initForm2(){//celui des info user
    if(this.userChoisi.roles){
      var poste=this.poste(this.userChoisi.roles);
    }    
     this.userForm=this.formBuilder.group({   
      nom:[this.userChoisi.nom,[Validators.required,Validators.pattern(/[a-z-A-Z]{2,}/)]],
      email:[this.userChoisi.email,[Validators.required,Validators.email]],
      telephone:[this.userChoisi.telephone,[Validators.required,Validators.pattern(/[0-9]{2,}/)]],
      nci:[this.userChoisi.nci,[Validators.required,Validators.pattern(/[0-9]{2,}/)]],
      poste:[poste,[Validators.required]],
      compteActu:[this.compteUserChoisi,[Validators.required]]
    });
  }
  onSubmit(){//submit affectation compte
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
          Swal.fire(
              'Cet utilisateur est déja affecté à ce compte',
              '',
              'error'
            )
          console.log('Erreur : ' + error.message);
        }
      );
      
  }
  
  getUserChoisi(id:number){//quand on choisi un user
    for(var i=0;i<this.users.length;i++){
      if(this.users[i].id==id){
        this.userChoisi=this.users[i];//on recupere le userChoisi
      }
    }
    this.entrepriseService.getCompteActuel(id).then(//on recupere le compte actuel
      rep=>{
        this.compteUserChoisi=rep.compte.numeroCompte;
        this.afficherFormUser=true;
        this.initForm2();
        
      },error=>{
        console.log('Erreur : '+ error)
      }
    );
    this.afficherTableau=true;
    this.entrepriseService.getComptesUser(id).then(data=>{
      this.anciensComptes=data;
      this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error=>console.log('Erreur : '+error)
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
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
