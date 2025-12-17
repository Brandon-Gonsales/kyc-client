<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/button.svelte';
	import { paymentConfigService } from '$lib/services';
	import type { PaymentConfig } from '$lib/interfaces';
	import { alert } from '$lib/utils';
	import { onMount } from 'svelte';
    import { UploadIcon } from '$lib/icons/outline';

	interface Props {
		initialData?: PaymentConfig | null;
		onSuccess?: () => void;
		onCancel?: () => void;
	}

	let { initialData = null, onSuccess, onCancel }: Props = $props();

	let loading = $state(false);
	
	// Form fields
	let numero_cuenta = $state(initialData?.numero_cuenta || '');
	let banco = $state(initialData?.banco || '');
	let titular = $state(initialData?.titular || '');
	let tipo_cuenta = $state(initialData?.tipo_cuenta || '');
	let notas = $state(initialData?.notas || '');
	let fileInput: HTMLInputElement;
	let previewUrl: string | null = $state(initialData?.qr_url || null);
	let file: File | null = $state(null);

	function handleFileChange(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.files && target.files.length > 0) {
			file = target.files[0];
			previewUrl = URL.createObjectURL(file);
		}
	}

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		loading = true;

		try {
			const formData = new FormData();
			formData.append('numero_cuenta', numero_cuenta);
			if (banco) formData.append('banco', banco);
			if (titular) formData.append('titular', titular);
			if (tipo_cuenta) formData.append('tipo_cuenta', tipo_cuenta);
			if (notas) formData.append('notas', notas);
			if (file) formData.append('file', file);

			if (initialData) {
				await paymentConfigService.update(formData);
				alert('success', 'Configuración actualizada correctamente');
			} else {
				if (!file) {
                    alert('error', 'El código QR es obligatorio para crear la configuración');
                    loading = false;
                    return;
                }
				await paymentConfigService.create(formData);
				alert('success', 'Configuración creada correctamente');
			}

			if (onSuccess) onSuccess();
		} catch (error: any) {
			console.error(error);
			alert('error', error.message || 'Error al guardar configuración');
		} finally {
			loading = false;
		}
	}
</script>

<form onsubmit={handleSubmit} class="space-y-6">
	<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
		<!-- QR Image Upload -->
		<div class="md:col-span-2 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
			{#if previewUrl}
				<div class="relative mb-4">
					<img src={previewUrl} alt="QR Preview" class="max-h-64 object-contain rounded-md shadow-sm" />
					<button 
						type="button"
						class="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full p-1 shadow hover:bg-gray-100 dark:hover:bg-gray-700 max-w-fit"
						onclick={() => fileInput.click()}
                        title="Cambiar imagen"
					>
                        <div class="size-5 flex items-center justify-center">
                            <span class="text-xs font-bold">✎</span>
                        </div>
					</button>
				</div>
			{:else}
				<div class="text-center">
                    <UploadIcon class="mx-auto h-12 w-12 text-gray-400" />
					<div class="mt-4 flex text-sm leading-6 text-gray-600 dark:text-gray-400">
						<label for="file-upload" class="relative cursor-pointer rounded-md bg-white dark:bg-gray-900 font-semibold text-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-2 hover:text-primary-500">
							<span>Sube una imagen</span>
							<input 
                                id="file-upload" 
                                name="file-upload" 
                                type="file" 
                                class="sr-only" 
                                accept="image/*"
                                bind:this={fileInput}
                                onchange={handleFileChange}
                            >
						</label>
						<p class="pl-1">o arrastra y suelta</p>
					</div>
					<p class="text-xs leading-5 text-gray-600 dark:text-gray-400">PNG, JPG, WEBP hasta 5MB</p>
				</div>
			{/if}
            <!-- Hidden input for clicking on preview edit -->
            {#if previewUrl}
                 <input 
                    type="file" 
                    class="hidden" 
                    accept="image/*"
                    bind:this={fileInput}
                    onchange={handleFileChange}
                >
            {/if}

		</div>

		<!-- Fields -->
		<div>
			<label for="numero_cuenta" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Número de Cuenta *</label>
			<input
				type="text"
				id="numero_cuenta"
				bind:value={numero_cuenta}
				required
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
			/>
		</div>

		<div>
			<label for="banco" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Banco</label>
			<input
				type="text"
				id="banco"
				bind:value={banco}
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
			/>
		</div>

		<div>
			<label for="titular" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Titular</label>
			<input
				type="text"
				id="titular"
				bind:value={titular}
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
			/>
		</div>

		<div>
			<label for="tipo_cuenta" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tipo de Cuenta</label>
            <select
                id="tipo_cuenta"
                bind:value={tipo_cuenta}
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
            >
                <option value="">Seleccione...</option>
                <option value="Ahorro">Caja de Ahorro</option>
                <option value="Corriente">Cuenta Corriente</option>
            </select>
		</div>

		<div class="md:col-span-2">
			<label for="notas" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Notas Adicionales</label>
			<textarea
				id="notas"
				bind:value={notas}
				rows="3"
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
			></textarea>
		</div>
	</div>

	<div class="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
		{#if onCancel}
			<Button type="button" variant="secondary" onclick={onCancel} disabled={loading}>Cancelar</Button>
		{/if}
		<Button type="submit" loading={loading}>
			{initialData ? 'Actualizar' : 'Crear'} Configuración
		</Button>
	</div>
</form>
