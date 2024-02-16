<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import Themeswitcher from '$lib/themeswitcher.svelte';

	// import Message from './Message.svelte';
	export let data;

	let likeval = 0;
	let dislikeval = 0;
	let reacted = false;
	let reactionval = false;
	let comments = [];
	let commentBody;
	let commentCnt = 0;

	let { session, supabase, articleNow, userNow } = data;
	$: ({ session, supabase, articleNow, userNow } = data);

	let values = articleNow.tags.split(',');

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
	function formatTimestamp(timestamp: string): string {
		const date = new Date(timestamp);
		const options: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: 'short',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			hour12: false // Use 24-hour clock
		};

		return new Intl.DateTimeFormat('en-US', options).format(date);
	}
	const handleSignOut = async () => {
		// console.log('logout start');
		await data.supabase.auth.signOut();
		// console.log('logout done');
		window.open('/login', '_self');
	};

	async function loadInitialLikeandDislike() {
		const { data: dtt, error: err } = await supabase
			.from('reaction')
			.select('*')
			.eq('blogid', articleNow.id);

		if (err) console.log('failed to load');
		dtt.forEach((reaction) => {
			if (reaction.value) {
				likeval++;
			} else {
				dislikeval++;
			}

			if (reaction.userid === userNow.id) {
				reacted = true;
				reactionval = reaction.value;
			}
		});
	}
	async function loadInitialComments() {
		const { data: dtt, error: err } = await supabase
			.from('comment')
			.select('*')
			.eq('blogid', articleNow.id);

		if (err) console.log('failed to load');
		comments = dtt?.reverse();
		commentCnt = dtt?.length;
	}

	function subscribeToReactionState() {
		const channels = supabase
			.channel('custom-insert-channel')
			.on('postgres_changes', { event: '*', schema: 'public', table: 'reaction' }, (payload) => {
				const newReaction = payload.new;
				likeval = 0;
				dislikeval = 0;
				if (newReaction.blogid === articleNow.id) {
					if (newReaction.value) {
						likeval++;
					} else {
						dislikeval++;
					}
					if (newReaction.userid === userNow.id) {
						reacted = true;
						reactionval = newReaction.value;
					}
				}
			})
			.subscribe();
	}
	const refresh = async () => {
		window.location.href = `/protected/article/${articleNow.id}`;
	};

	async function sendReaction(value) {
		reactionval = value;
		const { data, error: err } = await supabase
			.from('reaction')
			.insert([{ userid: userNow.id, blogid: articleNow.id, value: reactionval }]);
		if (err) {
			console.error('Error sending Reaction:', err.message);
		} else reacted = true;
	}
	async function sendComment() {
		const { data, error: err } = await supabase
			.from('comment')
			.insert([
				{ userid: userNow.id, blogid: articleNow.id, body: commentBody, createdat: new Date() }
			]);
		if (err) {
			console.error('Error sending Comment:', err.message);
		} else {
			commentBody = '';
			refresh();
		}
	}
	async function updateReaction(value) {
		reactionval = value;
		const { data, error: err } = await supabase
			.from('reaction')
			.update({ value: reactionval })
			.eq('userid', userNow.id);

		if (err) {
			console.error('Error Updating Reaction:', err.message);
		} else reacted = true;
	}
	async function deleteReaction() {
		const { error: err } = await supabase.from('reaction').delete().eq('userid', userNow.id);

		if (err) {
			console.error('Error deteting Reaction:', err.message);
		} else reacted = false;
	}

	onMount(async () => {
		loadInitialComments();
		//subscribeToComment();
		loadInitialLikeandDislike();
		subscribeToReactionState();
	});
</script>

