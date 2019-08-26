import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import { Entreprise } from 'src/app/models/Entreprise.model';
import Swal from 'node_modules/sweetalert2/dist/sweetalert2.js';
import { EntrepriseFormComponent } from '../entreprise-form/entreprise-form.component';
@Component({
  selector: 'app-update-entreprise',
  templateUrl: './update-entreprise.component.html',
  styleUrls: ['./update-entreprise.component.scss']
})
export class UpdateEntrepriseComponent implements OnInit {
  entrepriseUpdForm: FormGroup;
  errorMessage: string;
  entrepriseUpd:Entreprise;
  id:number;
  charger:boolean=false;
  constructor(private formBuilder: FormBuilder,
              private entrepriseService: EntrepriseService,
              private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    
    this.id=this.route.snapshot.params['id'];
    this.entrepriseService.recupEntreprise(+this.id).then(
      rep=>{
        this.entrepriseUpd=rep;
        this.initForm();//on initialise le formulaire si la promesse est resolue
        this.charger=true;//pour attendre que la promesse soit resolue avant d'afficher le formulaire
      },
      error=>{
        console.log(error);
      }
    );
  }
  initForm(){
     this.entrepriseUpdForm=this.formBuilder.group({   
      raisonSociale:[this.entrepriseUpd.raisonSociale,[Validators.required]],
      ninea:[this.entrepriseUpd.ninea,[Validators.required,Validators.pattern(/[0-9]{2,}/)]],
      adresse:[this.entrepriseUpd.adresse,[Validators.required]],
      emailEntreprise:[this.entrepriseUpd.emailEntreprise,[Validators.required,Validators.email]],
      telephoneEntreprise:[this.entrepriseUpd.telephoneEntreprise,[Validators.required,Validators.pattern(/[0-9]{2,}/)]]
    });
     
  }
    onSubmit(){
    const raisonSociale=this.entrepriseUpdForm.get('raisonSociale').value;
    const ninea=this.entrepriseUpdForm.get('ninea').value;
    const adresse=this.entrepriseUpdForm.get('adresse').value;
    const emailEntreprise=this.entrepriseUpdForm.get('emailEntreprise').value;
    const telephoneEntreprise=this.entrepriseUpdForm.get('telephoneEntreprise').value;
    const entreprise=new Entreprise(raisonSociale, ninea, adresse,telephoneEntreprise, emailEntreprise,+this.id);//le + c est pour le caster en number
    this.entrepriseService.updateEntreprise(entreprise).subscribe(
        (rep)=>{
          if(rep[0] && rep[0].property_path){
             this.entrepriseService.errerForm(rep);
          }else{
            Swal.fire(
              'Modification',
              rep.message,
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
}
