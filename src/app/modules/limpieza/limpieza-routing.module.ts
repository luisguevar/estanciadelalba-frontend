import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LimpiezaComponent } from './limpieza.component';
import { GestionarLimpiezaComponent } from './gestionar-limpieza/gestionar-limpieza.component';

const routes: Routes = [{
  path: '',
  component: LimpiezaComponent,
  children: [
    {
      path: 'gestionar-limpieza-habitaciones',
      component: GestionarLimpiezaComponent
    },
    {
      path: '',
      redirectTo: 'gestionar-limpieza-habitaciones',
      pathMatch: 'full'
    },
    {
      path: '**',
      redirectTo: 'gestionar-limpieza-habitaciones'
    }
  ]
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LimpiezaRoutingModule { }
