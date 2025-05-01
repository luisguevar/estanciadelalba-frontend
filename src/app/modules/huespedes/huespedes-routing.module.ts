import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HuespedesComponent } from './huespedes.component';
import { GestionarHuespedesComponent } from './gestionar-huespedes/gestionar-huespedes.component';

const routes: Routes = [{
  path: '',
  component: HuespedesComponent,
  children: [
    {
      path: 'gestionar-huespedes',
      component: GestionarHuespedesComponent
    },
    {
      path: '', redirectTo: 'gestionar-huespedes', pathMatch: 'full',
    },
    {
      path: '**', redirectTo: 'gestionar-huespedes', pathMatch: 'full',
    }
  ]
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HuespedesRoutingModule { }
