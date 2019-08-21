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
const appRoutes: Routes=[
  { path:'connexion', component: LoginComponent },
  { path:'entreprises/liste', component: EntrepriseListComponent},
  { path:'inscription'/*,canActivate:[AuthGuardService]*/, component: UtilisateurFormComponent},
  { path:'partenaires/add'/*,canActivate:[AuthGuardService]*/, component: EntrepriseFormComponent },
  { path:'nouveau/depot'/*,canActivate:[AuthGuardService]*/, component: DepotFormComponent},
  { path:'changer/compte'/*,canActivate:[AuthGuardService]*/, component: OctroieCompteFormComponent},
  { path:'', redirectTo:'entreprises/liste', pathMatch: 'full' },//pour eviter les erreurs pathMatch: 'full' pour dire que le path doit etre totalement vide
  { path:'**',  redirectTo:'entreprises/liste' }
]
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
    EntrepriseListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,//pour les forms
    ReactiveFormsModule,//pour les forms
    RouterModule.forRoot(appRoutes),//pour le routing,
    HttpClientModule//pour les requettes http
  ],
  providers: [
    SecurityService,
    EntrepriseService,
    TransactionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
