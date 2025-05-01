import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstanciasComponent } from './estancias.component';
import { GestionarEstanciasComponent } from './gestionar-estancias/gestionar-estancias.component';

const routes: Routes = [{
  path: '',
  component: EstanciasComponent,
  children: [
    {
      path: 'gestionar-estancias',
      component: GestionarEstanciasComponent
    },
    {
      path: '', redirectTo: 'gestionar-estancias', pathMatch: 'full',
    },
    {
      path: '**', redirectTo: 'gestionar-estancias', pathMatch: 'full',
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstanciasRoutingModule { }
