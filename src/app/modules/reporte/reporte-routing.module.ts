import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReporteComponent } from './reporte.component';
import { GestionarReportesComponent } from './gestionar-reportes/gestionar-reportes.component';

const routes: Routes = [{
  path: '',
  component: ReporteComponent,
  children: [
    {
      path: 'gestionar-reportes',
      component: GestionarReportesComponent
    },
    {
      path: '', redirectTo: 'gestionar-reportes', pathMatch: 'full',
    },
    {
      path: '**', redirectTo: 'gestionar-reportes', pathMatch: 'full',
    }
  ]
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporteRoutingModule { }
