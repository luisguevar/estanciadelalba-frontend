import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TarifaHoteleraComponent } from './tarifa-hotelera.component';
import { GestionarTarifaHoteleraComponent } from './gestionar-tarifa-hotelera/gestionar-tarifa-hotelera.component';

const routes: Routes = [{
  path: '',
  component: TarifaHoteleraComponent,
  children: [
    {
      path: 'gestionar-tarifa-hotelera',
      component: GestionarTarifaHoteleraComponent
    },
    {
      path: '', redirectTo: 'gestionar-tarifa-hotelera', pathMatch: 'full',
    },
    {
      path: '**', redirectTo: 'gestionar-tarifa-hotelera', pathMatch: 'full',
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TarifaHoteleraRoutingModule { }
