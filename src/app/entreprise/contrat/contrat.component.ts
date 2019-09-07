import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
@Component({
  selector: 'app-contrat',
  templateUrl: './contrat.component.html',
  styleUrls: ['./contrat.component.scss']
})
export class ContratComponent implements OnInit {
  laDate:Date=new Date();
  nomEntreprise:string;
  constructor() { }

  ngOnInit() {
    this.nomEntreprise="Orange SA";
    var doc = new jsPDF();
    doc.fromHTML($('#contrat').get(0),5,5,{'width':120});
    doc.save('recu.pdf')
    window.print();
  }

}
