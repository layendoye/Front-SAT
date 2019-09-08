import { DashbordComponent } from './dashbord/dashbord.component';
import { HistoriquesComponent } from './transactions/historiques/historiques.component';
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
import { IsSuperAdminService } from './services/is-super-admin.service';
import { IsCaissierService } from './services/is-caissier.service';
import { IsAdminPrinService } from './services/is-admin-prin.service';
import { IsGuichetierService } from './services/is-guichetier.service';
import { SuperEtPrincipService } from './services/super-et-princip.service';
import { ContratComponent } from './entreprise/contrat/contrat.component';
import { ListesComptesComponent } from './comptes/listes-comptes/listes-comptes.component';
const routes: Routes = [
  { path: 'connexion', component: LoginComponent },
  { path: 'entreprises/liste',canActivate:[AuthGuard,IsSuperAdminService], component: EntrepriseListComponent },
  { path: 'inscription',canActivate:[AuthGuard,SuperEtPrincipService], component: UtilisateurFormComponent },
  { path: 'update/:id',canActivate:[AuthGuard], component: UtilisateurFormComponent },
  { path: 'partenaires/add',canActivate:[AuthGuard,IsSuperAdminService], component: EntrepriseFormComponent },
  { path: 'partenaires/:id',canActivate:[AuthGuard,IsSuperAdminService], component: UpdateEntrepriseComponent },
  { path: 'partenaires/show/:id',canActivate:[AuthGuard,IsSuperAdminService], component: SingleEntrepriseComponent },
  { path: 'nouveau/depot',canActivate:[AuthGuard,IsCaissierService], component: DepotFormComponent },
  { path: 'changer/compte',canActivate:[AuthGuard,IsAdminPrinService], component: OctroieCompteFormComponent },
  { path: 'lister/users',canActivate:[AuthGuard,SuperEtPrincipService], component: UtilisateurListComponent },
  { path: 'envois',canActivate:[AuthGuard,IsGuichetierService], component: EnvoisComponent },
  { path: 'retraits',canActivate:[AuthGuard,IsGuichetierService], component: RetraisComponent },
  { path: 'historiques/transactions',canActivate:[AuthGuard,IsAdminPrinService], component: HistoriquesComponent },
  { path: 'historiques/transactions/:type',canActivate:[AuthGuard,IsGuichetierService], component: HistoriquesComponent },
  { path: 'liste/comptes',canActivate:[AuthGuard,IsAdminPrinService], component: ListesComptesComponent },
  { path: 'contrat/:entreprise',canActivate:[AuthGuard,IsSuperAdminService], component: ContratComponent},
  { path: 'accueil',canActivate:[AuthGuard], component: DashbordComponent},
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },//pour eviter les erreurs pathMatch: 'full' pour dire que le path doit etre totalement vide
  { path: '**', redirectTo: 'accueil' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
