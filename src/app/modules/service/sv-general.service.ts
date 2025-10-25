import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/Config/config';
import { HabitacionEntity } from 'src/app/models/TarifaHoteleraEntity';
import { HuespedEntity } from 'src/app/models/HuespedEntity';
import { EstanciaEntity, PagoEntity } from 'src/app/models/EstanciaEntity';
import { ReclamacionEntity } from 'src/app/models/ReclamacionEntity';
import { RolEntity, UserEntity } from 'src/app/models/UsuarioEntity';

@Injectable({
  providedIn: 'root'
})
export class SvGeneralService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  private apiUrl = 'https://api.nubefact.com/api/v1/5adbd4ca-8f7f-43c9-b664-1c530588275f'; // Reemplaza con tu endpoint real
  private token = 'fdc17fef143642d681e8424099838c495105df8f7b86413a872a4d4bc7805af3'; // Token del API
  private tokenApiPeru = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Imd1ZXZhcmVkbzAzM0BnbWFpbC5jb20ifQ.2EROOSngZ3idXel6Sro15eX0YudnOGgk068QY-kb5Uk';

  constructor(
    private http: HttpClient,
    public authservice: AuthService,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  GetPaises() {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = URL_SERVICIOS + "/pais/all";
    /* console.log(URL); */
    return this.http.get(URL, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }


  GetUsuarios(fechaInicio?: string, fechaFin?: string) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });

    let params: any = {};
    if (fechaInicio) params.fechaInicio = fechaInicio;
    if (fechaFin) params.fechaFin = fechaFin;

    let URL = URL_SERVICIOS + "/usuarios/admin/all";

    return this.http.get(URL, { headers: headers, params }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }
  GetHabitacionesLimpieza(filtros: any) {
    this.isLoadingSubject.next(true);
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });

    const params: any = {};
    if (filtros.estado) params.estado = filtros.estado;
    if (filtros.tipo) params.tipo = filtros.tipo;
    if (filtros.nivel) params.nivel = filtros.nivel;

    const URL = `${URL_SERVICIOS}/limpieza/admin/all`;


    return this.http.get(URL, { headers: headers, params }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  GetHabitacionLimpiezaById(id: number): Observable<any> {
    this.isLoadingSubject.next(true);
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    const URL = `${URL_SERVICIOS}/limpieza/admin/habitacion/${id}`;

    return this.http.get(URL, { headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  PutHabitacionLimpieza(formData: FormData): Observable<any> {
    this.isLoadingSubject.next(true);

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.authservice.token,
    });

    const URL = URL_SERVICIOS + "/limpieza/admin/update";

    return this.http.post(URL, formData, { headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }




  PostUsuarioRegister(usuario: UserEntity): Observable<any> {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = URL_SERVICIOS + "/auth/register";
    return this.http.post(URL, usuario, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );

  }
  PostUsuarioUpdate(usuario: UserEntity): Observable<any> {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = URL_SERVICIOS + "/auth/update";
    return this.http.post(URL, usuario, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }



  GetRoles(fechaInicio?: string, fechaFin?: string) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });

    let params: any = {};
    if (fechaInicio) params.fechaInicio = fechaInicio;
    if (fechaFin) params.fechaFin = fechaFin;

    let URL = URL_SERVICIOS + "/roles/admin/all";

    return this.http.get(URL, { headers: headers, params }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }



  GetTarifaHotelera(cFechaInicioSemana: string) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = URL_SERVICIOS + "/tarifa-hotelera/all?dFechaInicioSemana=" + cFechaInicioSemana;
    /* console.log(URL); */
    return this.http.get(URL, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  PostTarifaHotelera(data: any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = URL_SERVICIOS + "/tarifa-hotelera/store";
    return this.http.post(URL, data, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  GetTiposHabitacion() {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = URL_SERVICIOS + "/tarifa-hotelera/allTiposHabitacion";
    /* console.log(URL); */
    return this.http.get(URL, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  PostTipoHabitacion(data: any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = URL_SERVICIOS + "/tarifa-hotelera/storeTiposHabitacion";
    return this.http.post(URL, data, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }


  GetHuespedes(params?: { cNombres?: string; cNroDocumento?: string }): Observable<any> {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = URL_SERVICIOS + "/huesped/all";

    // Construir los parámetros de consulta
    let httpParams = new HttpParams();
    if (params) {
      if (params.cNombres) {
        httpParams = httpParams.set('cNombres', params.cNombres);
      }
      if (params.cNroDocumento) {
        httpParams = httpParams.set('cNroDocumento', params.cNroDocumento);
      }
    }

    return this.http.get(URL, { headers: headers, params: httpParams }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  GetHuespedById(id: number): Observable<any> {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = `${URL_SERVICIOS}/huesped/show?id=${id}`;
    return this.http.get(URL, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  UpdateHuesped(id: number, huespedData: HuespedEntity): Observable<any> {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = `${URL_SERVICIOS}/huesped/update/${id}`;
    return this.http.put(URL, huespedData, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  GetEstancias(params?: { cNombres?: string; cNroHabitacion?: string; checkIn?: string; checkOut?: string }): Observable<any> {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = URL_SERVICIOS + "/estancia/all";

    let httpParams = new HttpParams();
    if (params) {
      if (params.cNombres) {
        httpParams = httpParams.set('cNombres', params.cNombres);
      }
      if (params.cNroHabitacion) {
        httpParams = httpParams.set('cNroHabitacion', params.cNroHabitacion);
      }
      if (params.checkIn) {
        httpParams = httpParams.set('checkIn', params.checkIn);
      }
      if (params.checkOut) {
        httpParams = httpParams.set('checkOut', params.checkOut);
      }
    }

    return this.http.get(URL, { headers: headers, params: httpParams }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }


  GetReservas(params?: { cNombres?: string; cNroHabitacion?: string; checkIn?: string; checkOut?: string; cNroReserva?: string }): Observable<any> {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = URL_SERVICIOS + "/reserva/all";

    let httpParams = new HttpParams();
    if (params) {
      if (params.cNombres) {
        httpParams = httpParams.set('cNombres', params.cNombres);
      }
      if (params.cNroHabitacion) {
        httpParams = httpParams.set('cNroHabitacion', params.cNroHabitacion);
      }
      if (params.cNroReserva) {
        httpParams = httpParams.set('cNroReserva', params.cNroReserva);
      }
      if (params.checkIn) {
        httpParams = httpParams.set('checkIn', params.checkIn);
      }
      if (params.checkOut) {
        httpParams = httpParams.set('checkOut', params.checkOut);
      }
    }

    return this.http.get(URL, { headers: headers, params: httpParams }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  GetCalendarReservas(): Observable<any> {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = URL_SERVICIOS + "/reserva/calendarData";
    return this.http.get(URL, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  GetEstanciaById(id: number): Observable<any> {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = `${URL_SERVICIOS}/estancia/show?id=${id}`;
    return this.http.get(URL, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  UpdateEstancia(id: number, estancia: EstanciaEntity): Observable<any> {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = `${URL_SERVICIOS}/estancia/update/${id}`;
    return this.http.put(URL, estancia, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }


  UpdatePago(pago: PagoEntity): Observable<any> {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = `${URL_SERVICIOS}/estancia/updatePago`;
    return this.http.put(URL, pago, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  GuardarPago(pago: PagoEntity): Observable<any> {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = `${URL_SERVICIOS}/estancia/guardarPago`;
    return this.http.post(URL, pago, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  GetRecepcion(dpFechaCheckIn: string, dpFechaCheckOut: string) {
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = `${URL_SERVICIOS}/recepcion/all?dpFechaCheckIn=${dpFechaCheckIn}&dpFechaCheckOut=${dpFechaCheckOut}`;

    return this.http.get(URL, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }


  GetBuscadorHuesped(cNroDocumento: string): Observable<any> {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = `${URL_SERVICIOS}/recepcion/buscadorHuesped?cNroDocumento=${cNroDocumento}`;
    return this.http.get(URL, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  GetBuscadorHabitacion(id: number, dpFechaCheckIn: string, dpFechaCheckOut: string): Observable<any> {

    this.isLoadingSubject.next(true);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authservice.token}`);
    const url = `${URL_SERVICIOS}/recepcion/buscarHabitacion`;
    const params = {
      id: id.toString(),
      dpFechaCheckIn,
      dpFechaCheckOut,
    };

    return this.http.get<any>(url, { headers, params }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }




  PostValidarHuesped(huesped: HuespedEntity) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = URL_SERVICIOS + "/recepcion/validadorHuesped";
    return this.http.post(URL, huesped, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  PostRegistrarIngreso(huesped: any): Observable<any> {
    this.isLoadingSubject.next(true); // Si tienes un subject de loading
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = URL_SERVICIOS + "/recepcion/registrarIngreso";

    return this.http.post(URL, huesped, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false)) // Si tienes un subject de loading
    );
  }

  PostConfirmarReserva(estancia: any): Observable<any> {
    this.isLoadingSubject.next(true); // Si tienes un subject de loading
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = URL_SERVICIOS + "/web/reserva/ConfirmarReserva";

    return this.http.post(URL, estancia, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false)) // Si tienes un subject de loading
    );
  }

  GetPanel(dpFechaIni: string, dpFechaFin: string) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = `${URL_SERVICIOS}/panel/all?dpFechaIni=${dpFechaIni}&dpFechaFin=${dpFechaFin}`;
    /* console.log(URL); */
    return this.http.get(URL, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  GetPanelReservas() {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = URL_SERVICIOS + "/panel/allreservas";
    /* console.log(URL); */
    return this.http.get(URL, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }


  GetPanelIngresos() {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = URL_SERVICIOS + "/panel/allingresos";
    /* console.log(URL); */
    return this.http.get(URL, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  GetHabitacionesPorReserva(id: number): Observable<any> {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = `${URL_SERVICIOS}/web/reserva/showHabitaciones?id=${id}`;
    return this.http.get(URL, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }
  GetVerificarDisponibilidad(habitacion_id: number, dFechaCheckIn: string, dFechaCheckOut: string): Observable<any> {
    this.isLoadingSubject.next(true);
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    const URL = `${URL_SERVICIOS}/reserva/verificarDisponibilidad?habitacion_id=${habitacion_id}&dFechaCheckIn=${dFechaCheckIn}&dFechaCheckOut=${dFechaCheckOut}`;
    // Realizar la petición GET
    return this.http.get(URL, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false)) // Finalizar el spinner o indicador de carga
    );
  }



  GetHabitacionById(id: number): Observable<any> {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = `${URL_SERVICIOS}/habitacion/show?id=${id}`;
    return this.http.get(URL, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }
  PostHabitacion(habitacion: any): Observable<any> {
    this.isLoadingSubject.next(true); // Si tienes un subject de loading
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = URL_SERVICIOS + "/habitacion/post";

    return this.http.post(URL, habitacion, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false)) // Si tienes un subject de loading
    );
  }

  PutHabitacion(habitacion: any): Observable<any> {
    this.isLoadingSubject.next(true); // Si tienes un subject de loading
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = URL_SERVICIOS + "/habitacion/put";

    return this.http.put(URL, habitacion, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false)) // Si tienes un subject de loading
    );
  }

  PostTemporada(temporada: any): Observable<any> {
    this.isLoadingSubject.next(true); // Si tienes un subject de loading
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = URL_SERVICIOS + "/habitacion/postTemporada";

    return this.http.post(URL, temporada, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false)) // Si tienes un subject de loading
    );
  }

  PostBloqueoReserva(bloqueo: any): Observable<any> {
    this.isLoadingSubject.next(true); // Si tienes un subject de loading
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = URL_SERVICIOS + "/habitacion/postBloqueoReserva";

    return this.http.post(URL, bloqueo, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false)) // Si tienes un subject de loading
    );
  }


  PostHabitacionWeb(habitacion: any): Observable<any> {
    this.isLoadingSubject.next(true); // Si tienes un subject de loading
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = URL_SERVICIOS + "/habitacion/postHabitacionWeb";

    return this.http.post(URL, habitacion, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false)) // Si tienes un subject de loading
    );
  }

  PostRegistrarHuespedEstancia(estanciaHuesped: any): Observable<any> {
    this.isLoadingSubject.next(true); // Si tienes un subject de loading
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = URL_SERVICIOS + "/huesped/registrarHuespedEstancia";

    return this.http.post(URL, estanciaHuesped, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false)) // Si tienes un subject de loading
    );
  }

  PutActualizarHuespedEstancia(estanciaHuesped: any): Observable<any> {
    this.isLoadingSubject.next(true); // Si tienes un subject de loading
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = URL_SERVICIOS + "/huesped/actualizarHuespedEstancia";

    return this.http.put(URL, estanciaHuesped, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false)) // Si tienes un subject de loading
    );
  }


  PutCambioHabitacion(estanciaHuesped: any): Observable<any> {
    this.isLoadingSubject.next(true); // Si tienes un subject de loading
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = URL_SERVICIOS + "/recepcion/putCambioHabitacion";

    return this.http.put(URL, estanciaHuesped, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false)) // Si tienes un subject de loading
    );
  }

  postEstanciaHabitacion(estanciaHabitacionNueva: any): Observable<any> {
    this.isLoadingSubject.next(true); // Si tienes un subject de loading
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = URL_SERVICIOS + "/recepcion/postEstanciaHabitacion";

    return this.http.post(URL, estanciaHabitacionNueva, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false)) // Si tienes un subject de loading
    );
  }

  putEstanciaHabitacion(estanciaHabitacionNueva: any): Observable<any> {
    this.isLoadingSubject.next(true); // Si tienes un subject de loading
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = URL_SERVICIOS + "/recepcion/putEstanciaHabitacion";

    return this.http.put(URL, estanciaHabitacionNueva, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false)) // Si tienes un subject de loading
    );
  }


  GetAllUsers(): Observable<any> {
    this.isLoadingSubject.next(true);
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.authservice.token}` });

    return this.http.get(`${URL_SERVICIOS}/reporte/allUsuarios`, { headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  GetAllHabitaciones(): Observable<any> {
    this.isLoadingSubject.next(true);
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.authservice.token}` });

    return this.http.get(`${URL_SERVICIOS}/reporte/allHabitaciones`, { headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  GetRptIngresosSalidas(
    usuarioResponsable: number = 0,
    tipoMovimiento: number = 3,
    cNroDocumento: string = '',
    desde: string = '',
    hasta: string = ''
  ): Observable<any> {
    this.isLoadingSubject.next(true);
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.authservice.token}` });

    // Crear parámetros para enviar al backend
    let params = new HttpParams()
      .set('usuarioResponsable', usuarioResponsable.toString())
      .set('tipoMovimiento', tipoMovimiento.toString());

    if (cNroDocumento) params = params.set('cNroDocumento', cNroDocumento);
    if (desde) params = params.set('desde', desde);
    if (hasta) params = params.set('hasta', hasta);

    return this.http.get(`${URL_SERVICIOS}/reporte/ingreso-salidas`, { headers, params }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  GetRptCambiosHabitacion(
    usuarioResponsable: number = 0,
    tipoMovimiento: number = 3,
    cNroDocumento: string = '',
    desde: string = '',
    hasta: string = ''
  ): Observable<any> {
    this.isLoadingSubject.next(true);
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.authservice.token}` });

    // Crear parámetros para enviar al backend
    let params = new HttpParams()
      .set('usuarioResponsable', usuarioResponsable.toString())
      .set('tipoMovimiento', tipoMovimiento.toString());

    if (cNroDocumento) params = params.set('cNroDocumento', cNroDocumento);
    if (desde) params = params.set('desde', desde);
    if (hasta) params = params.set('hasta', hasta);

    return this.http.get(`${URL_SERVICIOS}/reporte/cambios-habitacion`, { headers, params }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  GetComprobantes(
    usuarioResponsable: number = 0,
    tipoMovimiento: number = 3,
    cNroDocumento: string = '',
    desde: string = '',
    hasta: string = ''
  ): Observable<any> {
    this.isLoadingSubject.next(true);
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.authservice.token}` });

    // Crear parámetros para enviar al backend
    let params = new HttpParams()
      .set('usuarioResponsable', usuarioResponsable.toString())
      .set('tipoMovimiento', tipoMovimiento.toString());

    if (cNroDocumento) params = params.set('cNroDocumento', cNroDocumento);
    if (desde) params = params.set('desde', desde);
    if (hasta) params = params.set('hasta', hasta);

    return this.http.get(`${URL_SERVICIOS}/comprobante/allComprobantes`, { headers, params }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  GetReclamos(

    tipoMovimiento: number = 3,
    cNroDocumento: string = '',
    desde: string = '',
    hasta: string = ''
  ): Observable<any> {
    this.isLoadingSubject.next(true);
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.authservice.token}` });

    // Crear parámetros para enviar al backend
    let params = new HttpParams()

      .set('tipoMovimiento', tipoMovimiento.toString());

    if (cNroDocumento) params = params.set('cNroDocumento', cNroDocumento);
    if (desde) params = params.set('desde', desde);
    if (hasta) params = params.set('hasta', hasta);

    return this.http.get(`${URL_SERVICIOS}/reclamos/allReclamos`, { headers, params }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  GetReclamacionById(id: number): Observable<any> {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = `${URL_SERVICIOS}/reclamos/${id}`;
    return this.http.get(URL, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  GetReclamacionPDF(id: number): Observable<Blob> {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = `${URL_SERVICIOS}/reclamos/${id}/descargar`;
    return this.http.get(URL, {
      headers: headers,
      responseType: 'blob'  // <-- Esto es clave
    }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }


  UpdateReclamacion(id: number, reclamacion: ReclamacionEntity): Observable<any> {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = `${URL_SERVICIOS}/reclamos/${id}/estado`;
    return this.http.put(URL, reclamacion, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }
  UpdateReclamacionEnvioCorreo(id: number, reclamacion: ReclamacionEntity): Observable<any> {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = `${URL_SERVICIOS}/reclamos/enviar-respuesta`;
    return this.http.put(URL, reclamacion, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  GetRptHuespedesResponsable(
    nNroHabitacion: number,
    nEstadoEstancia: number,
    cNroDocumento: string = '',
    desdeIngreso: string = '',
    hastaIngreso: string = ''
  ): Observable<any> {
    this.isLoadingSubject.next(true);
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.authservice.token}` });

    // Crear parámetros para enviar al backend
    let params = new HttpParams()
    if (nNroHabitacion) params = params.set('nNroHabitacion', nNroHabitacion);
    if (nEstadoEstancia) params = params.set('nEstadoEstancia', nEstadoEstancia);
    if (cNroDocumento) params = params.set('cNroDocumento', cNroDocumento);
    if (desdeIngreso) params = params.set('desdeIngreso', desdeIngreso);
    if (hastaIngreso) params = params.set('hastaIngreso', hastaIngreso);

    return this.http.get(`${URL_SERVICIOS}/reporte/huesped-responsable`, { headers, params }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }



  GetRptIngresosTipoHabitacion(
    nivelHabitacion_id: number,
    desde: string = '',
    hasta: string = ''
  ): Observable<any> {
    this.isLoadingSubject.next(true);
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.authservice.token}` });

    // Crear parámetros para enviar al backend
    let params = new HttpParams()
    if (nivelHabitacion_id) params = params.set('nivelHabitacion_id', nivelHabitacion_id);
    if (desde) params = params.set('desde', desde);
    if (hasta) params = params.set('hasta', hasta);

    return this.http.get(`${URL_SERVICIOS}/reporte/ingresos-tipo`, { headers, params }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }


  GetRptEstadosHabitacion(
    nEstadoLimpieza: number = -1,
    nivelHabitacion_id: number,
    desde: string = '',
    hasta: string = ''
  ): Observable<any> {
    this.isLoadingSubject.next(true);
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.authservice.token}` });

    // Crear parámetros para enviar al backend
    let params = new HttpParams()
    if (nEstadoLimpieza) params = params.set('nEstadoLimpieza', nEstadoLimpieza);
    if (nivelHabitacion_id) params = params.set('nivelHabitacion_id', nivelHabitacion_id);
    if (desde) params = params.set('desde', desde);
    if (hasta) params = params.set('hasta', hasta);

    return this.http.get(`${URL_SERVICIOS}/reporte/estado-habitaciones`, { headers, params }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }


  GetRptCancelaciones(
    usuarioResponsable: number = 0,
    cNroDocumento: string = '',
    desde: string = '',
    hasta: string = ''
  ): Observable<any> {
    this.isLoadingSubject.next(true);
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.authservice.token}` });

    // Crear parámetros para enviar al backend
    let params = new HttpParams()
      .set('usuarioResponsable', usuarioResponsable.toString())

    if (cNroDocumento) params = params.set('cNroDocumento', cNroDocumento);
    if (desde) params = params.set('desde', desde);
    if (hasta) params = params.set('hasta', hasta);

    return this.http.get(`${URL_SERVICIOS}/reporte/cancelaciones`, { headers, params }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }


  PostDescargarPdf(item: any): Observable<Blob> {
    this.isLoadingSubject.next(true); // Indicamos que la carga está activa

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.authservice.token
    });

    const URL = URL_SERVICIOS + "/reporte/generar-pdf";

    return this.http.post<Blob>(URL, item, { headers, responseType: 'blob' as 'json' }).pipe( // Asegúrate de que 'responseType' esté correctamente configurado
      finalize(() => this.isLoadingSubject.next(false)) // Detener carga después de la petición
    );
  }


  /*   PostGenerarComprobante(body: Comprobante): Observable<any> {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer token=${this.token}`
      };
  
      return this.http.post(this.apiUrl, body, { headers });
    }
   */


  PostGenerarComprobante(body: any): Observable<any> {
    this.isLoadingSubject.next(true); // Si tienes un subject de loading
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = URL_SERVICIOS + "/facturacion/generar-comprobante";

    return this.http.post(URL, body, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false)) // Si tienes un subject de loading
    );
  }

  PostObtenerComprobante(body: any): Observable<any> {
    this.isLoadingSubject.next(true); // Si tienes un subject de loading
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = URL_SERVICIOS + "/facturacion/obtener-comprobante";

    return this.http.post(URL, body, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false)) // Si tienes un subject de loading
    );
  }

  PostAnularComprobante(body: any): Observable<any> {
    this.isLoadingSubject.next(true); // Si tienes un subject de loading
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = URL_SERVICIOS + "/facturacion/anular-comprobante";

    return this.http.post(URL, body, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false)) // Si tienes un subject de loading
    );
  }



  GetRUC(
    cNroRuc: string = ''
  ): Observable<any> {
    this.isLoadingSubject.next(true);

    let URLRUC = 'https://dniruc.apisperu.com/api/v1/ruc/' + cNroRuc + '?token=' + this.tokenApiPeru;

    return this.http.get(URLRUC).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  GetDNI(
    cNroDNI: string = ''
  ): Observable<any> {
    this.isLoadingSubject.next(true);

    let URLDNI = 'https://dniruc.apisperu.com/api/v1/dni/' + cNroDNI + '?token=' + this.tokenApiPeru;

    return this.http.get(URLDNI).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  GetBuscarEstancias(params?: { cNombres?: string; cNroHabitacion?: string; checkIn?: string; checkOut?: string }): Observable<any> {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = URL_SERVICIOS + "/facturacion/buscar-estancias";

    let httpParams = new HttpParams();
    if (params) {
      if (params.cNombres) {
        httpParams = httpParams.set('cNombres', params.cNombres);
      }
      if (params.cNroHabitacion) {
        httpParams = httpParams.set('cNroHabitacion', params.cNroHabitacion);
      }
      if (params.checkIn) {
        httpParams = httpParams.set('checkIn', params.checkIn);
      }
      if (params.checkOut) {
        httpParams = httpParams.set('checkOut', params.checkOut);
      }
    }

    return this.http.get(URL, { headers: headers, params: httpParams }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  GetRolById(id: number): Observable<any> {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = `${URL_SERVICIOS}/roles/admin/show?id=${id}`;
    return this.http.get(URL, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  UpdateRol(huespedData: RolEntity): Observable<any> {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = `${URL_SERVICIOS}/roles/admin/update`;
    return this.http.put(URL, huespedData, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  PostRol(huespedData: RolEntity): Observable<any> {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = `${URL_SERVICIOS}/roles/admin/register`;
    return this.http.post(URL, huespedData, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }


  GetMenuItemsIdRol(id: number): Observable<any> {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = `${URL_SERVICIOS}/roles/admin/GetMenuItems?id=${id}`;
    return this.http.get(URL, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  PostPermisosPorUsuarioModulo(usuario: UserEntity): Observable<any> {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = `${URL_SERVICIOS}/roles/admin/PostPermisosPorUsuarioModulo`;
    return this.http.post(URL, usuario, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }
}
