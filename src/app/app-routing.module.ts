import { SingleEntrepriseComponent } from './entreprise/single-entreprise/single-entreprise.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './security/login/login.component';
import { EntrepriseListComponent } from './entreprise/entreprise-list/entreprise-list.component';
import { UtilisateurFormComponent } from './utilisateur/utilisateur-form/utilisateur-form.component';
import { EntrepriseFormComponent } from './entreprise/entreprise-form/entreprise-form.component';
import { DepotFormComponent } from './depot/depot-form/depot-form.component';
import { OctroieCompteFormComponent } from './octroieCompte/octroie-compte-form/octroie-compte-form.component';
import { AuthGuard } from 'src/app/services/auth-guard.service';
import { UpdateEntrepriseComponent } from './entreprise/update-entreprise/update-entreprise.component';
import { UtilisateurListComponent } from './utilisateur/utilisateur-list/utilisateur-list.component';
import { EnvoisComponent } from './transactions/envois/envois.component';
import { RetraisComponent } from './transactions/retrais/retrais.component';
import { HistoEnvoisComponent } from './transactions/histo-envois/histo-envois.component';
import { HistoRetraitsComponent } from './transactions/histo-retraits/histo-retraits.component';
import { IsSuperAdminService } from './services/is-super-admin.service';
import { IsCaissierService } from './services/is-caissier.service';
import { IsAdminPrinService } from './services/is-admin-prin.service';
import { IsGuichetierService } from './services/is-guichetier.service';
import { SuperEtPrincipService } from './services/super-et-princip.service';
const routes: Routes = [
  { path: 'connexion', component: LoginComponent },
  { path: 'entreprises/liste',canActivate:[AuthGuard,IsSuperAdminService], component: EntrepriseListComponent },
  { path: 'inscription',canActivate:[AuthGuard,SuperEtPrincipService], component: UtilisateurFormComponent },
  { path: 'update/:id',canActivate:[AuthGuard,SuperEtPrincipService], component: UtilisateurFormComponent },
  { path: 'partenaires/add',canActivate:[AuthGuard,IsSuperAdminService], component: EntrepriseFormComponent },
  { path: 'partenaires/:id',canActivate:[AuthGuard,IsSuperAdminService], component: UpdateEntrepriseComponent },
  { path: 'partenaires/show/:id',canActivate:[AuthGuard,IsSuperAdminService], component: SingleEntrepriseComponent },
  { path: 'nouveau/depot',canActivate:[AuthGuard,IsCaissierService], component: DepotFormComponent },
  { path: 'changer/compte',canActivate:[AuthGuard,IsAdminPrinService], component: OctroieCompteFormComponent },
  { path: 'lister/users',canActivate:[AuthGuard,SuperEtPrincipService], component: UtilisateurListComponent },
  { path: 'envois',canActivate:[AuthGuard,IsGuichetierService], component: EnvoisComponent },
  { path: 'retraits',canActivate:[AuthGuard,IsGuichetierService], component: RetraisComponent },
  { path: 'historiques/Envois',canActivate:[AuthGuard,IsAdminPrinService], component: HistoEnvoisComponent },
  { path: 'historiques/Retraits',canActivate:[AuthGuard,IsAdminPrinService], component: HistoRetraitsComponent},
  { path: '', redirectTo: 'entreprises/liste', pathMatch: 'full' },//pour eviter les erreurs pathMatch: 'full' pour dire que le path doit etre totalement vide
  { path: '**', redirectTo: 'entreprises/liste' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
