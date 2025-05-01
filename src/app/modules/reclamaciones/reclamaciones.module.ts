import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

import { ReclamacionesRoutingModule } from './reclamaciones-routing.module';
import { ReclamacionesComponent } from './reclamaciones.component';
import { GestionarReclamacionesComponent } from './gestionar-reclamaciones/gestionar-reclamaciones.component';
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
import { EditReclamacionComponent } from './edit-reclamacion/edit-reclamacion.component';


@NgModule({
  declarations: [
    ReclamacionesComponent,
    GestionarReclamacionesComponent,
    EditReclamacionComponent
  ],
  imports: [
    CommonModule,
    ReclamacionesRoutingModule,
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
export class ReclamacionesModule { }
