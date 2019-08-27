import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import Swal from 'node_modules/sweetalert2/dist/sweetalert2.js';
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
  initForm(){}
}
