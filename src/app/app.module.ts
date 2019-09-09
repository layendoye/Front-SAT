import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { Routes, RouterModule } from '@angular/router';
import { SecurityService } from './services/security.service';
import { EntrepriseService } from './services/entreprise.service';
import { TransactionService } from './services/transaction.service';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { EntrepriseFormComponent } from './entreprise/entreprise-form/entreprise-form.component';
import { UtilisateurFormComponent } from './utilisateur/utilisateur-form/utilisateur-form.component';
import { DepotFormComponent } from './depot/depot-form/depot-form.component';
import { OctroieCompteFormComponent } from './octroieCompte/octroie-compte-form/octroie-compte-form.component';
import { LoginComponent } from './security/login/login.component';
import { EntrepriseListComponent } from './entreprise/entreprise-list/entreprise-list.component';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DataTablesModule } from 'angular-datatables';
import { AuthGuard } from './services/auth-guard.service';
import { UpdateEntrepriseComponent } from './entreprise/update-entreprise/update-entreprise.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{MaterialModule} from './material/material.module';
import { UtilisateurListComponent } from './utilisateur/utilisateur-list/utilisateur-list.component';
import { EnvoisComponent } from './transactions/envois/envois.component';
import { RetraisComponent } from './transactions/retrais/retrais.component';
import { SingleEntrepriseComponent } from './entreprise/single-entreprise/single-entreprise.component';
import { IsSuperAdminService } from './services/is-super-admin.service';
import { IsCaissierService } from './services/is-caissier.service';
import { IsAdminPrinService } from './services/is-admin-prin.service';
import { IsGuichetierService } from './services/is-guichetier.service';
import { SuperEtPrincipService } from './services/super-et-princip.service';
import { HistoriquesComponent } from './transactions/historiques/historiques.component';
import { ContratComponent } from './entreprise/contrat/contrat.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ListesComptesComponent } from './comptes/listes-comptes/listes-comptes.component';
import { HistoriquesComptesComponent } from './comptes/historiques-comptes/historiques-comptes.component';
import { TransactionGraphComponent } from './dashbord/transaction-graph/transaction-graph.component';
import { RetraitGaphComponent } from './dashbord/retrait-gaph/retrait-gaph.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EntrepriseFormComponent,
    UtilisateurFormComponent,
    DepotFormComponent,
    OctroieCompteFormComponent,
    LoginComponent,
    EntrepriseListComponent,
    SidebarComponent,
    UpdateEntrepriseComponent,
    UtilisateurListComponent,
    EnvoisComponent,
    RetraisComponent,
    SingleEntrepriseComponent,
    HistoriquesComponent,
    ContratComponent,
    DashbordComponent,
    ListesComptesComponent,
    HistoriquesComptesComponent,
    TransactionGraphComponent,
    RetraitGaphComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,//pour les forms
    ReactiveFormsModule,//pour les forms
    HttpClientModule, 
    BrowserAnimationsModule,//pour les requettes http
    MaterialModule
  ],
  providers: [
    SecurityService,
    EntrepriseService,
    TransactionService,
    AuthGuard,
    IsSuperAdminService,
    IsCaissierService,
    IsAdminPrinService,
    IsGuichetierService,
    SuperEtPrincipService,
    AppComponent,
    HeaderComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
