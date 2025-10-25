export class ComprobanteEntity {
    constructor(
        public id?: number,
        public nTipoComprobante?: number,
        public cSerie?: string,
        public nNumero?: number,
        public cEnlace?: string,
        public cEnlacePDF?: string,
        public cEnlaceXML?: string,
        public cEnlaceCDR?: string,
        public bAceptadaPorSunat?: boolean,
        public nTipoDocumento?: number,
        public cClienteNroDocumento?: string,
        public cClienteNombre?: string,
        public cTotalGravada?: string,
        public cTotalIgv?: string,
        public cTotal?: string,
        public cUsuarioResponsable?: string,
        public cFechaCreacion?: string,
        public bAnulado?: boolean,
        public bDisponibleAnulacion?: boolean,
        public lstDetalles?: Array<ComprobanteDetalleEntity>,

        public cDireccion?: string,
        public cCorreo?: string,


    ) { }
}


export class ComprobanteDetalleEntity {
    constructor(
        public cSubTotal?: number,
        public cUnidadMedida?: string,
        public cNroHabitacion?: number,
        public cDescripcion?: string,
        public nCantidad?: number,

        public cSubTotalOriginal?: string,

    ) { }
}