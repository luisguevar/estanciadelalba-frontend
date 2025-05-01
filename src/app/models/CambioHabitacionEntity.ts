export class CambioHabitacionEntity {
    constructor(
        public estanciaHabitacionOrigen_id?: number,
        public nNroHabitacionOrigen?: number,
        public estanciaHabitacionDestino_id?: number,
        public nPrecioEstanciaHabitacion?: number,
        public nNroHabitacionDestino?: number,
        public cObservaciones?: string,
        public bCambioPrecio?: boolean,
        public estancia_id?: number,
        public habitacion_id?: number,

        public nEstadoHabitacion?: number,
        public cMotivoBloqueo?: string,
        public usuarioResponsable_id?:number

    ) { }
}