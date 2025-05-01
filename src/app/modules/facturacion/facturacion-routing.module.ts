import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacturacionComponent } from './facturacion.component';
import { GenerarComprobanteComponent } from './generar-comprobante/generar-comprobante.component';
import { ListarComprobantesComponent } from './listar-comprobantes/listar-comprobantes.component';

const routes: Routes = [{
  path: '',
  component: FacturacionComponent,
  children: [
    {
      path: 'listar-comprobantes',
      component: ListarComprobantesComponent
    },
    {
      path: 'generar-comprobantes',
      component: GenerarComprobanteComponent
    },
    {
      path: '',
      redirectTo: 'listar-comprobantes',
      pathMatch: 'full'
    },
    {
      path: '**',
      redirectTo: 'listar-comprobantes'
    }
  ]
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturacionRoutingModule { }
