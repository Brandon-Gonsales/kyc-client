import { apiKyC } from '$lib/config';
import type { Payment, CreatePaymentRequest, UpdatePaymentRequest } from '$lib/interfaces';

class PaymentService {
	async getAll(skip = 0, limit = 100, estado?: string): Promise<Payment[]> {
		let url = `/payments/?skip=${skip}&limit=${limit}`;
		if (estado) {
			url += `&estado=${estado}`;
		}
		return await apiKyC.get<Payment[]>(url);
	}

	async create(data: CreatePaymentRequest): Promise<Payment> {
		return await apiKyC.post<Payment>('/payments/', data);
	}

	async update(id: string, data: UpdatePaymentRequest): Promise<Payment> {
		return await apiKyC.put<Payment>(`/payments/${id}`, data);
	}

	async delete(id: string): Promise<Payment> {
		return await apiKyC.delete<Payment>(`/payments/${id}`);
	}

	async approve(id: string): Promise<Payment> {
		return await apiKyC.put<Payment>(`/payments/${id}/aprobar`, {});
	}

	async reject(id: string, motivo: string): Promise<Payment> {
		return await apiKyC.put<Payment>(`/payments/${id}/rechazar`, { motivo });
	}

}

export const paymentService = new PaymentService();
