import { EntrepriseService } from './../services/entreprise.service';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { DepotGraphComponent } from './depot-graph/depot-graph.component';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})
export class DashbordComponent implements OnInit {
  nbreUsers:number;
  nbrPart:number;
  afficherPart:boolean=false;
  nbreCompte:number;
  soldePartenaire:number=0;
  soleSAT:number;
  soldeEtat:number;
  SupAdmin:boolean=false;
  Responsable:boolean=false;
  lesDeux:boolean=false;
  caissier=false;
  moyenneDepot:number=0;
  nbrDepots:number=0;
  nbrComptes:any=0;
  depots:any;
  constructor(private entrepriseService:EntrepriseService,private header:HeaderComponent,private depoGraph:DepotGraphComponent) { }

  ngOnInit() {
    this.permission();
    this.header.ngOnInit();
    if(this.lesDeux){
      this.getNbrUsers();
      this.getNbrPartenaires();
      this. getNbrCompte();
    }
    if(this.caissier){
      this. getMoyenneDepot();
    }   
  }
  getMoyenneDepot(){
    const id=localStorage.getItem("idUser");
    this.entrepriseService.getAllDepot(+id).then(
      response=>{
          this.moyenneDepot=response[1];
          this.nbrDepots=response[0].length;
          this.depots=response[0];
          this.nbrComptes=this.getNbrCompteDepot(response[0]);
      },
      error=>{
        console.log(error);
      }
    );
  }
  permission(){
    const roles=localStorage.getItem("roles");
    if(roles.search("ROLE_Super-admin")>=0 || roles.search("ROLE_admin-Principal")>=0 || roles.search("ROLE_admin")>=0){
      this.lesDeux=true;
    }
    if(roles.search("ROLE_Super-admin")>=0){
      this.SupAdmin=true;
    }
    else if(roles.search("ROLE_admin-Principal")>=0 || roles.search("ROLE_admin")>=0){
      this.Responsable=true;
    }
    else if(roles.search("ROLE_Caissier")>=0){
      this.caissier=true;
    }
  }
  getNbrUsers(){
    this.entrepriseService.getUsers().then(
      rep=>{
        this.nbreUsers=rep.length
      },
      error=>console.log(error)
    );
  }
  getNbrPartenaires(){
    if(this.SupAdmin)
      this.entrepriseService.getEntreprise().then(
        rep=>{
          this.nbrPart=rep.length;
          this.afficherPart=true;
        },
        error=>console.log(error)
      );
  }
  getNbrCompte(){
    if(this.SupAdmin){
      this.entrepriseService.getAllCompte().then(
        rep=>{
          this.nbreCompte=rep.length-2;//-2 pour le compte etat et SAT
          for(var i=0;i<rep.length;i++){
            this.soldePartenaire+=rep[i].solde;
          }
          this.soldePartenaire=this.soldePartenaire-rep[0].solde-rep[1].solde;//sachant que le 0 est le compte de SAT et le 1 le compte de l 'etat
          this.soleSAT=rep[0].solde;
          this.soldeEtat=rep[1].solde;
        },
        error=>console.log(error)
      );
    }
    else if(this.Responsable){
      const idPart=localStorage.getItem("idEntreprise");
      this.entrepriseService.getComptesEntreprise(+idPart).then(
        rep=>{
          this.nbreCompte=rep.length;//-2 pour le compte etat et SAT
          for(var i=0;i<rep.length;i++){
            this.soldePartenaire+=rep[i].solde;
          }
        },
        error=>console.log(error)
      );
    }
  }
  getNbrCompteDepot(depots:any){
    var tabCompte=[];
    for(var i=0;i<depots.length;i++){//tab de compte
      tabCompte.push(depots[i].compte.id)
    }
    for (i = 1; i < tabCompte.length; i++) {//trier les comptes 
			var cle = tabCompte[i];
			var j = i;
			while ((j >= 1) && (tabCompte[j - 1] > cle)) {
				tabCompte[j]  = tabCompte[j - 1] ;
				j = j - 1;
			}
			tabCompte[j] = cle;
    }
    var nbr=0;
    for(i=0;i<tabCompte.length-1;i++){
      if(tabCompte[i]!=tabCompte[i+1]){
        nbr++;
      }
    }
    nbr++;//pour le dernier
    return nbr;
  }
}
