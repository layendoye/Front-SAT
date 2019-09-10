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
  selector: 'app-transaction-graph',
  templateUrl: './transaction-graph.component.html',
  styleUrls: ['./transaction-graph.component.scss']
})
export class TransactionGraphComponent implements OnInit {
  envois:any;
  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    setTimeout(()=>{
      this.getEnvois();
    },1000)
    
  }
  getEnvois(){
    const data={
      action:"envois",
      dateDebut:"2019-01-01",
      dateFin:new Date(),
      idUser:0
    };
    if(localStorage.getItem("roles").search("ROLE_Super-admin")>=0){
      data.idUser=-1;//pour avoir tous les transactions
    }
    else if(localStorage.getItem("roles").search("ROLE_utilisateur")>=0){
      data.idUser=(+localStorage.getItem("idUser"));//pour avoir tous les transactions
    }
    // if(localStorage.getItem("roles").search("ROLE_admin-Principal")>=0 || 
    //    localStorage.getItem("roles").search("ROLE_admin")>=0 || 
    //    localStorage.getItem("roles").search("ROLE_utilisateur")>=0){
    //     window.location.reload();
    // }
    this.transactionService.historiqueTransaction(data).then(
      response=>{
          this.envois=response;
          const tab=this.getHistoEnvois(response);
          this.grath(tab[0],tab[1])
      },
      error=>{
        console.log(error);
      }
    );
  }
  grath(date:any,envois:any){
    const options: any = {
      chart: {
        type: 'areaspline'
      },
      title: {
        text: 'Envois'
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
        name: 'Envois',
        data: envois
      }
      //, {name: 'Retraits',data: retrait}
    ]
    }
    Highcharts.chart('envois', options);
  }
  getHistoEnvois(data:any){
    var tabDate=[];
    var tabEnvois=[];
    var montant=0;
    for(var i=0;i<data.length-1;i++){
      var date1=data[i].dateEnvoi.slice(0, 10);
      var date2=data[i+1].dateEnvoi.slice(0, 10);
      if(date1!=date2){
        tabDate.push(data[i].dateEnvoi.slice(0, 10));//il va peut etre manquer la dernier
      }
    }
    tabDate.push(data[data.length-1].dateEnvoi.slice(0, 10));//le dernier
    for(var j=0;j<tabDate.length;j++){//pour chaque bonne date
      montant=0;
      for(var i=0;i<data.length;i++){//additionner les montants
        if(tabDate[j]==data[i].dateEnvoi.slice(0, 10)){
          montant=montant+data[i].montant;
        }
      }
      tabEnvois.push(montant);
    }
    return [tabDate,tabEnvois];
  }
    afficheDate(laDate:any){
    var lAnne = laDate.slice(0, 4);
    var leMois = laDate.slice(5, 7) - 1;
    var leJour = laDate.slice(8, 10);
    return leJour+'-'+leMois+'-'+lAnne;
  }
}
