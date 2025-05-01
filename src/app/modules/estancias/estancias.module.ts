import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

import { EstanciasRoutingModule } from './estancias-routing.module';
import { GestionarEstanciasComponent } from './gestionar-estancias/gestionar-estancias.component';
import { EstanciasComponent } from './estancias.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { NgbModule, NgbModalModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { InfoEstanciaComponent } from './info-estancia/info-estancia.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { ConfirmarCheckOutComponent } from './confirmar-check-out/confirmar-check-out.component';
import { AddPagoComponent } from './add-pago/add-pago.component';
import { DetallePagoComponent } from './detalle-pago/detalle-pago.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    EstanciasComponent,
    GestionarEstanciasComponent,
   
    InfoEstanciaComponent,
    ConfirmarCheckOutComponent,
    AddPagoComponent,
    DetallePagoComponent
  ],
  imports: [
    CommonModule,
    EstanciasRoutingModule,
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
    MatTooltipModule
  ]
})
export class EstanciasModule { }
