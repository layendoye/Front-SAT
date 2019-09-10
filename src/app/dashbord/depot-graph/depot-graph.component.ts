import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { TransactionService } from './../../services/transaction.service';
import { EntrepriseService } from 'src/app/services/entreprise.service';
declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-depot-graph',
  templateUrl: './depot-graph.component.html',
  styleUrls: ['./depot-graph.component.scss']
})
export class DepotGraphComponent implements OnInit {
  depot:any;
  moyenneDepot:number;
  constructor(private transactionService: TransactionService,private entrepriseService:EntrepriseService) { }

  ngOnInit() {
    setTimeout(()=>{
      this.getDepot();
    },1000)
  }
  getDepot(){
    const id=localStorage.getItem("idUser");
    this.entrepriseService.getAllDepot(+id).then(
      response=>{
          this.depot=response[0];//1 moyenne depots
          this.moyenneDepot=response[1];
          const tab=this.getHistoDepot(response[0]);
          this.grath(tab[0],tab[1])
      },
      error=>{
        console.log(error);
      }
    );
  }
  grath(date:any,depots:any){
    const options: any = {
      chart: {
        type: 'areaspline'
      },
      title: {
        text: 'Dêpots'
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
        categories: this.afficheDate(date),
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
        name: 'Dêpots',
        data: depots
      }
      //, {name: 'Retraits',data: retrait}
    ]
    }
    Highcharts.chart('depot', options);
  }
  getHistoDepot(data:any){
    var tabDate=[];
    var tabDepot=[];
    var montant=0;
    for(var i=0;i<data.length-1;i++){
      var date1=data[i].date.slice(0, 10);
      var date2=data[i+1].date.slice(0, 10);
      if(date1!=date2){
        tabDate.push(data[i].date.slice(0, 10));//il va peut etre manquer la dernier
      }
    }
    tabDate.push(data[data.length-1].date.slice(0, 10));//le dernier
    for(var j=0;j<tabDate.length;j++){//pour chaque bonne date
      montant=0;
      for(var i=0;i<data.length;i++){//additionner les montants
        if(tabDate[j]==data[i].date.slice(0, 10)){
          montant=montant+data[i].montant;
        }
      }
      tabDepot.push(montant);
    }
    return [tabDate,tabDepot];
  }
  afficheDate(tabDate:any){
    for(var i=0;i<tabDate.length;i++){
      var lAnne = tabDate[i].slice(0, 4);
      var leMois = tabDate[i].slice(5, 7);
      var leJour = tabDate[i].slice(8, 10);
      tabDate[i]=leJour+'-'+leMois+'-'+lAnne;
    }
    return tabDate;
  }

}
