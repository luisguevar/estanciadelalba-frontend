import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LimpiezaRoutingModule } from './limpieza-routing.module';
import { LimpiezaComponent } from './limpieza.component';
import { GestionarLimpiezaComponent } from './gestionar-limpieza/gestionar-limpieza.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgbModule, NgbModalModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { DropdownMenusModule } from 'src/app/_metronic/partials';
import { SharedModule } from 'src/app/_metronic/shared/shared.module';
import { DetalleLimpiezaComponent } from './detalle-limpieza/detalle-limpieza.component';
import { MatTabsModule } from '@angular/material/tabs';
import { IncidenciaActivaComponent } from './incidencia-activa/incidencia-activa.component';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    LimpiezaComponent,
    GestionarLimpiezaComponent,
    DetalleLimpiezaComponent,
    IncidenciaActivaComponent
  ],
  imports: [
    CommonModule,
    LimpiezaRoutingModule,
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
    MatInputModule,
    MatTabsModule,
    MatCardModule
  ]
})
export class LimpiezaModule { }
