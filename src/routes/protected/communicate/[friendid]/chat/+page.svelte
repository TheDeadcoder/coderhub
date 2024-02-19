<script>
	// @ts-nocheck

	import Themeswitcher from '$lib/themeswitcher.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	const { friendid } = $page.params;

	export let data;
	let messages = [];
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
	let newMessage;
	async function sendMessage() {
		if (!newMessage.trim()) return;
		const { data: dt, error: err } = await supabase
			.from('personalmessage')
			.insert([
				{ sender: userNow.id, body: newMessage, createdat: new Date(), receiver: friendNow.id }
			]);

		if (err) {
			console.error('Error sending message:', err.message);
		}
		newMessage = ''; // Clear the input field
	}
	const handleSignOut = async () => {
		// console.log('logout start');
		await data.supabase.auth.signOut();
		// console.log('logout done');
		window.open('/login', '_self');
	};
	async function loadInitialMessages() {
		let { data: personalmessage1, error: err1 } = await supabase
			.from('personalmessage')
			.select('*')
			.eq('sender', userNow.id)
			.eq('receiver', friendNow.id);

		let { data: personalmessage2, error: err2 } = await supabase
			.from('personalmessage')
			.select('*')
			.eq('receiver', userNow.id)
			.eq('sender', friendNow.id);

		messages = [...personalmessage1, ...personalmessage2];
		messages.sort((a, b) => {
			return new Date(a.createdAt) - new Date(b.createdAt);
		});
	}
	function subscribeToNewMessages() {
		const channels = supabase
			.channel('custom-insert-channel')
			.on(
				'postgres_changes',
				{ event: 'INSERT', schema: 'public', table: 'personalmessage' },
				(payload) => {
					console.log('Change received!', payload);

					const newMessage = payload.new;
					if (newMessage.sender === userNow.id && newMessage.receiver === friendNow.id) {
						messages = [...messages, newMessage];
					} else if (newMessage.receiver === userNow.id && newMessage.sender === friendNow.id) {
						messages = [...messages, newMessage];
					}
				}
			)
			.subscribe();
	}
	onMount(() => {
		loadInitialMessages();
		subscribeToNewMessages();
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
					<li class="flex items-center p-4 bg-red-400 cursor-default" on:click={navigateToChats}>
						<img
							src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/chat-svgrepo-com%20(1).svg"
							alt="Dashboard Icon"
							class="w-6 h-6 mr-2"
						/>
						Chats
					</li>
					<li
						class="flex items-center p-4 hover:bg-gray-300 cursor-pointer"
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
			<div class="min-h-screen ml-20 mr-20">
				{#each messages as message}
					{#if message.sender === userNow.id}
						<div class="chat chat-end">
							<div class="chat-image avatar">
								<div class="w-8 rounded-full">
									<img alt="Tailwind CSS chat bubble component" src={userNow.image} />
								</div>
							</div>
							<div class="chat-header">
								{userNow.name}
								<time class="text-xs opacity-50">{message.createdat}</time>
							</div>
							<div class="chat-bubble">{message.body}</div>
							<div class="chat-footer opacity-50">Delivered</div>
						</div>
					{:else}
						<div class="chat chat-start">
							<div class="chat-image avatar">
								<div class="w-10 rounded-full">
									<img alt="Tailwind CSS chat bubble component" src={friendNow.image} />
								</div>
							</div>
							<div class="chat-header">
								{friendNow.name}
								<time class="text-xs opacity-50">{message.createdat}</time>
							</div>
							<div class="chat-bubble">{message.body}</div>
							<div class="chat-footer opacity-50">Delivered</div>
						</div>
					{/if}
				{/each}
				<form class="mb-2" on:submit|preventDefault={sendMessage}>
					<input
						class="input input-bordered w-5/6"
						type="text"
						bind:value={newMessage}
						placeholder="Type a message..."
					/>
					<button type="submit" class="btn btn-success">Send</button>
				</form>
			</div>
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
