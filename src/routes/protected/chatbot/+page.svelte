<script lang="ts">
	import ChatMessage from '$lib/ChatMessage.svelte';
	import Themeswitcher from '$lib/themeswitcher.svelte';
	import type { ChatCompletionRequestMessage } from 'openai';
	import { SSE } from 'sse.js';
	//export let data;

	let query: string = '';
	let answer: string = '';
	let loading: boolean = false;
	let chatMessages: ChatCompletionRequestMessage[] = [];
	let scrollToDiv: HTMLDivElement;

	function scrollToBottom() {
		setTimeout(function () {
			scrollToDiv.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
		}, 100);
	}
	// const handleSignOut = async () => {
	// 	// console.log('logout start');
	// 	await data.supabase.auth.signOut();
	// 	// console.log('logout done');
	// 	window.open('/login', '_self');
	// };

	const handleSubmit = async () => {
		loading = true;
		chatMessages = [...chatMessages, { role: 'user', content: query }];

		const eventSource = new SSE('/protected/chatbot', {
			headers: {
				'Content-Type': 'application/json'
			},
			payload: JSON.stringify({ messages: chatMessages })
		});

		query = '';

		eventSource.addEventListener('error', handleError);

		eventSource.addEventListener('message', (e) => {
			scrollToBottom();
			try {
				loading = false;
				if (e.data === '[DONE]') {
					chatMessages = [...chatMessages, { role: 'assistant', content: answer }];
					answer = '';
					return;
				}

				const completionResponse = JSON.parse(e.data);
				const [{ delta }] = completionResponse.choices;

				if (delta.content) {
					answer = (answer ?? '') + delta.content;
				}
			} catch (err) {
				handleError(err);
			}
		});
		eventSource.stream();
		scrollToBottom();
	};

	function handleError<T>(err: T) {
		loading = false;
		query = '';
		answer = '';
		console.error(err);
	}
</script>

<nav class="appbar">
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
	</ul>
</nav>

<div class="flex flex-col pt-4 w-full px-8 items-center gap-2">
	<div>
		<h1 class="text-2xl font-bold w-full text-center">Mr. Tukhor Developer</h1>
		<p class="text-sm italic">Powered by gpt-3.5-turbo</p>
	</div>
	<div class="h-[500px] w-full rounded-md p-4 overflow-y-auto flex flex-col gap-4">
		<div class="flex flex-col gap-2">
			<ChatMessage type="assistant" message="Hello, I am a Tukhor coder & I am here to help" />
			{#each chatMessages as message}
				<ChatMessage type={message.role} message={message.content} />
			{/each}
			{#if answer}
				<ChatMessage type="assistant" message={answer} />
			{/if}
			{#if loading}
				<ChatMessage type="assistant" message="Loading.." />
			{/if}
		</div>
		<div class="" bind:this={scrollToDiv} />
	</div>
	<form class="flex w-full rounded-md gap-4 p-4" on:submit|preventDefault={() => handleSubmit()}>
		<input type="text" class="input input-bordered w-full" bind:value={query} />
		<button type="submit" class="btn btn-success"> Send </button>
	</form>
</div>

<style>
	.white-text {
		color: red;
	}
	.company-name {
		font-size: 2rem; /* Adjust font size as needed */
		margin-top: 1rem; /* Add spacing if necessary */
		font-family: 'CustomFont', sans-serif; /* Use your custom font */
	}
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
	.white-text {
		color: red;
	}
	.company-name {
		border: 1px solid black;
		font-size: 2rem; /* Adjust font size as needed */
		margin-top: 0.5rem; /* Add spacing if necessary */
		font-family: 'CustomFont', sans-serif; /* Use your custom font */
	}
	.navbar {
		overflow: hidden;
		position: absolute; /* Set the navbar to fixed position */
		top: 0; /* Position the navbar at the top of the page */
		width: 100%; /* Full width */
		z-index: 5;
		background-color: rgb(188, 223, 253);
	}

	.logo-container {
		display: flex;
		align-items: center;
	}
</style>
