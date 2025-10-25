import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuInicioComponent } from './menu-inicio.component';
import { OpcionesComponent } from './opciones/opciones.component';

const routes: Routes = [{
  path: '',
  component: MenuInicioComponent,
  children: [
    {
      path: 'lista-opciones',
      component: OpcionesComponent
    },

    {
      path: '',
      redirectTo: 'lista-opciones',
      pathMatch: 'full'
    },
    {
      path: '**',
      redirectTo: 'lista-opciones'
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuInicioRoutingModule { }
