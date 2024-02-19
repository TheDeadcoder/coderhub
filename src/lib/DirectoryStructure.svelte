<!-- DirectoryStructure.svelte -->
<script>
	export let directories;
	export let title;
</script>

{#if directories.length > 0}
	<div class="card">
		<h3>{title}</h3>

		<ul>
			{#each directories as directory}
				<li class={directory.startsWith('│') ? 'directory' : 'file'}>
					{directory}
				</li>
			{/each}
		</ul>
	</div>
{/if}

<style>
	.card {
		background-color: #fff;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		padding: 20px;
	}

	ul {
		list-style-type: none;
		padding-left: 0;
		margin-top: 0;
	}

	li {
		margin-bottom: 5px;
	}

	.directory {
		margin-left: 15px;
		color: #555;
	}

	.file {
		margin-left: 15px;
		color: #777;
	}

	/* Increase spacing for printing */
	@media print {
		li {
			margin-bottom: 10px;
		}

		.directory,
		.file {
			margin-left: 20px;
		}
	}
</style>
