import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReclamacionesComponent } from './reclamaciones.component';
import { GestionarReclamacionesComponent } from './gestionar-reclamaciones/gestionar-reclamaciones.component';

const routes: Routes = [{
  path: '',
  component: ReclamacionesComponent,
  children: [
    {
      path: 'gestionar-reclamaciones',
      component: GestionarReclamacionesComponent
    },
    {
      path: '', redirectTo: 'gestionar-reclamaciones', pathMatch: 'full',
    },
    {
      path: '**', redirectTo: 'gestionar-reclamaciones', pathMatch: 'full',
    }
  ]
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReclamacionesRoutingModule { }
