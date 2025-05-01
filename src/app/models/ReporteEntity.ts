export class IngresoSalidaEntity {
    constructor(
        public cTipoMovimiento?: string,
        public dFechaMovimiento?: string,
        public cNroHabitacion?: string,
        public nNroHuespedes?: number,
        public nMontoPagado?: number,
        public nMontoPagar?: number,
        public cHuespedResponsable?: string,
        public cUsuarioResponsable?: string


    ) { }
}


export class RptCambioHabitacionEntity {
    constructor(



        public cObservaciones?: string,
        public nNroHabitacionDestino?: number,
        public nNroHabitacionOrigen?: number,
        public dFechaCambio?: string,
        public cEstadoEstancia?: string,
        public cUsuarioResponsable?: string,
        public cHuespedResponsable?: string,


    ) { }
}


export class RptHuespedResponsable {
    constructor(

        public nNroHabitacion?: number,
        public cHuespedResponsable?: string,
        public cNroDocumentoResponsable?: string,
        public cTipoDocumentoResponsable?: string,
        public cNroCelular?: string,
        public cCorreo?: string,
        public dFechaIngreso?: string,
        public dFechaSalida?: string,
        public cEstadoEstancia?: string,
    ) {

    }
}

export class RptIngresoTipoHabitacion {
    constructor(
        public nTotalEstancias?: number,
        public nIngresosTotales?: number,
        public cTipoHabitacion?: string,
        public cNiveles?: string,

    ) {

    }
}

export class RptEstadosHabitacion {
    constructor(
        public nNroHabitacion?: number,
        public cTipoHabitacion?: string,
        public cNivelHabitacion?: string,
        public cEstadoLimpieza?: string,
        public dFechaActualizacion?: string,

    ) {

    }
}

export class RptCancelaciones {
    constructor(



        public dFechaCancelacion?: string,
        public cMotivo?: string,
        public cUsuarioResponsable?: string,
        public cHuespedResponsable?: string,
        public cNrosHabitaciones?: string,
        public cEstado?:string,
        public cNroReserva?:string
       

    


    ) { }
}