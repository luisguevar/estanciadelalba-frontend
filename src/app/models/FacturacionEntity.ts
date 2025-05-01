export interface ComprobanteItem {
    unidad_de_medida: string;
    codigo: string;
    codigo_producto_sunat: string;
    descripcion: string;
    cantidad: number;
    valor_unitario: number;
    precio_unitario: number;
    descuento?: string;
    subtotal: number;
    tipo_de_igv: number;
    igv: number;
    total: number;
    anticipo_regularizacion?: boolean;
    anticipo_documento_serie?: string;
    anticipo_documento_numero?: string;
}

export interface Guia {
    guia_tipo: number;
    guia_serie_numero: string;
}

export interface CuotaCredito {
    cuota: number;
    fecha_de_pago: string;
    importe: number;
}

export interface Comprobante {
    operacion: string;
    tipo_de_comprobante: number;
    serie: string;
    numero: number;
    sunat_transaction: number;
    cliente_tipo_de_documento: number;
    cliente_numero_de_documento: string;
    cliente_denominacion: string;
    cliente_direccion: string;
    cliente_email: string;
    cliente_email_1?: string;
    cliente_email_2?: string;
    fecha_de_emision: string;
    fecha_de_vencimiento?: string;
    moneda: number;
    tipo_de_cambio?: string;
    porcentaje_de_igv: number;
    descuento_global?: string;
    total_descuento?: string;
    total_anticipo?: string;
    total_gravada: number;
    total_inafecta?: string;
    total_exonerada?: string;
    total_igv: number;
    total_gratuita?: string;
    total_otros_cargos?: string;
    total: number;
    percepcion_tipo?: string;
    percepcion_base_imponible?: string;
    total_percepcion?: string;
    total_incluido_percepcion?: string;
    retencion_tipo?: string;
    retencion_base_imponible?: string;
    total_retencion?: string;
    total_impuestos_bolsas?: string;
    detraccion: boolean;
    observaciones?: string;
    documento_que_se_modifica_tipo?: string;
    documento_que_se_modifica_serie?: string;
    documento_que_se_modifica_numero?: string;
    tipo_de_nota_de_credito?: string;
    tipo_de_nota_de_debito?: string;
    enviar_automaticamente_a_la_sunat: boolean;
    enviar_automaticamente_al_cliente: boolean;
    condiciones_de_pago?: string;
    medio_de_pago?: string;
    placa_vehiculo?: string;
    orden_compra_servicio?: string;
    formato_de_pdf?: string;
    generado_por_contingencia?: string;
    bienes_region_selva?: string;
    servicios_region_selva?: string;
    items: ComprobanteItem[];
    guias?: Guia[];
    venta_al_credito?: CuotaCredito[];
}