<main class="bg-[#f4f6f7]">
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
	<div class="flex flex-col ml-4 mr-4 mt-36 items-center">
		<h1 class="font-extrabold text-5xl">
			{articleNow.title}
		</h1>
		<p class="text-2xl font-light mt-2 ml-24 mr-24">
			{articleNow.description}
		</p>
		<a href="/protected/viewonly/{userNow.id}" class="flex flex-row space-x-4 mt-4 text-left">
			<div class="avatar">
				<div class="w-10 rounded-full">
					<!-- svelte-ignore a11y-img-redundant-alt -->
					<img src={userNow.image} alt="user image" />
				</div>
			</div>
			<h3 class="font-semibold text-xl">
				{userNow.name}
			</h3>
		</a>
		<div class="flex flex-row mt-7 space-x-12 text-left">
			<div class="flex flex-row space-x-3">
				<img
					src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/299092_calendar_icon.svg"
					alt="User "
					class="w-5 h-5 mt-1 hover:scale-105 hover:rotate-12"
				/>
				<p class="text-base">
					{formatDate(articleNow.createdat)}
				</p>
			</div>
			<div class="flex flex-row space-x-3">
				<img
					src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/stopwatch-svgrepo-com.svg"
					alt="User "
					class="w-5 h-5 mt-1 hover:scale-105 hover:rotate-12"
				/>
				<p class="text-base">
					{articleNow.timetoread} minutes read
				</p>
			</div>
			<div class="flex flex-row space-x-3">
				<img
					src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/clap-svgrepo-com.svg"
					alt="User "
					class="w-5 h-5 mt-1 hover:scale-105 hover:rotate-12"
				/>
				<p class="text-base">
					{likeval} Liked
				</p>
			</div>
			<div class="flex flex-row space-x-3">
				<img
					src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/comment-2-svgrepo-com.svg"
					alt="User "
					class="w-5 h-5 mt-1 hover:scale-105 hover:rotate-12"
				/>
				<p class="text-base">
					{commentCnt} Commented
				</p>
			</div>
		</div>
		<div class="mt-4 flex flex-row space-x-3 text-sm">
			{#each values as value}
				<div class="chipi">
					<span>
						<img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/pin-svgrepo-com.svg"
							alt="User "
							class="w-4 h-4 mr-2 hover:scale-105 hover:rotate-12"
						/>
					</span>
					<span>{value}</span>
				</div>
			{/each}
		</div>

		<div class="mt-16 ml-24 mr-24">
			{@html articleNow.content}
		</div>

		<div class="mt-6 flex flex-row space-x-8">
			{#if reacted}
				{#if reactionval}
					<button on:click={() => deleteReaction()}>
						<img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/like-svgrepo-com.svg"
							alt="User "
							class="w-12 h-12 mr-2 hover:scale-105 hover:rotate-12"
						/>
					</button>
					<button on:click={() => updateReaction(false)}>
						<img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/dislike-left-svgrepo-com.svg"
							alt="User "
							class="w-12 h-12 mr-2 hover:scale-105 hover:rotate-12"
						/>
					</button>
				{:else}
					<button on:click={() => updateReaction(true)}>
						<img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/like-right-svgrepo-com.svg"
							alt="User "
							class="w-12 h-12 mr-2 hover:scale-105 hover:rotate-12"
						/>
					</button>
					<button on:click={() => deleteReaction()}>
						<img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/dislike-svgrepo-com.svg"
							alt="User "
							class="w-12 h-12 mr-2 hover:scale-105 hover:rotate-12"
						/>
					</button>
				{/if}
			{:else}
				<!-- Implement the sendreaction logic here -->
				<button on:click={() => sendReaction(true)}>
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/like-right-svgrepo-com.svg"
						alt="User "
						class="w-12 h-12 mr-2 hover:scale-105 hover:rotate-12"
					/>
				</button>
				<button on:click={() => sendReaction(false)}>
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/dislike-left-svgrepo-com.svg"
						alt="User "
						class="w-12 h-12 mr-2 hover:scale-105 hover:rotate-12"
					/>
				</button>
			{/if}
		</div>
		<div class="w-full mt-6 flex flex-row space-x-8">
			<textarea
				class="textarea w-5/6"
				rows="2"
				placeholder="Write a Comment ..."
				id="commentBody"
				name="commentBody"
				bind:value={commentBody}
			/>
			<button class="w-1/6 btn btn-success" on:click={sendComment}> Send </button>
		</div>
		<div class="w-full mt-8 ml-24 mr-10 flex-col-reverse">
			<h1 class="text-xl font-bold">Previous Comments</h1>
			{#each comments as comment}
				<div class="chat chat-start">
					<div class="chat-image avatar">
						<div class="w-10 rounded-full">
							<img
								alt="Tailwind CSS chat bubble component"
								src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/defaultuser.jpg?t=2024-02-15T15%3A26%3A43.007Z"
							/>
						</div>
					</div>
					<div class="chat-header">
						<time class="text-xs opacity-50">{formatTimestamp(comment.createdat)}</time>
					</div>
					<div class="chat-bubble">{comment.body}</div>
				</div>
			{/each}
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
	.chipi {
		background-color: #c1d4e3;

		padding: 0.5rem;
		margin-right: 0.5rem;
		border-radius: 0.25rem;
		display: flex;
		align-items: center;
	}
</style>
