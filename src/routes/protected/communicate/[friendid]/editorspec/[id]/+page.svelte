<script>
	import Themeswitcher from '$lib/themeswitcher.svelte';
	import { onMount } from 'svelte';
	// import * as monaco from 'monaco-editor';
	import { page } from '$app/stores';
	const { friendid, id } = $page.params;

	export let data;
	import { browser } from '$app/environment';
	let monacoEditor;
	let editorInstance;
	let { session, supabase, userNow, friendNow } = data;
	$: ({ session, supabase, userNow, friendNow } = data);

	function navigateToChats() {
		window.open(`/protected/communicate/${friendid}/chat`, '_self');
	}
	function navigateToSharedEditor() {
		window.open(`/protected/communicate/${friendid}/editor`, '_self');
	}
	function navigateToVideoCall() {
		window.open(`/protected/communicate/${friendid}/videocall`, '_self');
	}
	// function initMonaco() {
	// 	const editor = monacoEditor.editor.create(document.getElementById('editor'), {
	// 		value: '// your code here',
	// 		language: 'javascript'
	// 	});
	// }

	const documentId = id;
	let docTitle;
	let docOwner;
	function debounce(func, wait, immediate) {
		var timeout;
		return function () {
			var context = this,
				args = arguments;
			var later = function () {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	}

	async function initMonaco(content = '// Your code here\n') {
		if (browser) {
			monacoEditor = await import('monaco-editor');
			editorInstance = monacoEditor.editor.create(document.getElementById('editor'), {
				value: content,
				language: 'javascript',
				theme: 'vs-dark'
			});

			// Handle editor changes with debounce to minimize database updates
			editorInstance.onDidChangeModelContent(
				debounce((event) => {
					updateDocument(editorInstance.getValue());
				}, 1000)
			); // Adjust debounce time as necessary
		}
	}
	async function loadDocument() {
		const { data, error } = await supabase
			.from('documents')
			.select('*')
			.eq('id', documentId)
			.single();

		if (data) {
			docTitle = data.title;
			docOwner = data.ownerid;
			initMonaco(data.content);
			subscribeToChanges();
		} else if (error) {
			console.error('Error loading document:', error);
		}
	}
	function subscribeToChanges() {
		supabase
			.channel(`custom-all-channel`)
			.on(
				'postgres_changes',
				{ event: 'UPDATE', schema: 'public', table: 'documents', filter: `id=eq.${documentId}` },
				(payload) => {
					console.log('Change received!', payload);
					const newContent = payload.new.content;
					if (newContent !== editorInstance.getValue()) {
						const position = editorInstance.getPosition();
						editorInstance.getModel().setValue(newContent);
						if (position) {
							editorInstance.setPosition(position);
						}
					}
				}
			)
			.subscribe();
	}

	async function updateDocument(content) {
		// Debounce this call to prevent excessive database updates
		await supabase.from('documents').update({ content }).eq('id', documentId);
	}
	const handleSignOut = async () => {
		// console.log('logout start');
		await data.supabase.auth.signOut();
		// console.log('logout done');
		window.open('/login', '_self');
	};

	onMount(async () => {
		loadDocument();
	});
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
		<div class="ml-72 w-full mt-6 mr-8">
			<div class="flex flex-row justify-between">
				<h1 class="font-extrabold text-2xl">
					{docTitle}
				</h1>
				<div class="font-semibold mr-8">
					{#if docOwner === userNow.id}
						Owner:{userNow.name} Shared with: {friendNow.name}
					{:else}
						Owner:{friendNow.name} Shared with: {userNow.name}
					{/if}
				</div>
			</div>

			<div id="editor" class="w-full min-h-screen rounded-lg shadow-lg p-4"></div>
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
