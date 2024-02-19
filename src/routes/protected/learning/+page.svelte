<script>
	// @ts-nocheck

	import Themeswitcher from '$lib/themeswitcher.svelte';
	import { enhance } from '$app/forms';

	export let data;
	let { session, supabase, userNow, classes, studclass } = data;
	$: ({ session, supabase, userNow, classes, studclass } = data);
	const handleSignOut = async () => {
		console.log('logout start');
		await data.supabase.auth.signOut();
		console.log('logout done');
		window.open('/login', '_self');
	};
	let title;
	let syllabus;
	let duration;
	let start;
	let image;
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
	function navigateToClass(cid) {
		window.open(`/protected/class/${cid}/chat`, '_self');
	}
	let showaddmodal = false;
	function addclassmodal() {
		showaddmodal = true;
	}

	function closeclassmodal() {
		showaddmodal = false;
	}
	function classifyClass(startDateStr) {
		// Parse the start date string into a Date object
		const startDate = new Date(startDateStr);

		const today = new Date();
		return startDate > today; // True for upcoming, false for running
	}
	function isEntryExist(cid) {
		for (let i = 0; i < studclass.length; i++) {
			if (studclass[i].sid === userNow.id && studclass[i].cid === cid) {
				return true;
			}
		}
		return false;
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
					<li class="flex items-center p-4 bg-red-400 cursor-default" on:click={navigateToLearning}>
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
		<div class="ml-72 w-full mt-8">
			<button class="btn p-4 flex flex-row space-x-3" on:click={addclassmodal}>
				<img
					src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/plus-cross-svgrepo-com.svg?t=2024-02-16T12%3A28%3A07.843Z"
					alt="Messages Icon"
					class="w-6 h-6 mr-2"
				/>
				Add a New Class
			</button>
			<h1 class="text-2xl font-extrabold mt-6">Upcoming Classes</h1>
			<div class="grid grid-cols-4 gap-12 mt-6">
				{#each classes as currClass}
					{#if classifyClass(currClass.start)}
						<div class="flex flex-col shadow-xl items-center justify-center">
							<img
								src={currClass.image}
								alt="Dashboard Icon"
								class="w-32 mt-1 hover:rotate-12 rounded-full"
							/>
							<h1 class="text-xl font-bold">
								{currClass.title}
							</h1>
							<h1 class="text-base font-semibold">
								{currClass.name}
							</h1>
							<p class="text-sm text-justify ml-6 mr-6 mb-4">
								{currClass.syllabus.slice(0, 100)} ...
							</p>
							{#if currClass.ownerid === userNow.id}
								<button class="btn btn-error mb-4"> Terminate Class </button>
							{:else if isEntryExist(currClass.id)}
								<button class="btn btn-error mb-4" disabled={true}> Already Enrolled </button>
							{:else}
								<form action="?/enroll&id={currClass.id}" method="POST">
									<button type="submit" class="btn btn-success mb-4 p-3"> Enroll to Class </button>
								</form>
							{/if}
						</div>
					{/if}
				{/each}
			</div>

			<h1 class="text-2xl font-extrabold mt-16">Running Classes</h1>
			<div class="grid grid-cols-4 gap-12 mt-6">
				{#each classes as currClass}
					{#if classifyClass(currClass.start) === false}
						<div class="flex flex-col shadow-xl items-center justify-center">
							<img
								src={currClass.image}
								alt="Dashboard Icon"
								class="w-32 mt-1 hover:rotate-12 rounded-full"
							/>
							<h1 class="text-xl font-bold">
								{currClass.title}
							</h1>
							<h1 class="text-base font-semibold">
								{currClass.name}
							</h1>
							<p class="text-sm text-justify ml-6 mr-6 mb-4">
								{currClass.syllabus.slice(0, 100)} ...
							</p>
							{#if currClass.ownerid === userNow.id}
								<div class="flex flex-row space-x-4 items-center justify-center mb-5">
									<button class="btn btn-success" on:click={() => navigateToClass(currClass.id)}>
										Go To Class
									</button>
									<button class="btn btn-error"> Terminate Class </button>
								</div>
							{:else if isEntryExist(currClass.id)}
								<div class="flex flex-row space-x-4 items-center justify-center mb-5">
									<button class="btn btn-success" on:click={() => navigateToClass(currClass.id)}>
										Go To Class
									</button>
									<button class="btn btn-error"> Leave Class </button>
								</div>
							{:else}
								<form action="?/enroll&id={currClass.id}" method="POST">
									<button type="submit" class="btn btn-success mb-4 p-3"> Enroll to Class </button>
								</form>
							{/if}
						</div>
					{/if}
				{/each}
			</div>

			<h1 class="text-2xl font-extrabold mt-16">My Classes</h1>
			<div class="grid grid-cols-4 gap-12 mt-6">
				{#each classes as currClass}
					{#if currClass.ownerid === userNow.id}
						<div class="flex flex-col shadow-xl items-center justify-center">
							<img
								src={currClass.image}
								alt="Dashboard Icon"
								class="w-32 mt-1 hover:rotate-12 rounded-full"
							/>
							<h1 class="text-xl font-bold">
								{currClass.title}
							</h1>
							<h1 class="text-base font-semibold">
								{currClass.name}
							</h1>
							<p class="text-sm text-justify ml-6 mr-6 mb-4">
								{currClass.syllabus.slice(0, 100)} ...
							</p>
							<div class="flex flex-row space-x-4 items-center justify-center mb-5">
								<button class="btn btn-success" on:click={() => navigateToClass(currClass.id)}>
									Go To Class
								</button>
								<button class="btn btn-error"> Terminate Class </button>
							</div>
						</div>
					{/if}
				{/each}
			</div>

			<pre>{JSON.stringify(userNow, null, 2)}</pre>
			<pre>{JSON.stringify(classes, null, 2)}</pre>
			<pre>{JSON.stringify(studclass, null, 2)}</pre>
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
							enctype="multipart/form-data"
							on:submit={() => {
								closeclassmodal();
							}}
						>
							<div class="flex flex-col space-y-6">
								<label class="label text-left mb-3">
									<span>Class Title</span>

									<input
										class="input"
										type="text"
										id="title"
										name="title"
										bind:value={title}
										placeholder="Enter The name of the micro course"
									/>
								</label>
								<label class="label text-left">
									<span>Syllabus</span>
									<textarea
										class="textarea"
										rows="2"
										placeholder="Topics you are gonna cover..."
										id="syllabus"
										name="syllabus"
										bind:value={syllabus}
									/>
								</label>
								<label class="label text-left mb-3">
									<span>Class Duration</span>

									<input
										class="input"
										type="number"
										id="duration"
										name="duration"
										bind:value={duration}
										placeholder="How many weeks are gonna take?"
									/>
								</label>
								<label class="label text-left mb-3">
									<span>Approx Start date</span>

									<input class="input" type="date" id="start" name="start" bind:value={start} />
								</label>
								<label class="label text-left mb-3">
									<span>Photo (optional)</span>

									<input
										class="file-input file-input-bordered w-full"
										type="file"
										id="image"
										name="image"
										bind:value={image}
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
