export function formatDate(dateString: string): string {
	if (!dateString) return '';
	const date = new Date(dateString);
	return new Intl.DateTimeFormat('es-BO', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	}).format(date);
}

export function formatCurrency(amount: number): string {
	return new Intl.NumberFormat('es-BO', {
		style: 'currency',
		currency: 'BOB'
	}).format(amount);
}
