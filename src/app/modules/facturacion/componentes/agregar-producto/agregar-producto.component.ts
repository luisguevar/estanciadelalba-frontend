import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AgregarEstanciaComponent } from '../agregar-estancia/agregar-estancia.component';
import { SvGeneralService } from 'src/app/modules/service/sv-general.service';
import { ToastrService } from 'ngx-toastr';
import { EstanciaHabitacionEntity } from 'src/app/models/EstanciaEntity';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.scss']
})
export class AgregarProductoComponent {
  isLoading$: any;

  cDescripcionProducto: string = '';
  nCantidad: number = 0;
  nPrecio: number = 0;
  nCod: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AgregarProductoComponent>,
    public _service: SvGeneralService,
    public toaster: ToastrService,
    private _dialog: MatDialog,
    private cdr: ChangeDetectorRef,
  ) {

    this.nCod = this.data.nCod;

  }

  BotonGuardar() {

    if (this.cDescripcionProducto.length <= 0) {
      this.toaster.warning('Producto', 'Ingrese una descripción válida para continuar.');
      return;
    }

    if (this.nCantidad <= 0) {
      this.toaster.warning('Producto', 'Ingrese una cantidad válida para continuar.');
      return;
    }


    if (this.nPrecio <= 0) {
      this.toaster.warning('Producto', 'Ingrese un precio válido para continuar.');
      return;
    }


    const data = {
      cDescripcion: this.cDescripcionProducto,
      cNroHabitacion: 'P00' + this.nCod,
      cSubTotal: this.nPrecio,
      cUnidadMedida: 'NIU',
      nCantidad: this.nCantidad,
      nPrecioUnitario: this.nPrecio,
      nTotal: this.nPrecio,
      nValorUnitario: this.nPrecio * (0.82)
    }


    this.dialogRef.close(data);

  }

}
