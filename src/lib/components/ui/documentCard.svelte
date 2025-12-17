<script lang="ts">
	import { IdentificationIcon, AcademicCapIcon, ArrowDownTrayIcon, PencilIcon } from '$lib/icons/outline';
	import { FileUpload } from '.';

	interface Props {
		title: string;
		icon: 'ci' | 'cv' | 'afiliacion' | 'titulo';
		url?: string | null;
		uploading: boolean;
		onUpload: (file: File | null) => void;
		disabled?: boolean;
		statusBadge?: string;
	}

	let { 
		title, 
		icon, 
		url, 
		uploading, 
		onUpload, 
		disabled = false, 
		statusBadge 
	}: Props = $props();
</script>

<div class="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
	<div class="flex-shrink-0">
		{#if icon === 'ci'}
			<div class="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
				<IdentificationIcon class="size-6 text-blue-600 dark:text-blue-400" />
			</div>
		{:else if icon === 'cv'}
			<div class="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
				<svg class="size-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
				</svg>
			</div>
		{:else if icon === 'afiliacion'}
			<div class="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
				<svg class="size-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			</div>
		{:else}
			<div class="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
				<AcademicCapIcon class="size-6 text-yellow-600 dark:text-yellow-400" />
			</div>
		{/if}
	</div>
	
	<div class="flex-1 min-w-0">
		<div class="flex items-start justify-between gap-2 mb-2">
			<h4 class="text-sm font-medium text-gray-900 dark:text-white">
				{title}
			</h4>
			{#if statusBadge}
				<span class={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${
					statusBadge === 'verificado' 
						? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
					statusBadge === 'rechazado' 
						? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
					'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
				}`}>
					{statusBadge === 'verificado' ? 'Verificado' :
					 statusBadge === 'rechazado' ? 'Rechazado' : 'Pendiente'}
				</span>
			{/if}
		</div>
		
		{#if url}
			<div class="flex items-center gap-2">
				<a 
					href={url} 
					target="_blank"
					class="text-xs text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 flex items-center gap-1"
				>
					Ver documento
					<svg class="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
					</svg>
				</a>
				<span class="text-gray-300 dark:text-gray-600">•</span>
				<a 
					href={url} 
					download
					class="text-xs text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 flex items-center gap-1"
				>
					<ArrowDownTrayIcon class="size-3" />
					Descargar
				</a>
			</div>
			{#if !disabled}
				<div class="mt-2">
					<FileUpload 
						accept=".pdf" 
						onFileSelect={onUpload}
						disabled={uploading}
					>
						<button class="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center gap-1">
							<PencilIcon class="size-3" />
							{uploading ? 'Subiendo...' : 'Actualizar'}
						</button>
					</FileUpload>
				</div>
			{/if}
		{:else}
			<p class="text-xs text-gray-500 dark:text-gray-400 mb-2">
				No hay documento
			</p>
			{#if !disabled}
				<FileUpload 
					accept=".pdf" 
					onFileSelect={onUpload}
					disabled={uploading}
				>
					<button class="text-xs font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 flex items-center gap-1">
						<svg class="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
						</svg>
						{uploading ? 'Subiendo...' : 'Subir Documento'}
					</button>
				</FileUpload>
			{/if}
		{/if}
	</div>
</div>
