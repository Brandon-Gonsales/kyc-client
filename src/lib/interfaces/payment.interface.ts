export interface Payment {
	_id: string;
	cantidad_pago: number;
	comprobante_url: string;
	concepto: string;
	created_at: string;
	curso_id: string;
	estado_pago: string;
	estudiante_id: string;
	fecha_subida: string;
	inscripcion_id: string;
	numero_transaccion: string;
	updated_at: string;
}

export interface CreatePaymentRequest {
	cantidad_pago: number;
	comprobante_url: string;
	concepto: string;
	inscripcion_id: string;
	numero_transaccion: string;
	
	// Fields needed if backend expects them, though strictly only the above 5 were in the user's example body.
	// But usually we need student_id if not inferred from token.
	// I'll leave them as optional or exclude if strictly following the body example. 
	// However, to avoid type errors in possible existing code, I will keep standard ones or ensure type safety.
	// User example body: cantidad_pago, comprobante_url, concepto, inscripcion_id, numero_transaccion.
}

export interface UpdatePaymentRequest extends Partial<CreatePaymentRequest> {
	estado_pago?: string;
	fecha_pagada?: string;
}
