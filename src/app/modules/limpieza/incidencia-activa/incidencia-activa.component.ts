import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-incidencia-activa',
  templateUrl: './incidencia-activa.component.html',
  styleUrls: ['./incidencia-activa.component.scss']
})
export class IncidenciaActivaComponent {
  @Input() incidencia: any; // Todo el objeto de incidencia
  @Input() readonly: boolean = false;
  @Output() cambiosIncidencia = new EventEmitter<any>();

  imagenSeleccionada: string | null = null;

  cUsuarioCreacion: string | null = null;
  cUsuarioModificacion: string | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<IncidenciaActivaComponent>,) {
    if (data?.incidencia) {
      this.incidencia = data.incidencia;
      this.readonly = data.readonly || false;
      console.log('incidencia: ', this.incidencia);
    }
  }
  // Seleccionar nuevas imágenes
  onImageSelected(event: any) {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    this.incidencia.imagenesNuevas = this.incidencia.imagenesNuevas || [];

    for (let file of files) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.incidencia.imagenesNuevas.push({ file, preview: e.target.result });
        this.cambiosIncidencia.emit(this.incidencia);
      };
      reader.readAsDataURL(file);
    }
  }

  // Eliminar imagen
  removeImage(img: any, tipo: 'existente' | 'nueva', index: number) {
    if (tipo === 'existente') {
      this.incidencia.imagenesEliminadas = this.incidencia.imagenesEliminadas || [];
      if (img.id) this.incidencia.imagenesEliminadas.push(img.id);
      this.incidencia.imagenesExistentes.splice(index, 1);
    } else {
      this.incidencia.imagenesNuevas.splice(index, 1);
    }
    this.cambiosIncidencia.emit(this.incidencia);
  }

  // Vista ampliada de imagen
  verImagen(img: string) { this.imagenSeleccionada = img; }
  cerrarVista() { this.imagenSeleccionada = null; }
}
