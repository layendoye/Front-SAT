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
import { TransactionFormComponent } from './transaction/transaction-form/transaction-form.component';
import { DepotFormComponent } from './depot/depot-form/depot-form.component';
import { OctroieCompteFormComponent } from './octroieCompte/octroie-compte-form/octroie-compte-form.component';
import { LoginComponent } from './security/login/login.component';
import { EntrepriseListComponent } from './entreprise/entreprise-list/entreprise-list.component';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DataTablesModule } from 'angular-datatables';
import { AuthGuard } from './services/auth-guard.service';
import { UpdateEntrepriseComponent } from './entreprise/update-entreprise/update-entreprise.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EntrepriseFormComponent,
    UtilisateurFormComponent,
    TransactionFormComponent,
    DepotFormComponent,
    OctroieCompteFormComponent,
    LoginComponent,
    EntrepriseListComponent,
    SidebarComponent,
    UpdateEntrepriseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,//pour les forms
    ReactiveFormsModule,//pour les forms
    HttpClientModule,//pour les requettes http
  ],
  providers: [
    SecurityService,
    EntrepriseService,
    TransactionService,
    EntrepriseFormComponent,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
