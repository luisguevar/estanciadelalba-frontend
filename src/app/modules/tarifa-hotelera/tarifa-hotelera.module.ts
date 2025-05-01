import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { TarifaHoteleraRoutingModule } from './tarifa-hotelera-routing.module';
import { GestionarTarifaHoteleraComponent } from './gestionar-tarifa-hotelera/gestionar-tarifa-hotelera.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddHabitacionComponent } from './add-habitacion/add-habitacion.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EditHabitacionComponent } from './edit-habitacion/edit-habitacion.component';
import { GestionarTiposHabitacionComponent } from './gestionar-tipos-habitacion/gestionar-tipos-habitacion.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_RANGE_SELECTION_STRATEGY, MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { AsignarPrecioTemporadaComponent } from './asignar-precio-temporada/asignar-precio-temporada.component';
@NgModule({
  declarations: [
    GestionarTarifaHoteleraComponent,
    AddHabitacionComponent,
    EditHabitacionComponent,
    GestionarTiposHabitacionComponent,
    AsignarPrecioTemporadaComponent
  ],
  providers: [
    DatePipe // Proporciona DatePipe aquí
  ],
  imports: [
    CommonModule,
    TarifaHoteleraRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
    NgbDatepickerModule,
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
export class TarifaHoteleraModule { } 
