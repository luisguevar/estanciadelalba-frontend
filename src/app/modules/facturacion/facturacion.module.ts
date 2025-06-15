import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

import { FacturacionRoutingModule } from './facturacion-routing.module';
import { FacturacionComponent } from './facturacion.component';
import { GenerarComprobanteComponent } from './generar-comprobante/generar-comprobante.component';
import { ListarComprobantesComponent } from './listar-comprobantes/listar-comprobantes.component';
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
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgbModule, NgbModalModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { BuscarClienteComponent } from './componentes/buscar-cliente/buscar-cliente.component';
import { AgregarEstanciaComponent } from './componentes/agregar-estancia/agregar-estancia.component';
import { AgregarProductoComponent } from './componentes/agregar-producto/agregar-producto.component';
import { GenerarAnulacionComponent } from './componentes/generar-anulacion/generar-anulacion.component';


@NgModule({
  declarations: [
    FacturacionComponent,
    GenerarComprobanteComponent,
    ListarComprobantesComponent,
    BuscarClienteComponent,
    AgregarEstanciaComponent,
    AgregarProductoComponent,
    GenerarAnulacionComponent
  ],
  imports: [
    CommonModule,
    FacturacionRoutingModule,
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
export class FacturacionModule { }
