import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios.component';
import { GestionarRolesComponent } from './gestionar-roles/gestionar-roles.component';
import { GestionarUsuariosComponent } from './gestionar-usuarios/gestionar-usuarios.component';

const routes: Routes = [{
  path: '',
  component: UsuariosComponent,
  children: [
    {
      path: 'listar-usuarios',
      component: GestionarUsuariosComponent
    },
    {
      path: 'listar-roles',
      component: GestionarRolesComponent
    },
    {
      path: '',
      redirectTo: 'listar-usuarios',
      pathMatch: 'full'
    },
    {
      path: '**',
      redirectTo: 'listar-usuarios'
    }
  ]
}];


@NgModule({
  imports: [RouterModule.forChild(routes),

  ],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
