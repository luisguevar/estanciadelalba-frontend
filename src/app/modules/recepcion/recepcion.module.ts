import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

import { RecepcionRoutingModule } from './recepcion-routing.module';
import { RecepcionComponent } from './recepcion.component';
import { ModuloRecepcionComponent } from './modulo-recepcion/modulo-recepcion.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { NgbModule, NgbModalModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { RegistrarIngresoReservaComponent } from './registrar-ingreso-reserva/registrar-ingreso-reserva.component';
import {MatStepperModule} from '@angular/material/stepper';
import { AddHuespedComponent } from './add-huesped/add-huesped.component';
import { AddHabitacionComponent } from './add-habitacion/add-habitacion.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AddPagoRecepcionComponent } from './add-pago-recepcion/add-pago-recepcion.component';
@NgModule({
  declarations: [
    RecepcionComponent,
    ModuloRecepcionComponent,
    RegistrarIngresoReservaComponent,
    AddHuespedComponent,
    AddHabitacionComponent,
    AddPagoRecepcionComponent
  ],
  imports: [
    CommonModule,
    RecepcionRoutingModule,
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
    MatTabsModule,
    MatExpansionModule,
    MatListModule, MatDividerModule,
    MatButtonModule,
    MatStepperModule,
    MatTooltipModule
  ]
})
export class RecepcionModule { }
