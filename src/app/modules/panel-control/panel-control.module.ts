import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

import { PanelControlRoutingModule } from './panel-control-routing.module';
import { PanelControlComponent } from './panel-control.component';
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
import { NgApexchartsModule } from 'ng-apexcharts';
import { GraficoIngresosComponent } from './graficos/grafico-ingresos/grafico-ingresos.component';
import { GraficoReservasComponent } from './graficos/grafico-reservas/grafico-reservas.component';
import { CardIngresosComponent } from './cards/card-ingresos/card-ingresos.component';
import { CardCheckInComponent } from './cards/card-check-in/card-check-in.component';
import { CardCheckOutComponent } from './cards/card-check-out/card-check-out.component';



@NgModule({
  declarations: [
    PanelControlComponent,
    GraficoIngresosComponent,
    GraficoReservasComponent,
    CardIngresosComponent,
    CardCheckInComponent,
    CardCheckOutComponent
    
  ],
  imports: [
    CommonModule,
    PanelControlRoutingModule,
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
    NgApexchartsModule


  ]
})
export class PanelControlModule { }
