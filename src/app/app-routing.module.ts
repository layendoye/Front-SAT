import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './security/login/login.component';
import { EntrepriseListComponent } from './entreprise/entreprise-list/entreprise-list.component';
import { UtilisateurFormComponent } from './utilisateur/utilisateur-form/utilisateur-form.component';
import { EntrepriseFormComponent } from './entreprise/entreprise-form/entreprise-form.component';
import { DepotFormComponent } from './depot/depot-form/depot-form.component';
import { OctroieCompteFormComponent } from './octroieCompte/octroie-compte-form/octroie-compte-form.component';
import { AuthGuard } from 'src/app/services/auth-guard.service';
const routes: Routes = [
  { path: 'connexion', component: LoginComponent },
  { path: 'entreprises/liste',canActivate:[AuthGuard], component: EntrepriseListComponent },
  { path: 'inscription',canActivate:[AuthGuard], component: UtilisateurFormComponent },
  { path: 'partenaires/add',canActivate:[AuthGuard], component: EntrepriseFormComponent },
  { path: 'nouveau/depot',canActivate:[AuthGuard], component: DepotFormComponent },
  { path: 'changer/compte',canActivate:[AuthGuard], component: OctroieCompteFormComponent },
  { path: '', redirectTo: 'entreprises/liste', pathMatch: 'full' },//pour eviter les erreurs pathMatch: 'full' pour dire que le path doit etre totalement vide
  { path: '**', redirectTo: 'entreprises/liste' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
