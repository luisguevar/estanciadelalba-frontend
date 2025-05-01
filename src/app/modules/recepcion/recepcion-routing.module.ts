import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecepcionComponent } from './recepcion.component';
import { ModuloRecepcionComponent } from './modulo-recepcion/modulo-recepcion.component';

const routes: Routes = [{
  path: '',
  component: RecepcionComponent,
  children: [
    {
      path: 'modulo-recepcion',
      component: ModuloRecepcionComponent
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
