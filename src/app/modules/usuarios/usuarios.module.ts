import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { DropdownMenusModule } from 'src/app/_metronic/partials';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from 'src/app/_metronic/shared/shared.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { AddEditUsuarioComponent } from './add-edit-usuario/add-edit-usuario.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GestionarRolesComponent } from './gestionar-roles/gestionar-roles.component';
import { GestionarUsuariosComponent } from './gestionar-usuarios/gestionar-usuarios.component';
import { AddEditRolComponent } from './add-edit-rol/add-edit-rol.component';

@NgModule({
  declarations: [
    UsuariosComponent,
    AddEditUsuarioComponent,
    GestionarRolesComponent,
    GestionarUsuariosComponent,
    AddEditRolComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
    CommonModule,
    DropdownMenusModule,
    InlineSVGModule,
    NgApexchartsModule,
    NgbDropdownModule,
    SharedModule,
    MatSlideToggleModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule

  ],

})
export class UsuariosModule { }
