import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import { Entreprise } from 'src/app/models/Entreprise.model';
import Swal from 'node_modules/sweetalert2/dist/sweetalert2.js';
import { EntrepriseFormComponent } from 'src/app/entreprise/entreprise-form/entreprise-form.component';
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
              private router: Router,private route: ActivatedRoute,private entrepriseFormComponent:EntrepriseFormComponent) { }


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
}
