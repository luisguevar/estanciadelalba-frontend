import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

import { ReporteRoutingModule } from './reporte-routing.module';
import { ReporteComponent } from './reporte.component';
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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgbModule, NgbModalModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { GestionarReportesComponent } from './gestionar-reportes/gestionar-reportes.component';
import { RptEntradaSalidaComponent } from './componentes/rpt-entrada-salida/rpt-entrada-salida.component';
import { RptCambioHabitacionComponent } from './componentes/rpt-cambio-habitacion/rpt-cambio-habitacion.component';
import { RptHuespedResponsableComponent } from './componentes/rpt-huesped-responsable/rpt-huesped-responsable.component';
import { MatSelectModule } from '@angular/material/select';
import { RptIngresosTipohabComponent } from './componentes/rpt-ingresos-tipohab/rpt-ingresos-tipohab.component';
import { RptEstadoHabitacionComponent } from './componentes/rpt-estado-habitacion/rpt-estado-habitacion.component';
import { RptCancelacionesComponent } from './componentes/rpt-cancelaciones/rpt-cancelaciones.component';


@NgModule({
  declarations: [
    ReporteComponent,
    GestionarReportesComponent,
    RptEntradaSalidaComponent,
    RptCambioHabitacionComponent,
    RptHuespedResponsableComponent,
    RptIngresosTipohabComponent,
    RptEstadoHabitacionComponent,
    RptCancelacionesComponent
  ],
  imports: [
    CommonModule,
    ReporteRoutingModule,
    CommonModule,
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
    FullCalendarModule,
    MatSlideToggleModule,
    MatTooltipModule, MatSelectModule
  ]
})
export class ReporteModule { }
