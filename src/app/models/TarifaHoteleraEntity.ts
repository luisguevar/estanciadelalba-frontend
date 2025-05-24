import { EstanciaEntity } from "./EstanciaEntity";

export class HabitacionEntity {
    constructor(
        public id?: number,
        public nNroHabitacion?: number,
        public cNombreTipo?: string,
        public cNombreNivel?: string,
        public tipoHabitacion_id?: number,
        public nEstado?: number,
        public lstServicios?: Array<ServicioEntity>,
        public lstPrecios?: Array<DiaEntity>,
        public nEstadoEstancia?: number,
        public estancia_id?: number,
        public cHoraCheckOut?: string,
        public nNumeroCamas?: number,
        public nNumeroPersonas?: number,
        public cNombreTipoHabitacion?: string,
        public nPrecioEstanciaHabitacion?: number,
        public nTotalNoches?: number,
        public habitacion_id?: number,
        public nivelHabitacion_id?: number,
        public reservaWeb_id?: number,
        public cEstado?: string,
        public cTipoHabitacion?: string,
        public bAdicional?: boolean,
        public nPrecioTotal?: number,
        public lstPreciosPorTemporada?: Array<TemporadaEntity>,
        public lstPreciosPorTemporadaDelete?: Array<TemporadaEntity>,
        public bActivo?: boolean,
        public cImagen?: string,
        public nColorHabitacion?: number,
        public infoEstancia?: EstanciaEntity,
        public cMotivoBloqueo?: string,
        public nEstadoHabitacion?: number,
        public lstHorariosOcupados?: Array<HorarioOcupadoEntity>

    ) { }
}

export class ServicioEntity {
    constructor(
        public id?: number,
        public cNombreServicio?: string,
        public nEstado?: number,
        public bActivo?: boolean
    ) { }
}

export class DiaEntity {
    constructor(
        public id?: number,
        public cNombreDia?: string,
        public cAbreviado?: string,
        public nEstado?: number,
        public nPrecio?: number,
        public cFechaAbrev?: string
    ) { }
}

export class TipoHabitacionEntity {
    constructor(
        public id?: number,
        public cNombreTipo?: string,
        public nNroCamas?: number,
        public lstTipoCamas?: Array<TipoHabitacionCamaEntity>,
        public nTotalPersonas?: number,
        public nTotalCamas?: number,
        public nAforo?: number
    ) { }
}

export class TipoHabitacionCamaEntity {
    constructor(
        public id?: number,
        public cNombreCama?: string,
        public bActivo?: boolean,
        public nNroPersonas?: number,
        public nCantidad?: number
    ) { }
}

export class TemporadaEntity {
    constructor(
        public id?: number,
        public cNombreTemporada?: string,
        public dFechaInicio?: Date,
        public dFechaFin?: Date,
        public cFechaInicio?: string,
        public cFechaFin?: string,
        public nPrecio?: number,
        public nEstado?: number,
        public lstHabitaciones?: Array<any>,
        public lstTiposHabitaciones?: Array<any>,
        public lstNiveles?: Array<any>,
        public nTipoAsignacion?: number,
    ) {

    }
}


export class HorarioOcupadoEntity {
    constructor(
        public id?: number,
        public dFechaCheckIn?: string,
        public dFechaCheckOut?: string,
    ) {

    }
}