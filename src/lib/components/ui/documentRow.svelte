<script lang="ts">
	import { 
		EyeIcon, 
		PencilIcon, 
		PlusIcon, 
		CheckIcon, 
		ExclamationIcon, 
		IdentificationIcon,
		DocumentAddIcon,
		LoaderIcon
	} from '$lib/icons/outline';
	import { FileUpload } from '.';
	import { AcademicCapIcon } from '$lib/icons/outline';

	interface Props {
		title: string;
		icon?: any; // Component type
		url?: string | null;
		status?: 'verificado' | 'rechazado' | 'pendiente';
		uploading?: boolean;
		disabled?: boolean;
		onUpload: (file: File | null) => void;
		accept?: string;
	}

	let { 
		title, 
		icon = DocumentAddIcon, 
		url, 
		status, 
		uploading = false, 
		disabled = false, 
		onUpload,
		accept = '.pdf'
	}: Props = $props();

	function getStatusColor(s?: string) {
		switch (s) {
			case 'verificado': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
			case 'rechazado': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
			default: return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
		}
	}

	function getStatusIcon(s?: string) {
		switch (s) {
			case 'verificado': return CheckIcon;
			case 'rechazado': return ExclamationIcon;
			default: return null;
		}
	}
</script>

<div class="flex items-center justify-between p-3 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-lg group hover:border-light-secondary dark:hover:border-dark-secondary transition-colors">
	<div class="flex items-center gap-3 min-w-0">
		<div class="flex-shrink-0 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-500 dark:text-gray-400">
			{#if icon}
				<icon.component class="size-5" />
			{:else}
				<DocumentAddIcon class="size-5" />
			{/if}
		</div>
		<div class="min-w-0">
			<p class="text-sm font-medium text-gray-900 dark:text-dark-white truncate pr-2">
				{title}
			</p>
			{#if status}
				<div class="flex items-center gap-1 mt-0.5">
					<span class={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-full flex items-center gap-1 ${getStatusColor(status)}`}>
						{status}
					</span>
				</div>
			{:else if url}
				<span class="text-xs text-green-600 dark:text-green-400 font-medium">Subido</span>
			{:else}
				<span class="text-xs text-gray-400">Sin documento</span>
			{/if}
		</div>
	</div>

	<div class="flex items-center gap-2 flex-shrink-0">
		{#if url}
			<a 
				href={url} 
				target="_blank" 
				class="p-2 text-gray-500 hover:text-light-secondary dark:text-gray-400 dark:hover:text-dark-secondary transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
				title="Ver documento"
			>
				<EyeIcon class="size-4" />
			</a>
		{/if}

		{#if !disabled || status !== 'verificado'}
			<FileUpload 
				{accept}
				onFileSelect={onUpload}
				loading={uploading}
				{disabled}
			>
				<button 
					class="p-2 text-gray-500 hover:text-light-secondary dark:text-gray-400 dark:hover:text-dark-secondary transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
					title={url ? "Actualizar" : "Subir"}
					type="button"
					disabled={disabled}
				>
					{#if uploading}
						<LoaderIcon class="size-4 animate-spin" />
					{:else if url}
						<PencilIcon class="size-4" />
					{:else}
						<PlusIcon class="size-4" />
					{/if}
				</button>
			</FileUpload>
		{/if}
	</div>
</div>
