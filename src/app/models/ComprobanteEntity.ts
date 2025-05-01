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



    ) { }
}