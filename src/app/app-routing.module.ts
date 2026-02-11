import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivreComponent } from './livre/livre.component';
import { LecteurComponent } from './lecteur/lecteur.component';
import { EmpruntComponent } from './emprunt/emprunt.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  { path: 'livres', component: LivreComponent },
  { path: 'lecteurs', component: LecteurComponent },
  { path: 'emprunts', component: EmpruntComponent },
  { path: '', redirectTo: 'livres', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
