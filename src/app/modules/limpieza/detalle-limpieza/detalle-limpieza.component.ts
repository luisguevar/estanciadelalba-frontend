import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SvGeneralService } from '../../service/sv-general.service';
import { AlertService } from '../../service/alert.service';
import { AuthService } from '../../auth';
import { IncidenciaActivaComponent } from '../incidencia-activa/incidencia-activa.component';

@Component({
  selector: 'app-detalle-limpieza',
  templateUrl: './detalle-limpieza.component.html',
  styleUrls: ['./detalle-limpieza.component.scss']
})
export class DetalleLimpiezaComponent {
  isLoading$: any;
  nEstadoIncidencia: number = 0;
  nEstadoHabilitacion: number = 0; // Inhabilitado por defecto
  cObservacionesIncidencia: string = '';
  habitacionSeleccionada: any = null;
  incidenciaActiva: any = null;
  listaIncidencias: any[] = [];
  nIdIncidencia: number = 0;
  nNroHabitacion: any = '';
  cTipoHabitacion: any = '';
  cNivelHabitacion: any = '';
  nIdHabitacion: number = 0;
  bTieneIncidenciaActiva: boolean = false;
  usuarioModificacion_id: number = 0;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DetalleLimpiezaComponent>,
    public toaster: ToastrService,
    public _service: SvGeneralService,
    private alertService: AlertService,
    public _auth: AuthService,
    private dialog: MatDialog
  ) {
    console.log('Data: ', data);

    this.usuarioModificacion_id = this._auth.user.id;
    if (data) {
      this.nNroHabitacion = data.habitacion.nNroHabitacion || '';
      this.cTipoHabitacion = data.habitacion.tipo_habitacion.cNombreTipo || '';
      this.cNivelHabitacion = data.habitacion.nivel.cNombreNivel || '';
      this.nIdHabitacion = data.habitacion.id || 0;
      this.bTieneIncidenciaActiva = data.habitacion.bTieneIncidenciaActiva || false;
      if (this.bTieneIncidenciaActiva) {
        this.nIdIncidencia = data.habitacion.incidencia_activa.id || 0;
      }

    }
  }


  ngOnInit(): void {
    this.isLoading$ = this._service.isLoading$;

    setTimeout(() => {
      if (this.nIdHabitacion > 0) {
        this.ObtenerHabitacionLimpiezaPorId(this.nIdHabitacion);
      }

    }, 10);


  }



  // 🖼️ Manejo de imágenes
  imagenesExistentes: any[] = [];   // [{ id, url }]
  imagenesNuevas: any[] = [];       // [{ file, preview }]
  imagenesEliminadas: number[] = []; // IDs eliminados en memoria
  imagenSeleccionada: string | null = null;

  ObtenerHabitacionLimpiezaPorId(id: number) {
    this._service.GetHabitacionLimpiezaById(id).subscribe({
      next: (resp: any) => {
        if (resp.success && resp.data) {
          const habitacion = resp.data;
          this.habitacionSeleccionada = habitacion;
          this.incidenciaActiva = habitacion.incidencia_activa || null;

          // Inicializar campos de imágenes en la incidencia si no existen
          if (this.incidenciaActiva) {
            this.incidenciaActiva.imagenesExistentes = this.incidenciaActiva.imagenes?.map((img: any) => ({
              id: img.id,
              url: img.url_imagen
            })) || [];
            this.incidenciaActiva.imagenesNuevas = [];
            this.incidenciaActiva.imagenesEliminadas = [];
          }

          this.listaIncidencias = habitacion.listIncidencias || [];
        }
      },
      error: (err) => {
        console.error('Error al obtener habitación:', err);
      }
    });
  }


  // 📸 Seleccionar nuevas imágenes
  onImageSelected(event: any): void {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    for (let file of files) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenesNuevas.push({
          file,
          preview: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  }

  // ❌ Eliminar imagen (existente o nueva)
  removeImage(img: any, tipo: 'existente' | 'nueva', index: number): void {
    if (tipo === 'existente') {
      // Guardamos el id para eliminar en backend
      if (img.id) this.imagenesEliminadas.push(img.id);
      this.imagenesExistentes.splice(index, 1);
    } else {
      this.imagenesNuevas.splice(index, 1);
    }
  }

  // 🔍 Ver imagen ampliada
  verImagen(img: string): void {
    this.imagenSeleccionada = img;
  }

  cerrarVista(): void {
    this.imagenSeleccionada = null;
  }

  // 💾 Guardar cambios (update)
  // guardarIncidencia(): void {
  //   const formData = new FormData();
  //   formData.append('id', this.nIdIncidencia?.toString() || '');
  //   formData.append('nEstado', this.nEstadoHabilitacion?.toString() || '');
  //   formData.append('cObservaciones', this.cObservacionesIncidencia || '');
  //   formData.append('usuarioModificacion_id', this.usuarioModificacion_id?.toString() || '');


  //   // Nuevas imágenes
  //   this.imagenesNuevas.forEach(img => {
  //     formData.append('imagenes[]', img.file);
  //   });

  //   // IDs de imágenes eliminadas
  //   if (this.imagenesEliminadas.length > 0) {
  //     formData.append('imagenes_eliminar', JSON.stringify(this.imagenesEliminadas));
  //   }

  //   this._service.PutHabitacionLimpieza(formData).subscribe({
  //     next: (res) => {
  //       console.log('✅ Incidencia actualizada correctamente', res);
  //       this.dialogRef.close(true);
  //     },
  //     error: (err) => {
  //       console.error('❌ Error al guardar', err);
  //     },
  //   });
  // }

  guardarIncidencia(): void {
    const formData = new FormData();
    const inc = this.incidenciaActiva;

    formData.append('id', inc.id?.toString() || '');
    formData.append('nEstado', inc.nEstado?.toString() || '');
    formData.append('cObservaciones', inc.cObservaciones || '');
    formData.append('usuarioModificacion_id', this.usuarioModificacion_id?.toString() || '');

    (inc.imagenesNuevas || []).forEach((img: any) => formData.append('imagenes[]', img.file));
    if (inc.imagenesEliminadas?.length) formData.append('imagenes_eliminar', JSON.stringify(inc.imagenesEliminadas));

    this._service.PutHabitacionLimpieza(formData).subscribe({
      next: () => {
        this.toaster.success('Incidencia guardada correctamente');

        // 🔄 Refrescar los datos de la habitación
        this.ObtenerHabitacionLimpiezaPorId(this.nIdHabitacion);
      },
      error: err => {
        console.error('Error al guardar', err);
        this.toaster.error('Error al guardar la incidencia');
      }
    });
  }

  // Convertir estado a texto
  estadoTexto(nEstado: number) {
    switch (nEstado) {
      case 0: return 'Pendiente';
      case 1: return 'Para Habilitación';
      case 2: return 'Con Incidencias';
      default: return 'Desconocido';
    }
  }

  // Mostrar incidencia histórica en el hijo (sin afectar la activa)
  incidenciaHistorialSeleccionada: any = null;

  verDetalleIncidencia(inc: any) {
    // Creamos una copia de la incidencia para no modificar la original
    const incidenciaModal = {
      ...inc,
      imagenesExistentes: inc.imagenes?.map((img: any) => ({ id: img.id, url: img.url_imagen })) || [],
      imagenesNuevas: [],
      imagenesEliminadas: []
    };

    this.dialog.open(IncidenciaActivaComponent, {
      width: '800px',
      data: { incidencia: incidenciaModal, readonly: true } // pasamos readonly si quieres
    });
  }



}
