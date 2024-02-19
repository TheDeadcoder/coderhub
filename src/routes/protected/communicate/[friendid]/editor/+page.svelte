<script>
	import Themeswitcher from '$lib/themeswitcher.svelte';
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	// import * as monaco from 'monaco-editor';
	import { page } from '$app/stores';
	const { friendid } = $page.params;

	export let data;
	let title;

	let { session, supabase, userNow, friendNow, allcodes } = data;
	$: ({ session, supabase, userNow, friendNow, allcodes } = data);

	function navigateToChats() {
		window.open(`/protected/communicate/${friendid}/chat`, '_self');
	}
	function navigateToSharedEditor() {
		window.open(`/protected/communicate/${friendid}/editor`, '_self');
	}
	function navigateToVideoCall() {
		window.open(`/protected/communicate/${friendid}/videocall`, '_self');
	}
	let showaddmodal = false;
	function addclassmodal() {
		showaddmodal = true;
	}

	function closeclassmodal() {
		showaddmodal = false;
	}

	function gotoEditor(id) {
		window.open(`/protected/communicate/${friendid}/editorspec/${id}`, '_self');
	}

	const handleSignOut = async () => {
		// console.log('logout start');
		await data.supabase.auth.signOut();
		// console.log('logout done');
		window.open('/login', '_self');
	};

	onMount(async () => {});
</script>

<nav class="fixed top-0 z-50 w-full py-6 backdrop-blur-md">
	<div class="flex flex-row justify-between">
		<div class="logo-container flex items-center">
			<img
				src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/coderhublogo.png"
				class="transform transition duration-300 hover:scale-105"
				alt="title"
				width={150}
			/>
		</div>

		<ul class="links">
			<Themeswitcher />
			<li>
				<a href="/protected/home" class="flex items-center p-1 font-bold"
					><img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/home-house-svgrepo-com.svg"
						alt="Dashboard Icon"
						class="h-5 mr-1 hover:rotate-12"
					/>
					Home</a
				>
			</li>
			<li>
				<a href="/protected/library" class="flex items-center p-1 font-bold"
					><img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/book-opened-svgrepo-com%20(1).svg"
						alt="Dashboard Icon"
						class="h-5 mr-1 hover:rotate-12"
					/>
					Library</a
				>
			</li>

			<li>
				<a href="/protected/chatbot" class="flex items-center p-1 font-bold"
					><img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/robot.svg"
						alt="Dashboard Icon"
						class="h-5 mr-1 hover:rotate-12"
					/>
					Chatbot</a
				>
			</li>

			<li>
				<a href="/protected/planner" class="flex items-center p-1 font-bold mr-3"
					><img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/calendar-svgrepo-com.svg"
						alt="Dashboard Icon"
						class="h-5 hover:rotate-12"
					/>
					Planner</a
				>
			</li>
			<li>
				<a href="/protected/messenger" class="flex items-center p-1 font-bold mr-3"
					><img
						src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/earth-globe-connection-svgrepo-com.svg"
						alt="Dashboard Icon"
						class="w-8 mt-1 hover:rotate-12"
					/>
				</a>
			</li>
			<li>
				<button class="btn" on:click={handleSignOut}>
					<img
						src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/logout-svgrepo-com.svg"
						alt="Dashboard Icon"
						class="w-8 mt-1 hover:rotate-12"
					/>
				</button>
			</li>
		</ul>
	</div>
</nav>

<main class=" min-h-screen mt-28">
	<div class="flex">
		<div class="fixed">
			<div class="h-screen fixed w-64 shadow-md z-0 py-4">
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<ul class="text-base font-semibold">
					<!-- svelte-ignore missing-declaration -->
					<!-- svelte-ignore missing-declaration -->
					<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
					<li
						class="flex items-center p-4 hover:bg-gray-300 cursor-pointer"
						on:click={navigateToChats}
					>
						<img
							src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/chat-svgrepo-com%20(1).svg"
							alt="Dashboard Icon"
							class="w-6 h-6 mr-2"
						/>
						Chats
					</li>
					<li
						class="flex items-center p-4 bg-red-400 cursor-default"
						on:click={navigateToSharedEditor}
					>
						<img
							src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/code-svgrepo-com%20(1).svg"
							alt="Query Icon"
							class="w-6 h-6 mr-2"
						/>
						Editor
					</li>
					<li
						class="flex items-center p-4 hover:bg-gray-300 cursor-pointer"
						on:click={navigateToVideoCall}
					>
						<img
							src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/video-call-svgrepo-com.svg?t=2024-02-15T21%3A29%3A48.870Z"
							alt="Add New Hospital Icon"
							class="w-6 h-6 mr-2"
						/>
						Video Call
					</li>
				</ul>
			</div>
		</div>
		<div class="ml-72 w-full mt-6">
			<button class="btn p-3" on:click={addclassmodal}>
				<div class="flex flex-row space-x-3">
					<img
						src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/plus-cross-svgrepo-com.svg?t=2024-02-16T12%3A28%3A07.843Z"
						alt="Add New Hospital Icon"
						class="w-6 h-6 mr-2"
					/>

					<h4>Start a New code Editor</h4>
				</div>
			</button>
			<h1 class="mt-4 font-extrabold text-xl">
				Shared Codefiles between you and {friendNow.name}
			</h1>
			<div class="grid grid-cols-4 gap-12 mt-4">
				{#if allcodes}
					{#each allcodes as currCode}
						<button
							class="flex flex-col shadow-xl items-center justify-center p-4"
							on:click={() => gotoEditor(currCode.id)}
						>
							<img
								src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/coderhub%20editor.png?t=2024-02-19T07%3A05%3A17.600Z"
								alt="Add New Hospital Icon"
								class="w-20 h-20 mr-2"
							/>
							<h2 class="text-2xl font-bold">
								{currCode.title}
							</h2>
							<h4 class="font-semibold">Go to Editor</h4>
						</button>
					{/each}
				{/if}
			</div>
			<!-- <pre>{JSON.stringify(userNow, null, 2)}</pre>
			<pre>{JSON.stringify(allcodes, null, 2)}</pre> -->
			{#if showaddmodal}
				<div
					class="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 transition-opacity backdrop-blur-sm"
				>
					<div class="bg-blue-200 p-6 rounded-lg shadow-lg max-w-md w-full m-4">
						<div class="flex justify-between items-center mb-4">
							<h2 class="text-2xl font-bold">Add a new class</h2>
							<button class=" text-lg" on:click={closeclassmodal}>&times;</button>
						</div>

						<form
							use:enhance
							action="?/upload"
							method="POST"
							on:submit={() => {
								closeclassmodal();
							}}
						>
							<div class="flex flex-col space-y-6">
								<label class="label text-left mb-3">
									<span>File Title</span>

									<input
										class="input"
										type="text"
										id="title"
										name="title"
										bind:value={title}
										placeholder="Enter The name of the micro course"
									/>
								</label>

								<button type="submit" class="btn variant-filled-primary text-xl font-semibold">
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
			{/if}
		</div>
	</div>
</main>

<style>
	.appbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;

		border-bottom: 1px solid #ccc;
	}

	.links {
		display: flex;
		list-style: none;
		margin: 0;
	}

	.links li {
		margin-left: 2rem;
	}
	.links a {
		text-decoration: none;
		transition: color 0.2s ease-in-out;
	}

	.links a:hover {
		color: #007bff; /* Accent color from Skeleton UI */
	}

	.logo-container {
		display: flex;
		align-items: center;
	}
</style>
