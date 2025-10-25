import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SvGeneralService } from '../../service/sv-general.service';
import { DetalleLimpiezaComponent } from '../detalle-limpieza/detalle-limpieza.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-gestionar-limpieza',
  templateUrl: './gestionar-limpieza.component.html',
  styleUrls: ['./gestionar-limpieza.component.scss']
})
export class GestionarLimpiezaComponent implements OnInit {

  isLoading$: any;
  lstHabitaciones: any[] = [];
  lstHabitacionesFiltradas: any[] = [];

  filtroTipo: string = '';
  filtroNivel: string = '';
  filtroEstado: string = '';

  searchText: string = '';
  registrosPorPagina: number = 10;
  paginaActual: number = 1;
  totalPaginas: number = 1;
  opcionesPorPagina: number[] = [5, 10, 20, 50];

  lstTiposHabitacion = [
    { id: 1, nombre: 'Simple' },
    { id: 2, nombre: 'Doble' },
    { id: 3, nombre: 'Triple' },
  ];

  lstNiveles = [
    { id: 3, nombre: 'Tercero' },
    { id: 4, nombre: 'Cuarto' },
    { id: 5, nombre: 'Quinto' },
  ];

  lstEstados = [
    { id: 1, nombre: 'Disponible' },
    { id: 2, nombre: 'Sucia' },
    { id: 3, nombre: 'Bloqueada' },
  ];

  constructor(private _svGeneral: SvGeneralService, private _dialog: MatDialog, private cdr: ChangeDetectorRef,) { }

  ngOnInit(): void {
    this.isLoading$ = this._svGeneral.isLoading$;
    this.cargarHabitaciones();
  }

  cargarHabitaciones(): void {
    const filtros = {
      estado: this.filtroEstado,
      tipo: this.filtroTipo,
      nivel: this.filtroNivel
    };

    this._svGeneral.GetHabitacionesLimpieza(filtros).subscribe((resp: any) => {
      if (resp.success) {
        this.lstHabitaciones = resp.data || [];
        this.aplicarBusqueda();
      }
    });
  }

  aplicarFiltros(): void {
    this.cargarHabitaciones();
  }

  limpiarFiltros(): void {
    this.filtroTipo = '';
    this.filtroNivel = '';
    this.filtroEstado = '';
    this.searchText = '';
    this.cargarHabitaciones();
  }

  aplicarBusqueda(): void {
    let lista = [...this.lstHabitaciones];
    if (this.searchText.trim() !== '') {
      const texto = this.searchText.toLowerCase();
      lista = lista.filter(h =>
        (h.nNroHabitacion && h.nNroHabitacion.toString().includes(texto)) ||
        (h.tipo_habitacion?.cNombreTipo?.toLowerCase().includes(texto)) ||
        (h.nivel?.cNombreNivel?.toLowerCase().includes(texto))
      );
    }

    this.lstHabitacionesFiltradas = lista;
    this.actualizarPaginacion();
  }

  buscarHabitaciones(): void {
    this.aplicarBusqueda();
  }

  // 🔹 Paginación
  get habitacionesPagina(): any[] {
    const inicio = (this.paginaActual - 1) * this.registrosPorPagina;
    return this.lstHabitacionesFiltradas.slice(inicio, inicio + this.registrosPorPagina);
  }

  get paginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  actualizarPaginacion(): void {
    this.totalPaginas = Math.max(1, Math.ceil(this.lstHabitacionesFiltradas.length / this.registrosPorPagina));
    if (this.paginaActual > this.totalPaginas) {
      this.paginaActual = this.totalPaginas;
    }
  }

  cambiarRegistrosPorPagina(value?: number | string): void {
    const num = Number(value) || this.registrosPorPagina;
    if (num > 0) this.registrosPorPagina = num;
    this.paginaActual = 1;
    this.actualizarPaginacion();
  }

  cambiarPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaActual = pagina;
    }
  }

  verIncidencias(habitacion: any): void {
    const dialogRef = this._dialog.open(
      DetalleLimpiezaComponent,
      {
        width: 'auto ',
        height: 'auto',
        disableClose: true,
        data: {
          habitacion: habitacion
        },
      }
    );

    dialogRef.afterClosed().subscribe((result: any) => {

      this.cargarHabitaciones();
      this.cdr.detectChanges();

    });
  }


}
