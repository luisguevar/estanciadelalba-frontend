import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservasComponent } from './reservas.component';
import { GestionarReservasComponent } from './gestionar-reservas/gestionar-reservas.component';

const routes: Routes = [{
  path: '',
  component: ReservasComponent,
  children: [
    {
      path: 'gestionar-reservas',
      component: GestionarReservasComponent
    },
    {
      path: '', redirectTo: 'gestionar-reservas', pathMatch: 'full',
    },
    {
      path: '**', redirectTo: 'gestionar-reservas', pathMatch: 'full',
    }
  ]
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservasRoutingModule { }
