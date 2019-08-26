import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import Swal from 'node_modules/sweetalert2/dist/sweetalert2.js';
declare var $;
@Component({
  selector: 'app-depot-form',
  templateUrl: './depot-form.component.html',
  styleUrls: ['./depot-form.component.scss']
})
export class DepotFormComponent implements OnInit {
  @ViewChild('dataTable') table;
  dataTable: any;
  dtOption: any = {}; 
  depotForm: FormGroup;
  errorMessage: string;
  constructor(private formBuilder: FormBuilder,
              private entrepriseService: EntrepriseService,
              private router: Router,private route: ActivatedRoute) { }


  ngOnInit() {
    this.initForm();
    this .dtOption = { 
      "aLengthMenu": [[3,10, 25, 50, -1], [3,10, 25, 50, "All"]]
     }; 
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable(this.dtOption);
  }
  initForm(){
     this.depotForm=this.formBuilder.group({   
      numeroCompte:['',[Validators.required]],
      montant:['',[Validators.required,Validators.pattern(/[0-9]{2,}/)]],
    });
  }
  onSubmit(){
    const numeroCompte=this.depotForm.get('numeroCompte').value;
    const montant=this.depotForm.get('montant').value;
    this.entrepriseService.depot(numeroCompte,montant).then(
      rep=>{
        if(rep[0] && rep[0].property_path){
           this.entrepriseService.errerForm(rep);
        }else{
          Swal.fire({width: 400,
              title:'Dêpot effectué',
              text:rep.message,
              type: 'success'},

          )
         this.router.navigate(['entreprises/liste']);
        }
      },
      error=>{
        Swal.fire(
          'Erreur',
          error.message,
          'success'
        )
      }
    );
  }
}
