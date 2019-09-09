import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { TransactionService } from './../../services/transaction.service';
declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);
@Component({
  selector: 'app-retrait-gaph',
  templateUrl: './retrait-gaph.component.html',
  styleUrls: ['./retrait-gaph.component.scss']
})
export class RetraitGaphComponent implements OnInit {
  retrais:any;
  envois:any;
  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.getRetraits();
  }
  getRetraits(){
    const data={
      action:"retraits",
      dateDebut:"2019-01-01",
      dateFin:new Date(),
      idUser:0
    };
    this.transactionService.historiqueTransaction(data).then(
      response=>{
          this.retrais=response;
          console.log(response);
          console.log(this.getHistoRetraits(response));
          const tab=this.getHistoRetraits(response);
          this.grath(tab[0],tab[1])
      },
      error=>{
        console.log(error);
      }
    );
  }
  grath(date:any,retrais:any){
    const options: any = {
      chart: {
        type: 'areaspline'
      },
      title: {
        text: 'Retraits'
      },
      legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 150,
        y: 100,
        floating: true,
        borderWidth: 1,
        backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
      },
      xAxis: {
        categories: date,
        plotBands: [{ // visualize the weekend
          from: 4.5,
          to: 6.5,
          color: 'rgba(68, 170, 213, .2)'
        }]
      },
      yAxis: {
        title: {
          text: 'Montant'
        }
      },
      tooltip: {
        shared: true,
        valueSuffix: ' Fr'
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        areaspline: {
          fillOpacity: 0.5
        }
      },
      series: [{
        name: 'Retraits',
        data: retrais
      }
      //, {name: 'Retraits',data: retrait}
    ]
    }
    Highcharts.chart('retrait', options);
  }
  getHistoRetraits(data:any){
    var tabDate=[];
    var tabRetraits=[];
    var montant=0;
    for(var i=0;i<data.length-1;i++){
      var date1=data[i].dateReception.slice(0, 10);
      var date2=data[i+1].dateReception.slice(0, 10);
      if(date1!=date2){
        tabDate.push(data[i].dateReception.slice(0, 10));//il va peut etre manquer la dernier
      }
    }
    tabDate.push(data[data.length-1].dateReception.slice(0, 10));//le dernier

    for (i = 1; i < tabDate.length; i++) {//trier la date 
			var cle = tabDate[i];
			j = i;
			while ((j >= 1) && (new Date(tabDate[j - 1]) > new Date(cle))) {
				tabDate[j]  = tabDate[j - 1] ;
				j = j - 1;
			}
			tabDate[j] = cle;
		}


    for(var j=0;j<tabDate.length;j++){//pour chaque bonne date
      montant=0;
      for(var i=0;i<data.length;i++){//additionner les montants
        if(tabDate[j]==data[i].dateReception.slice(0, 10)){
          montant=montant+data[i].montant;
        }
      }
      tabRetraits.push(montant);
    }
    


    // for(var i=0;i<data.length;i++){
    //   tabDate.push(data[i].dateEnvoi.slice(0, 10));//il va peut etre manquer la dernier
    //   tabEnvois.push(data[i].montant);      
    // }
    return [tabDate,tabRetraits];
  }
}
