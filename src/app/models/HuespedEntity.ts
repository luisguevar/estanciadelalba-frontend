export class HuespedEntity {
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
    ) { }
}