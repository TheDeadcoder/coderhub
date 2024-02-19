<script>
	// @ts-nocheck
	export let data;
	import { page } from '$app/stores';
	import Themeswitcher from '$lib/themeswitcher.svelte';
	import { onMount } from 'svelte';

	const { classid } = $page.params;

	let messages = [];
	let newMessage;

	let { session, supabase, classNow, studclass, userNow } = data;
	$: ({ session, supabase, classNow, studclass, userNow } = data);
	const handleSignOut = async () => {
		console.log('logout start');
		await data.supabase.auth.signOut();
		console.log('logout done');
		window.open('/login', '_self');
	};
	function navigateToChat() {
		window.open(`/protected/class/${classid}/chat`, '_self');
	}
	function navigateToEditors() {
		window.open(`/protected/class/${classid}/editor`, '_self');
	}
	function navigateToNotes() {
		window.open(`/protected/class/${classid}/notes`, '_self');
	}
	function navigateToLive() {
		window.open(`/protected/class/${classid}/live`, '_self');
	}
	function navigateBack() {
		window.open(`/protected/learning`, '_self');
	}
	async function sendMessage() {
		if (!newMessage.trim()) return;
		const { data: dt, error: err } = await supabase.from('classmessage').insert([
			{
				userid: userNow.id,
				username: userNow.name,
				cid: classNow.id,
				createdat: new Date(),
				body: newMessage
			}
		]);

		if (err) {
			console.error('Error sending message:', err.message);
		}
		newMessage = ''; // Clear the input field
	}
	async function loadInitialMessages() {
		let { data: classmessage, error: err1 } = await supabase
			.from('classmessage')
			.select('*')
			.eq('cid', classNow.id);

		messages = [...classmessage];

		messages.sort((a, b) => {
			return new Date(a.createdAt) - new Date(b.createdAt);
		});
	}
	function subscribeToNewMessages() {
		const channels = supabase
			.channel('custom-insert-channel')
			.on(
				'postgres_changes',
				{ event: 'INSERT', schema: 'public', table: 'classmessage' },
				(payload) => {
					console.log('Change received!', payload);

					const newMessage = payload.new;
					if (newMessage.cid === classNow.id) {
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
					<div class="flex flex-row space-x-1 mb-12">
						<img
							src={classNow.image}
							class="transform transition w-16 duration-300 hover:scale-105"
							alt="title"
						/>
						<h1 class="font-extrabold text-2xl">
							{classNow.title}
						</h1>
					</div>
					<li class="flex items-center p-4 bg-red-400 cursor-default" on:click={navigateToChat}>
						<img
							src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/chat-svgrepo-com%20(1)%20(1).svg"
							alt="Dashboard Icon"
							class="w-6 h-6 mr-2"
						/>
						Chat
					</li>
					<li
						class="flex items-center p-4 hover:bg-gray-300 cursor-pointer"
						on:click={navigateToEditors}
					>
						<img
							src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/code-svgrepo-com%20(1).svg"
							alt="Query Icon"
							class="w-6 h-6 mr-2"
						/>
						Editors
					</li>
					<li
						class="flex items-center p-4 hover:bg-gray-300 cursor-pointer"
						on:click={navigateToNotes}
					>
						<img
							src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/note-svgrepo-com.svg"
							alt="Add New Hospital Icon"
							class="w-6 h-6 mr-2"
						/>
						Notes
					</li>
					<li
						class="flex items-center p-4 hover:bg-gray-300 cursor-pointer"
						on:click={navigateToLive}
					>
						<img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/conference-live-video-svgrepo-com.svg"
							alt="Add New Hospital Icon"
							class="w-6 h-6 mr-2"
						/>
						Go Live
					</li>
					<li
						class="flex items-center p-4 hover:bg-gray-300 cursor-pointer"
						on:click={navigateBack}
					>
						<img
							src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/back-svgrepo-com%20(1).svg"
							alt="Messages Icon"
							class="w-6 h-6 mr-2"
						/>
						Go Back
					</li>
				</ul>
			</div>
		</div>
		<div class="ml-64 w-full mt-6">
			<div class="min-h-screen ml-20 mr-20">
				{#each messages as message}
					{#if message.userid === userNow.id}
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
									<img
										src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/defaultuser.jpg"
										alt="Tailwind CSS chat bubble component"
									/>
								</div>
							</div>
							<div class="chat-header">
								{message.username}
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
			<pre>{JSON.stringify(userNow, null, 2)}</pre>
		</div>
	</div>
</main>

<pre>{JSON.stringify(classNow, null, 2)}</pre>
<pre>{JSON.stringify(studclass, null, 2)}</pre>
<pre>{JSON.stringify(userNow, null, 2)}</pre>
<pre>{JSON.stringify(messages, null, 2)}</pre>

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
