<script>
	import Themeswitcher from './themeswitcher.svelte';
</script>

<div class="relative h-[130px] bg-[#B7DBF6]">
	<div class="flex justify-between mx-6 p-6 z-[5]">
		<img
			src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/coderhublogo.png"
			class="transform transition duration-300 hover:scale-105"
			alt="title"
			width={150}
		/>
		<div class="flex flex-row space-x-4">
			<a class="link link-hover link-info mt-4" href="/login" target="_self" rel="noreferrer">
				Get Started
			</a>
			<a class="link link-hover link-info mt-4" href="/about" target="_blank" rel="noreferrer">
				About us
			</a>
		</div>
	</div>
</div>

<div class="relative">
	<div class="wave-header">
		<svg
			data-name="Layer 1"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 1200 120"
			preserveAspectRatio="none"
		>
			<path
				d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
				class="shape-fill"
			></path>
		</svg>
	</div>
</div>

<style>
	.wave-header {
		position: absolute;
		top: -20px;
		left: 0;
		width: 100%;
		overflow: hidden;
		line-height: 0;
		transform: rotate(180deg);
		z-index: 0;
	}

	.wave-header svg {
		position: relative;
		display: block;
		width: calc(181% + 1.3px);
		height: 550px;
	}

	.wave-header .shape-fill {
		fill: #b7dbf6;
	}
</style>
