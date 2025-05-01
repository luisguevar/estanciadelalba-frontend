import { ChangeDetectorRef, Component } from '@angular/core';
import { EstanciaEntity } from 'src/app/models/EstanciaEntity';
import { SvGeneralService } from '../../service/sv-general.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { InfoReservasComponent } from '../info-reservas/info-reservas.component';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es'; // Importar el idioma español
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import { InfoReservaWebComponent } from '../info-reserva-web/info-reserva-web.component';

@Component({
  selector: 'app-gestionar-reservas',
  templateUrl: './gestionar-reservas.component.html',
  styleUrls: ['./gestionar-reservas.component.scss']
})
export class GestionarReservasComponent {
  isLoading$: any;

  lstEstancias: EstanciaEntity[] = [];
  pageSize = 10;
  desde: number = 0;
  hasta: number = 10;

  filterNombres: string = '';
  filterNroHabitacion: string = '';
  filterNroReserva: string = '';
  filterCheckIn: string = ''; // Para almacenar la fecha de check-in
  filterCheckOut: string = ''; // Para almacenar la fecha de check-out

  bCalendario: boolean = false

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, listPlugin, bootstrap5Plugin], // Añadir listPlugin
    initialView: 'dayGridMonth',
    locale: esLocale,
    themeSystem: 'bootstrap4',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,listMonth' // Incluir la opción de lista
    },
    timeZone: 'America/Lima',
    height: 650,
    events: this.lstEstancias.map(estancia => ({
      title: `${estancia.cNombres} ${estancia.cApellidos}`,
      start: estancia.dFechaCheckIn,
      end: estancia.dFechaCheckOut
    })),
    eventTimeFormat: { // Configurar el formato de las horas
      hour: '2-digit',
      minute: '2-digit',
      meridiem: false // Formato de 24 horas
    },
    selectable: true
  };
  lstCalendarData: any;


  constructor(
    public _service: SvGeneralService,
    public toaster: ToastrService,
    private _dialog: MatDialog,
    private cdr: ChangeDetectorRef,
  ) {


  }

  ngOnInit(): void {
    this.isLoading$ = this._service.isLoading$;
    this.LoadDataCalendar();
    this.LoadData();

  }

  BotonListarHuespedes() {
    this.LoadData(this.filterNombres, this.filterNroHabitacion, this.filterCheckIn, this.filterCheckOut, this.filterNroReserva);
  }


  LoadData(cNombres?: string, cNroHabitacion?: string, checkIn?: string, checkOut?: string, cNroReserva?: string) {
    const params = {
      cNombres: cNombres || '',
      cNroHabitacion: cNroHabitacion || '',
      checkIn: checkIn || '',
      checkOut: checkOut || '',
      cNroReserva: cNroReserva || '',
    };

    this._service.GetReservas(params).subscribe((resp: any) => {

      if (resp.success) {
        this.lstEstancias = resp.data;
        // Actualizar eventos del calendario
        this.updateCalendarEvents();
      } else {
        this.toaster.error('Reservas', 'Error al cargar los datos de las reservas');

      }
    }, (error: any) => {
      this.toaster.error('Reservas', 'Error al cargar los datos de las reservas');
    });
  }

  LoadDataCalendar() {

    this._service.GetCalendarReservas().subscribe((resp: any) => {

      if (resp.success) {
        this.lstCalendarData = resp.data;

        this.updateCalendarEvents();
      } else {
        this.toaster.error('Reservas', 'Error al cargar los datos de las reservas');
      }
    }, (error: any) => {
      this.toaster.error('Reservas', 'Error al cargar los datos de las reservas');
    });
  }




  BotonVerDetalleEstancia(estancia: any) {

    const dialogRef = this._dialog.open(
      InfoReservasComponent,
      {
        width: 'auto ',
        height: 'auto',
        disableClose: true,
        data: {
          estancia: estancia,
          bDisabled: true
        },
      }
    );


    dialogRef.afterClosed().subscribe((result) => {
      this.LoadData();
      this.cdr.detectChanges();

    });

  }

  BotonVerDetalleReservaWeb(estancia: any) {
    const dialogRef = this._dialog.open(
      InfoReservaWebComponent,
      {
        width: 'auto ',
        height: 'auto',
        disableClose: true,
        data: {
          estancia: estancia,
        },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      this.LoadData();
      this.cdr.detectChanges();

    });

  }
  cambiarPagina(e: PageEvent) {
    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;
  }

  updateCalendarEvents() {
    this.calendarOptions = {
      ...this.calendarOptions, // Mantener otras configuraciones
      events: this.lstCalendarData.map((estancia: any) => ({
        title: estancia.title,
        start: estancia.start/* ,
        end: estancia.dFechaCheckOut, */

      }))
    };
  }



}
