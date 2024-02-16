<script>
	// @ts-nocheck

	import Themeswitcher from '$lib/themeswitcher.svelte';
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import 'quill/dist/quill.snow.css';

	let quill;
	let editor;

	let title;
	let description;
	let content;
	let timetoread;
	let tags;

	export let data;
	let { session, supabase, userNow } = data;
	$: ({ session, supabase, userNow } = data);
	const handleSignOut = async () => {
		console.log('logout start');
		await data.supabase.auth.signOut();
		console.log('logout done');
		window.open('/login', '_self');
	};
	function navigateToHome() {
		window.open(`/protected/home`, '_self');
	}
	function navigateToCommunity() {
		window.open(`/protected/community`, '_self');
	}
	function navigateToLearning() {
		window.open(`/protected/learning`, '_self');
	}
	function navigateToProjects() {
		window.open(`/protected/projects`, '_self');
	}
	function navigateToProfile() {
		window.open(`/protected/profile`, '_self');
	}
	function openAddForm() {
		window.open(`/protected/community/newpost`, '_self');
	}
	function formatDate(dateString) {
		const dateObj = new Date(dateString);
		const monthNames = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec'
		];
		return `${monthNames[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
	}
	onMount(async () => {
		const Quill = await import('quill');
		quill = new Quill.default(editor, {
			theme: 'snow',
			modules: {
				toolbar: [
					[{ header: [1, 2, false] }],
					['bold', 'italic', 'underline'],
					['image', 'code-block', 'link']
				]
			},
			placeholder: 'Body of the article goes here...'
		});
	});
	let isLoading = false;
	async function onSubmit() {
		isLoading = true;
		setTimeout(() => {
			isLoading = false;
		}, 10000);
	}
	function makeStrong() {
		content = quill.root.innerHTML;
		console.log(content);
	}
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
<div class="min-h-screen mt-32 ml-16 mr-16">
	<h1 class="text-2xl font-extrabold">Creating a New Blog</h1>
	<form
		use:enhance
		action="?/create"
		method="POST"
		class="mt-6"
		on:submit={() => {
			onSubmit();
		}}
	>
		<label for="title" class="label text-left mb-3 flex flex-row">
			<span>Blog Title</span>
		</label>
		<input
			class="input mb-4"
			type="text"
			id="title"
			name="title"
			bind:value={title}
			placeholder="Enter The Title of the Blog"
		/>
		<label for="description" class="label text-left mb-3">
			<span>Blog Description</span>
		</label>
		<input
			class="input mb-4"
			type="text"
			id="description"
			name="description"
			bind:value={description}
			placeholder="Enter Brief Description"
		/>
		<label for="timetoread" class="label text-left mb-3">
			<span>Time</span>
		</label>
		<input
			class="input mb-4"
			type="number"
			id="timetoread"
			name="timetoread"
			bind:value={timetoread}
			placeholder="Minutes required to read"
		/>
		<label for="tags" class="label text-left mb-3">
			<span>Tags</span>
		</label>
		<input
			class="input mb-4"
			type="text"
			id="tags"
			name="tags"
			bind:value={tags}
			placeholder="Tags (separate by comma)"
		/>
		<input hidden id="content" name="content" bind:value={content} />
		<div class="grid gap-2">
			<label for="content">Blog Content</label>
			<div bind:this={editor} id="editor" />
		</div>
		<button
			type="submit"
			class="btn btn-accent mt-8 w-full"
			disabled={isLoading}
			on:click={makeStrong}
		>
			{#if isLoading}
				<span class="loading loading-spinner loading-xs"></span>
			{/if}
			Sign In
		</button>
	</form>
</div>

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
