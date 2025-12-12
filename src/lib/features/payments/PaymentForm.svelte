<script lang="ts">
	import { onMount } from 'svelte';
	import { enrollmentService, paymentService } from '$lib/services';
	import type { Enrollment, CreatePaymentRequest } from '$lib/interfaces';
	import { userStore } from '$lib/stores/userStore';
	import Button from '$lib/components/ui/button.svelte';
	import Input from '$lib/components/ui/input.svelte';
	import Select from '$lib/components/ui/select.svelte';
	import { alert } from '$lib/utils';
	import { UploadIcon } from '$lib/icons/outline';

	interface Props {
		onSuccess: () => void;
		onCancel: () => void;
	}

	let { onSuccess, onCancel }: Props = $props();

	let enrollments: Enrollment[] = $state([]);
	let loading = $state(true);
	let saving = $state(false);
	
	let selectedEnrollmentId = $state('');
	let amount = $state('');
	let transactionNumber = $state('');
	let concept = $state('MATRICULA');
	let voucherUrl = $state('');

	onMount(async () => {
		try {
			if ($userStore.user?._id) {
				enrollments = await enrollmentService.getByStudentId($userStore.user._id);
			}
		} catch (error) {
			console.error(error);
			alert('error', 'Error al cargar inscripciones');
		} finally {
			loading = false;
		}
	});

	async function handleSubmit() {
		if (!selectedEnrollmentId || !amount || !transactionNumber || !voucherUrl) {
			alert('error', 'Todos los campos son obligatorios');
			return;
		}

		saving = true;
		try {
			// 1. Create Payment directly with URL
			const payload: CreatePaymentRequest = {
				inscripcion_id: selectedEnrollmentId,
				numero_transaccion: transactionNumber,
				concepto: concept,
				cantidad_pago: Number(amount),
				comprobante_url: voucherUrl
			};

			await paymentService.create(payload);
			alert('success', 'Pago registrado correctamente');
			onSuccess();
		} catch (error: any) {
			console.error(error);
			alert('error', error.message || 'Error al registrar pago');
		} finally {
			saving = false;
		}
	}
</script>

<form class="space-y-6" onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
	<div>
		<label for="enrollment" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Inscripción</label>
		{#if loading}
			<div class="h-10 w-full animate-pulse rounded-md bg-gray-200 dark:bg-gray-700"></div>
		{:else}
			<select
				id="enrollment"
				bind:value={selectedEnrollmentId}
				required
				class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
			>
				<option value="">Seleccione una inscripción</option>
				{#each enrollments as enrollment}
					<option value={enrollment._id}>
						{enrollment.created_at.split('T')[0]} - Total: {enrollment.total_a_pagar} Bs. (Saldo: {enrollment.saldo_pendiente} Bs.)
					</option>
				{/each}
			</select>
		{/if}
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
		<Select label="Concepto" bind:value={concept} required>
			<option value="MATRICULA">Matrícula</option>
			<option value="CUOTA">Cuota</option>
			<option value="TOTAL">Pago Total</option>
			<option value="OTRO">Otro</option>
		</Select>

		<Input label="Monto (Bs)" type="number" bind:value={amount} required placeholder="0.00" min="1" step="0.01" />
	</div>

	<Input label="Número de Transacción" bind:value={transactionNumber} required placeholder="Ej: 12345678" />

	<Input label="URL del Comprobante" bind:value={voucherUrl} required placeholder="https://..." />

	<div class="flex justify-end gap-3 pt-4">
		<Button type="button" variant="secondary" onclick={onCancel} disabled={saving}>Cancelar</Button>
		<Button type="submit" loading={saving}>
			{#snippet leftIcon()} <UploadIcon class="size-5" /> {/snippet}
			Registrar Pago
		</Button>
	</div>
</form>
