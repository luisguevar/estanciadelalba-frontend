import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

import { HuespedesRoutingModule } from './huespedes-routing.module';
import { HuespedesComponent } from './huespedes.component';
import { GestionarHuespedesComponent } from './gestionar-huespedes/gestionar-huespedes.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgbModule, NgbModalModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { InfoHuespedComponent } from './info-huesped/info-huesped.component';
import {MatTabsModule} from '@angular/material/tabs';
import { InfoHuespedEstanciasComponent } from './info-huesped-estancias/info-huesped-estancias.component';
import { InfoHuespedReservasComponent } from './info-huesped-reservas/info-huesped-reservas.component';
import { InfoHuespedPagosComponent } from './info-huesped-pagos/info-huesped-pagos.component';

@NgModule({
  declarations: [
    HuespedesComponent,
    GestionarHuespedesComponent,
    InfoHuespedComponent,
    InfoHuespedEstanciasComponent,
    InfoHuespedReservasComponent,
    InfoHuespedPagosComponent
  ],
  imports: [
    CommonModule,
    HuespedesRoutingModule,
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
    MatTabsModule
  ]
})
export class HuespedesModule { }
