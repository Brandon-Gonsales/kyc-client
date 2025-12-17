import { apiKyC } from '$lib/config';
import type { PaymentConfig } from '../interfaces';

class PaymentConfigService {
	// Base endpoint path relative to api/v1 is already handled by apiKyC if I pass just /payment-config/
	// apiKyC concatenates BASE_URL + /api/v1 + endpoint
	// The plan had explicit /api/v1 in url, but apiKyC adds it.
	// Let's check payment.service.ts: it uses `/payments/?...` so yes.

	async get(): Promise<PaymentConfig> {
		return await apiKyC.get<PaymentConfig>('/payment-config/');
	}

	async create(data: FormData): Promise<PaymentConfig> {
		// apiKyC automatically handles FormData content-type
		return await apiKyC.post<PaymentConfig>('/payment-config/', data);
	}

	async update(data: FormData): Promise<PaymentConfig> {
		return await apiKyC.put<PaymentConfig>('/payment-config/', data);
	}

	async delete(): Promise<PaymentConfig> {
		return await apiKyC.delete<PaymentConfig>('/payment-config/');
	}
}

export const paymentConfigService = new PaymentConfigService();
