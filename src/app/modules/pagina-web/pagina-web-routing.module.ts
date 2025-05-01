import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaWebComponent } from './pagina-web.component';
import { HabitacionesComponent } from './habitaciones/habitaciones.component';

const routes: Routes = [{
  path: '',
  component: PaginaWebComponent,
  children: [
    {
      path: 'habitaciones',
      component: HabitacionesComponent
    },
    {
      path: '', redirectTo: 'habitaciones', pathMatch: 'full',
    },
    {
      path: '**', redirectTo: 'habitaciones', pathMatch: 'full',
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaginaWebRoutingModule { }
