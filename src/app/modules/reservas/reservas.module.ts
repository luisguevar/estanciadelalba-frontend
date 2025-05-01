import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

import { ReservasRoutingModule } from './reservas-routing.module';
import { ReservasComponent } from './reservas.component';
import { GestionarReservasComponent } from './gestionar-reservas/gestionar-reservas.component';
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
import { InfoReservasComponent } from './info-reservas/info-reservas.component';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { ConfirmarCheckInComponent } from './confirmar-check-in/confirmar-check-in.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { InfoReservaWebComponent } from './info-reserva-web/info-reserva-web.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    ReservasComponent,
    GestionarReservasComponent,
    InfoReservasComponent,
    ConfirmarCheckInComponent,
    InfoReservaWebComponent
  ],
  imports: [
    CommonModule,
    ReservasRoutingModule,
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
    MatTooltipModule
  ]
})
export class ReservasModule { }
