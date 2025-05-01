export class ReclamacionEntity {
    constructor(
        public id?: number,
        public cNroHoja?: string,
        public cNombreReclamante?: string,
        public cDomicilioReclamante?: string,
        public nTipoDocumentoReclamante?: number,
        public cNroDocumentoReclamante?: string,
        public cTelefonoReclamante?: string,
        public cEmailReclamante?: string,
        public cApoderadoReclamante?: string,
        public nTipoBien?: number,
        public nMontoReclamadoBien?: number,
        public cDescripcionBien?: string,
        public nTipoDisconformidad?: number,
        public cDetalleDisconformidad?: string,
        public cPedidoDisconformidad?: string,
        public cRespuestaProveedor?: string,
        public dFechaRespuestaProveedor?: string,
        public nEstadoReclamacion?: number,
        public nMoneda?: number,
        public cFechaRegistro?: string,
        public cActualizadoPor?: string,
        public usuarioResponsable_id?:number

    ) { }
}

