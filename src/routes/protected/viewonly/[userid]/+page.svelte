<script>
	// @ts-nocheck

	import Themeswitcher from '$lib/themeswitcher.svelte';
	import { onMount } from 'svelte';

	export let data;
	let {
		session,
		supabase,
		userNow,
		viewUserNow,
		friendspending,
		friend,
		friendspendingmy,
		past,
		present,
		certificates,
		skills
	} = data;
	$: ({
		session,
		supabase,
		userNow,
		viewUserNow,
		friendspending,
		friend,
		friendspendingmy,
		past,
		present,
		certificates,
		skills
	} = data);
	const handleSignOut = async () => {
		console.log('logout start');
		await data.supabase.auth.signOut();
		console.log('logout done');
		window.open('/login', '_self');
	};
	function navigateToPeer() {
		window.open(`/protected/peer`, '_self');
	}
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
	function navigateToFriend() {
		window.open(`/protected/communicate/${viewUserNow.id}/chat`, '_self');
	}
	function calculateAge(dob) {
		const today = new Date();
		const birthDate = new Date(dob);
		let age = today.getFullYear() - birthDate.getFullYear();
		const monthDiff = today.getMonth() - birthDate.getMonth();
		if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	}
	async function checkifme() {
		if (userNow.id === viewUserNow.id) {
			window.open(`/protected/profile`, '_self');
		}
	}
	onMount(async () => {
		checkifme();
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
						class="flex items-center p-4 bg-red-400 cursor-default"
						on:click={navigateToCommunity}
					>
						<img
							src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/community-svgrepo-com.svg?t=2024-02-15T12%3A14%3A23.484Z"
							alt="Query Icon"
							class="w-6 h-6 mr-2"
						/>
						Community
					</li>
					<li
						class="flex items-center p-4 hover:bg-gray-300 cursor-pointer"
						on:click={navigateToPeer}
					>
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
		<div class="ml-64 w-full mt-6">
			<div class="flex flex-row space-x-24">
				<div class="flex flex-col ml-8">
					<div class="avatar">
						<div class="w-48 rounded-full">
							<img src={viewUserNow.image} alt="User image" />
						</div>
					</div>
					<h1 class="font-extrabold text-3xl">
						{viewUserNow.name}
					</h1>
					<p>
						{viewUserNow.about}
					</p>

					{#if friendspending.length > 0}
						<button class="btn btn-primary p-2 mt-6 w-3/4" disabled={true}>
							Friend Request Sent
						</button>
					{:else if friend.length > 0}
						<button class="btn btn-success p-2 mt-6 w-3/4" on:click={navigateToFriend}>
							Communicate
						</button>
					{:else if friendspendingmy.length > 0}
						<form action="?/acceptfriend" method="POST">
							<button type="submit" class="btn btn-success p-2 mt-6 w-3/4"> Accept Request </button>
						</form>
					{:else}
						<form action="?/addfriend" method="POST">
							<button type="submit" class="btn btn-primary p-2 mt-6 w-3/4"> + Add Friend </button>
						</form>
					{/if}

					<div class="card bg-transparent mt-10 font-semibold">
						<div>
							<div class="flex flex-row">
								<!-- svelte-ignore a11y-img-redundant-alt -->
								<img
									src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/connect-svgrepo-com.svg"
									alt="User Image"
									class="w-7 h-7 mr-3 hover:scale-105 hover:rotate-12"
								/>
								<h1 class="font-bold text-lg">Contact Information</h1>
							</div>
							<div class="flex flex-row mt-4">
								<!-- svelte-ignore a11y-img-redundant-alt -->
								<img
									src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/email-blue.svg"
									alt="User Image"
									class="w-5 h-5 mr-3 hover:scale-105 hover:rotate-12"
								/>
								<h1>{viewUserNow.email}</h1>
							</div>
							<div class="flex flex-row mt-3">
								<!-- svelte-ignore a11y-img-redundant-alt -->
								<img
									src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/phone.svg"
									alt="User Image"
									class="w-5 h-5 mr-3 hover:scale-105 hover:rotate-12"
								/>
								<h1>{viewUserNow.mobile}</h1>
							</div>
						</div>
					</div>
					<div class="card bg-transparent mt-10 font-semibold">
						<div>
							<div class="flex flex-row">
								<!-- svelte-ignore a11y-img-redundant-alt -->
								<img
									src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/location-pin-svgrepo-com.svg"
									alt="User Image"
									class="w-6 h-6 mr-3 hover:scale-105 hover:rotate-12"
								/>
								<h1 class="font-bold text-lg">Location</h1>
							</div>
							<p>
								{viewUserNow.address}
							</p>
						</div>
					</div>
					<div class="flex flex-row mt-20">
						<!-- svelte-ignore a11y-img-redundant-alt -->
						<img
							src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/graduation-cap-svgrepo-com.svg"
							alt="User Image"
							class="w-8 h-8 mr-3 hover:scale-105 hover:rotate-12"
						/>
						<h1 class="font-bold text-lg mb-4">Academic/ Work Experiences</h1>
					</div>

					{#each past as currPast}
						<div class="flex flex-row space-x-4 space-y-3">
							<!-- svelte-ignore a11y-img-redundant-alt -->
							<img
								src={currPast.image}
								alt="User Image"
								class="w-8 h-8 mr-3 hover:scale-105 hover:rotate-12"
							/>
							<div>
								<h1 class="font-bold">
									{currPast.institute}
								</h1>
								<h4 class="font-semibold">
									{currPast.position}
								</h4>
								<p>
									{currPast.from}-{currPast.to}
								</p>
							</div>
						</div>
					{/each}

					<h1 class="font-extrabold text-xl mt-10">Current Affliations</h1>
					{#each present as currPresent}
						<div class="flex flex-row space-x-4 space-y-3">
							<!-- svelte-ignore a11y-img-redundant-alt -->
							<img
								src={currPresent.image}
								alt="User Image"
								class="w-8 h-8 mr-3 hover:scale-105 hover:rotate-12"
							/>
							<div>
								<h1 class="font-bold">
									{currPresent.institute}
								</h1>
								<h4 class="font-semibold">
									{currPresent.position}
								</h4>
								<p>
									{currPresent.from}-Now
								</p>
							</div>
						</div>
					{/each}
				</div>

				<div class="flex flex-col ml-8 w-2/3 mt-28">
					<div class="flex flex-row mt-20">
						<!-- svelte-ignore a11y-img-redundant-alt -->
						<img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/certificate-diploma-svgrepo-com.svg"
							alt="Certificate Image"
							class="w-8 h-8 mr-3 hover:scale-105 hover:rotate-12"
						/>
						<h1 class="font-extrabold text-xl mb-4">Achievements & Certifications</h1>
					</div>

					{#each certificates as currSkill}
						<div class="flex flex-row space-x-4 space-y-3">
							<!-- svelte-ignore a11y-img-redundant-alt -->
							<img
								src={currSkill.image}
								alt="Certificate Image"
								class="w-8 h-8 mr-3 hover:scale-105 hover:rotate-12"
							/>
							<div>
								<h1 class="font-bold">
									{currSkill.name}
								</h1>
								<h4 class="font-semibold">
									Institute: {currSkill.issuer}
								</h4>
								<p>
									Received: {currSkill.received}
								</p>
								<p>
									Credential: {currSkill.link}
								</p>
							</div>
						</div>
					{/each}

					<div class="flex flex-row mt-20">
						<!-- svelte-ignore a11y-img-redundant-alt -->
						<img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/expert-route-dificulty-svgrepo-com.svg"
							alt="Certificate Image"
							class="w-8 h-8 mr-3 hover:scale-105 hover:rotate-12"
						/>
						<h1 class="font-extrabold text-xl mb-4">Skills</h1>
					</div>
					<div class="mt-4 flex flex-row space-x-3 text-sm">
						{#each skills as value}
							<div class="chipi">
								<span>
									<img
										src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/pin-svgrepo-com.svg"
										alt="User "
										class="w-4 h-4 mr-2 hover:scale-105 hover:rotate-12"
									/>
								</span>
								<span>{value.body}</span>
							</div>
						{/each}
					</div>

					<div class="flex flex-row mt-20">
						<!-- svelte-ignore a11y-img-redundant-alt -->
						<img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/roadmap-svgrepo-com.svg"
							alt="Certificate Image"
							class="w-8 h-8 mr-3 hover:scale-105 hover:rotate-12"
						/>
						<h1 class="font-extrabold text-xl mb-4">Projects</h1>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>
<!-- <pre>{JSON.stringify(friend, null, 2)}</pre> -->

<h1>"home e asi"</h1>

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
