import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecepcionComponent } from './recepcion.component';
import { ModuloRecepcionComponent } from './modulo-recepcion/modulo-recepcion.component';
import { GestionHabitacionComponent } from './gestion-habitacion/gestion-habitacion.component';

const routes: Routes = [{
  path: '',
  component: RecepcionComponent,
  children: [
    {
      path: 'modulo-recepcion',
      component: ModuloRecepcionComponent
    },
    {
      path: 'gestion-habitacion',
      component: GestionHabitacionComponent
    },
    {
      path: '', redirectTo: 'modulo-recepcion', pathMatch: 'full',
    },
    {
      path: '**', redirectTo: 'modulo-recepcion', pathMatch: 'full',
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecepcionRoutingModule { }
