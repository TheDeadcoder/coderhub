<script>
	// @ts-nocheck

	import Themeswitcher from '$lib/themeswitcher.svelte';

	export let data;
	const handleSignOut = async () => {
		// console.log('logout start');
		await data.supabase.auth.signOut();
		// console.log('logout done');
		window.open('/login', '_self');
	};
	let { session, supabase, userNow, friendwithName, friendwithName2, friendPendingwithName2 } =
		data;
	$: ({ session, supabase, userNow, friendwithName, friendwithName2, friendPendingwithName2 } =
		data);
	let allfriends = [...friendwithName, ...friendwithName2];
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
<div class="w-full h-screen mt-32">
	<h1 class="text-xl font-extrabold ml-8">All Friends</h1>
	<div class="grid grid-cols-4 mt-6 p-6 w-full">
		{#each allfriends as currfriend, i}
			<div class="card p-6 shadow-xl flex flex-col items-center justify-center">
				<img
					src={currfriend.frienditem.user2.image}
					alt="Dashboard Icon"
					class="w-32 mt-1 hover:rotate-12 rounded-full"
				/>
				<h1 class="font-semibold">
					{currfriend.frienditem.user2.name}
				</h1>
				<a
					href="/protected/communicate/{currfriend.frienditem.user2.id}/chat"
					class="mt-4 flex flex-row space-x-4"
				>
					<h6 class="hover:scale-105">Communicate</h6>
					<img
						src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/send-svgrepo-com.svg"
						alt="Dashboard Icon"
						class="w-6 mt-1 rounded-full hover:rotate-6"
					/>
				</a>
			</div>
		{/each}
	</div>
	<h1 class="text-xl font-extrabold ml-8">Pending Requests</h1>
	<div class="grid grid-cols-4 mt-6 p-6 w-full">
		{#each friendPendingwithName2 as currFriend, i}
			<div class="card p-3 shadow-xl items-center justify-center">
				<img
					src={currFriend.frienditem.image}
					alt="Dashboard Icon"
					class="w-32 mt-1 hover:rotate-12 rounded-full"
				/>
				<div class="flex flex-row space-x-4">
					<form action="?/acceptreq&id={currFriend.frienditem.id}" method="POST">
						<button type="submit" class="btn btn-success"> Accept Request </button>
					</form>
					<a href="/protected/viewonly/{currFriend.frienditem.id}" class="btn btn-primary">
						View Profile
					</a>
				</div>
			</div>
		{/each}
	</div>
	<!-- <pre>{JSON.stringify(friendPendingwithName2, null, 2)}</pre> -->
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
