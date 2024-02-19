<script>
	import Themeswitcher from '$lib/themeswitcher.svelte';

	export let data;
	let { session, supabase, userNow, skills, userdetailsall } = data;
	$: ({ session, supabase, userNow, skills, userdetailsall } = data);
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
	function navigateToPeer() {
		window.open(`/protected/peer`, '_self');
	}
	function navigateToProfile() {
		window.open(`/protected/profile`, '_self');
	}

	let nameInp;
	let skillInp;
	let filterUsers = userdetailsall;
	let filterApplied = false;

	function getUser(id) {
		for (let i = 0; i < userdetailsall.length; i++) {
			if (userdetailsall[i].id === id) {
				return userdetailsall[i];
			}
		}
	}
	function applyFilters() {
		filterUsers = userdetailsall;
		let filterUsers1;
		let filterUsers2 = [];
		filterUsers1 = userdetailsall.filter((product) => {
			// If filterBrand is not null or empty, check if the product name matches it. Otherwise, return true.
			let matchesName = !nameInp || product.name.toLowerCase().includes(nameInp.toLowerCase());

			return matchesName;
		});

		let filterSkills = skills.filter((product) => {
			// If filterBrand is not null or empty, check if the product name matches it. Otherwise, return true.
			let matchesName = !skillInp || product.body.toLowerCase().includes(skillInp.toLowerCase());

			return matchesName;
		});

		for (let i = 0; i < filterSkills.length; i++) {
			filterUsers2 = [...filterUsers2, getUser(filterSkills[i].userid)];
		}
		console.log('names');
		console.log(filterUsers1);
		console.log('Skills');
		console.log(filterUsers2);

		filterUsers = filterUsers1 && filterUsers2;

		filterApplied = true;
	}
	function resetView() {
		filterApplied = false;
		filterUsers = userdetailsall; // Clear filtered products
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
						on:click={navigateToHome}
					>
						<img
							src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/dashboard.svg"
							alt="Dashboard Icon"
							class="w-6 h-6 mr-2"
						/>
						Home
					</li>
					<li
						class="flex items-center p-4 hover:bg-gray-300 cursor-pointer"
						on:click={navigateToCommunity}
					>
						<img
							src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/community-svgrepo-com.svg?t=2024-02-15T12%3A14%3A23.484Z"
							alt="Query Icon"
							class="w-6 h-6 mr-2"
						/>
						Community
					</li>
					<li class="flex items-center p-4 bg-red-400 cursor-default" on:click={navigateToPeer}>
						<img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/search-svgrepo-com.svg"
							alt="Query Icon"
							class="w-6 h-6 mr-2"
						/>
						Find a Peer
					</li>
					<li
						class="flex items-center p-4 hover:bg-gray-300 cursor-pointer"
						on:click={navigateToLearning}
					>
						<img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/blackboard-class-svgrepo-com.svg"
							alt="Add New Hospital Icon"
							class="w-6 h-6 mr-2"
						/>
						Learning
					</li>
					<li
						class="flex items-center p-4 hover:bg-gray-300 cursor-pointer"
						on:click={navigateToProjects}
					>
						<img
							src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/code-branch-svgrepo-com.svg?t=2024-02-15T12%3A15%3A03.215Z"
							alt="Add New Hospital Icon"
							class="w-6 h-6 mr-2"
						/>
						Projects
					</li>
					<li
						class="flex items-center p-4 hover:bg-gray-300 cursor-pointer"
						on:click={navigateToProfile}
					>
						<img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/defaultuser.jpg"
							alt="Messages Icon"
							class="w-6 h-6 mr-2"
						/>
						Profile
					</li>
				</ul>
			</div>
		</div>
		<div class="ml-72 w-full mt-6">
			<div class="flex flex-row space-x-3">
				<label class="input input-bordered flex items-center gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 16 16"
						fill="currentColor"
						class="w-4 h-4 opacity-70"
						><path
							d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"
						/></svg
					>
					<input type="text" class="grow" placeholder="Username" bind:value={nameInp} />
				</label>
				<label class="input input-bordered flex items-center gap-2">
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/skill-level-intermediate-svgrepo-com.svg"
						alt="Messages Icon"
						class="w-4 h-4 mr-2"
					/>
					<input type="text" class="grow" placeholder="skill" bind:value={skillInp} />
				</label>
				<button class="btn btn-success" on:click={applyFilters}> Submit </button>
			</div>
			<div>
				{#if filterApplied}
					<button class="btn btn-error mb-10 mt-10" on:click={resetView}>Reset Filter </button>
					<h1 class="text-xl font-extrabold">Filtered Result</h1>
				{/if}
				<div class="grid grid-cols-4 mt-6 p-6 w-full">
					{#each filterUsers as currUser}
						<div class="card p-6 shadow-xl flex flex-col items-center justify-center">
							<img
								src={currUser.image}
								alt="Dashboard Icon"
								class="w-32 mt-1 hover:rotate-12 rounded-full"
							/>
							<h1 class="font-semibold">
								{currUser.name}
							</h1>
							<a href="/protected/viewonly/{currUser.id}" class="mt-4 flex flex-row space-x-4">
								<h6 class="hover:scale-105">View Profile</h6>
								<img
									src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/send-svgrepo-com.svg"
									alt="Dashboard Icon"
									class="w-6 mt-1 rounded-full hover:rotate-6"
								/>
							</a>
						</div>
					{/each}
				</div>
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
