<script>
	import { onMount } from 'svelte';
	/** @type {import('./$types').PageData} */
	export let data;
	/**
	 * @type {typeof import("./Videocall.svelte").default}
	 */
	let Videocall;
	let inCall = true;
	onMount(async () => {
		const module = await import('./Videocall.svelte');
		Videocall = module.default;
	});
</script>

{#if inCall}
	<div class="mt-6 ml-10 mr-10">
		<h1 class="text-xl font-bold">Ongoing call with {data.friendNow.name}</h1>
		<div style="text-align: center">
			<button
				class="btn"
				on:click={() => {
					inCall = false;
				}}
				><img
					src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/end-call-icon.svg?t=2024-02-16T05%3A43%3A33.489Z"
					alt="Dashboard Icon"
					class="h-8 mr-1 hover:rotate-12"
				/>End Call</button
			>
		</div>
		<br />
		<svelte:component this={Videocall} {data} />
	</div>
{:else}
	<div class="mt-6 ml-10 mr-10">
		<h1 class="text-xl font-bold">You are Disconnected</h1>
		<div style="text-align: center">
			<button class="btn" on:click={() => (inCall = true)}
				><img
					src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/phone-call-telephone-svgrepo-com.svg"
					alt="Dashboard Icon"
					class="h-8 mr-1 hover:rotate-12"
				/>Rejoin</button
			>
			<a href="/protected/communicate/{data.friendNow.id}/videocall" class="btn ml-20"
				><button>Back</button></a
			>
		</div>
	</div>
{/if}
