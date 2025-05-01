import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, NgIf } from '@angular/common';

import { PaginaWebRoutingModule } from './pagina-web-routing.module';
import { HabitacionesComponent } from './habitaciones/habitaciones.component';
import { PaginaWebComponent } from './pagina-web.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { EditarHabitacionWebComponent } from './editar-habitacion-web/editar-habitacion-web.component';


@NgModule({
  declarations: [
    HabitacionesComponent,
    PaginaWebComponent,
    EditarHabitacionWebComponent
  ],
  providers: [
    DatePipe // Proporciona DatePipe aquí
  ],
  imports: [
    CommonModule,
    PaginaWebRoutingModule,
    MatCardModule,
    MatFormFieldModule, MatInputModule, FormsModule, NgIf, MatButtonModule, MatIconModule,
    MatPaginatorModule,
    MatDialogModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatTabsModule,
    MatExpansionModule
  ]
})
export class PaginaWebModule { }
