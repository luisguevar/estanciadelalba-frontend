import { HuespedEntity } from "./HuespedEntity";

export class EstanciaEntity {
    constructor(
        public id?: number,
        public cNroReserva?: string,
        public cFechaCheckIn?: string,
        public cFechaCheckOut?: string,
        public cFechaReservaCheckIn?: string,
        public cFechaReservaCheckOut?: string,
        public nEstado?: number,

        public cNombres?: string,
        public cApellidos?: string,
        public cCorreo?: string,
        public cNroCelular?: string,
        public cHabitaciones?: string,
        public dFechaCheckIn?: string,
        public dFechaCheckOut?: string,
        public nTotalNoches?: number,
        public nTotalNochesReserva?: number,
        public dFechaCheckInProgramado?: string,
        public dFechaCheckOutProgramado?: string,
        public cFechaCheckOutProgramado?: string,
        public cObservaciones?: string,
        public cNombreTitular?: string,
        public cNroDocumenoTitular?: string,
        public cNroCelularTitular?: string,
        public nTotalHabitaciones?: number,
        public dFechaReservaCheckOut?: string,
        public dFechaReservaCheckIn?: string,

        public lstEstanciaHabitacion?: Array<EstanciaHabitacionEntity>,
        public lstPagos?: Array<PagoEntity>,
        public huespedTitular?: HuespedEntity,

        public dFechaReserva?: string,
        public nNumerReservas?: number,
        public nTotalAPagar?: number,
        public reservaWeb_id?: number,
        public nAccion?: number,
        public cCodigoPagoReferencia?: string,
        public nEstadoHabitacion?: number,
        public huespedResponsable_id?: number,
        public usuarioResponsable_id?: number,
        public nNroHuespedes?: number,
        public nMontoPagar?: number,
        public nMontoPagado?: number,
        public cNroHabitacion?: string,


        public cNombreTitularCompleto?: string,
        public cNroDocumento?: string,
        public cFechaEntrada?: string,
        public cFechaSalida?: string,
        public nTotalPagado?: number,

        



    ) { }
}

export class PagoEntity {
    constructor(
        public id?: number,
        public cFechaPago?: string,
        public nMontoPagado?: number,
        public nEstado?: number,
        public cNombreTitular?: string,
        public dFechaPago?: string,

        public estancia_id?: number,
        public nTipoPago?: number,
        public nMetodoPago?: number,
        public cNroDocumentoTitular?: string,
        public cCorreoTitular?: string,
        public nEstanciasPagadas?: number,
        public nEstanciasPendientesPago?: number,
        public cPorcentajePendiente?: string,
        public nTotalPagosCompletos?: string,

    ) { }
}

export class EstanciaHabitacionEntity {
    constructor(
        public id?: number,
        public habitacion_id?: number,
        public nNroHabitacion?: number,
        public cNombreTipoHabitacion?: string,
        public nPrecioEstanciaHabitacion?: number,
        public lstHuespedes?: Array<EstanciaHabitacionHuespedEntity>,
        public nTotalNoches?: number,
        public nTotalHuespedesHabitacion?: number,
        public lstEstanciaHabitacionHuesped?: Array<EstanciaHabitacionHuespedEntity>,
        public lstPagos?: Array<PagoEntity>,
        public nPrecioTotal?: number,
        public estanciaHabitacion_id?: number,
        public nEstado?: number,
        public estancia_id?: number

    ) { }
}
export class EstanciaHabitacionHuespedEntity {
    constructor(
        public id?: number,
        public cNombres?: string,
        public cApellidos?: string,
        public nTipoDocumento?: number,
        public cNroDocumento?: string,
        public cNroCelular?: string,
        public cCorreo?: string,
        public cPaisOrigen?: string,
        public cFechaUltimaEstancia?: string,
        public cFechaRegistro?: string,
        public nPaisOrigen?: number,
        public pais_id?: number,
        public huesped_id?: number,
        public estanciaHabitacion_id?: number

    ) { }
}

export class resumenCheckInEntity {
    constructor(
        public nTotalReservas?: number,

        public nTotalPendienteCheckIn?: number,
        public cPorcentajeCheckInPendiente?: string,


    ) { }
}

export class resumenCheckOutEntity {
    constructor(
        public nTotalEstanciasConCheckOut?: number,
        public nTotalEstanciasPorCheckOut?: number,
        public cPorcentajeCheckOutPendiente?: string,


    ) { }
}