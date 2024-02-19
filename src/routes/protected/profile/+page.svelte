<script>
	// @ts-nocheck

	import Themeswitcher from '$lib/themeswitcher.svelte';
	import { enhance } from '$app/forms';

	export let data;
	let { session, supabase, userNow, past, present, certificates, skills } = data;
	$: ({ session, supabase, userNow, past, present, certificates, skills } = data);
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

	let WorkExperiencesFrom;
	let WorkExperiencesTo;
	let WorkExperiencesInstitute;
	let WorkExperiencesPosition;
	let WorkExperiencesImage;

	let showaddWorkExperiences = false;
	function addclassmodal() {
		showaddWorkExperiences = true;
	}

	function closeclassmodal() {
		showaddWorkExperiences = false;
	}

	let PresentFrom;
	let PresentInstitute;
	let PresentPosition;
	let PresentImage;

	let showPresentModal = false;
	function addpresentModal() {
		showPresentModal = true;
	}

	function closePresentModal() {
		showPresentModal = false;
	}

	let certicicatesReceived;
	let certicicatesIssuer;
	let certicicatesName;
	let certicicatesImage;
	let certicicatesLink;

	let showCerticicatesModal = false;
	function addcerticicatesModal() {
		showCerticicatesModal = true;
	}

	function closecerticicatesModal() {
		showCerticicatesModal = false;
	}

	let skillsbody;
	let showskillsModal = false;
	function addskillsModal() {
		showskillsModal = true;
	}

	function closeskillsModal() {
		showskillsModal = false;
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
					<li class="flex items-center p-4 hover:bg-gray-300 cursor-pointer" on:click={navigateToPeer}>
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
					<li class="flex items-center p-4 bg-red-400 cursor-default" on:click={navigateToProfile}>
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
		<div class="ml-64 w-full">
			<div class="flex flex-row space-x-24">
				<div class="flex flex-col ml-8 w-1/3">
					<div class="avatar">
						<div class="w-48 rounded-full">
							<img src={userNow.image} alt="User image" />
						</div>
					</div>
					<h1 class="font-extrabold text-3xl">
						{userNow.name}
					</h1>
					<p>
						{userNow.about}
					</p>
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
								<h1>{userNow.email}</h1>
							</div>
							<div class="flex flex-row mt-3">
								<!-- svelte-ignore a11y-img-redundant-alt -->
								<img
									src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/phone.svg"
									alt="User Image"
									class="w-5 h-5 mr-3 hover:scale-105 hover:rotate-12"
								/>
								<h1>{userNow.mobile}</h1>
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
								{userNow.address}
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
					<button class="btn btn-success rounded-lg w-fit mt-4" on:click={addclassmodal}>
						+Add a new experience
					</button>

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
					<button class="btn btn-success rounded-lg w-fit mt-4" on:click={addpresentModal}>
						+Add a new Affliation
					</button>
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
					<button class="btn btn-success rounded-lg w-fit mt-4" on:click={addcerticicatesModal}>
						+Add a new Achievement
					</button>

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
					<button class="btn btn-success rounded-lg w-fit mt-4" on:click={addskillsModal}>
						+Add a new Skill
					</button>

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
			{#if showaddWorkExperiences}
				<div
					class="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 transition-opacity backdrop-blur-sm"
				>
					<div class="bg-blue-200 p-6 rounded-lg shadow-lg max-w-md w-full m-4">
						<div class="flex justify-between items-center mb-4">
							<h2 class="text-2xl font-bold">Add a new Experience</h2>
							<button class=" text-lg" on:click={closeclassmodal}>&times;</button>
						</div>

						<form
							use:enhance
							action="?/addWorkExperiences"
							method="POST"
							enctype="multipart/form-data"
							on:submit={() => {
								closeclassmodal();
							}}
						>
							<div class="flex flex-col space-y-6">
								<label class="label text-left mb-3">
									<span>Institute</span>

									<input
										class="input"
										type="text"
										id="WorkExperiencesInstitute"
										name="WorkExperiencesInstitute"
										bind:value={WorkExperiencesInstitute}
										placeholder="Enter The name of the Institute"
									/>
								</label>
								<label class="label text-left mb-3">
									<span>Position</span>

									<input
										class="input"
										type="text"
										id="WorkExperiencesPosition"
										name="WorkExperiencesPosition"
										bind:value={WorkExperiencesPosition}
										placeholder="Enter your Position if the Institute"
									/>
								</label>
								<label class="label text-left mb-3">
									<span>From</span>

									<input
										class="input"
										type="number"
										id="WorkExperiencesFrom"
										name="WorkExperiencesFrom"
										bind:value={WorkExperiencesFrom}
										placeholder="From year"
									/>
								</label>
								<label class="label text-left mb-3">
									<span>To</span>

									<input
										class="input"
										type="number"
										id="WorkExperiencesTo"
										name="WorkExperiencesTo"
										bind:value={WorkExperiencesTo}
										placeholder="To year"
									/>
								</label>

								<label class="label text-left mb-3">
									<span>Photo (optional)</span>

									<input
										class="file-input file-input-bordered w-full"
										type="file"
										id="WorkExperiencesImage"
										name="WorkExperiencesImage"
										bind:value={WorkExperiencesImage}
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
			{#if showPresentModal}
				<div
					class="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 transition-opacity backdrop-blur-sm"
				>
					<div class="bg-blue-200 p-6 rounded-lg shadow-lg max-w-md w-full m-4">
						<div class="flex justify-between items-center mb-4">
							<h2 class="text-2xl font-bold">Add a new Affliation</h2>
							<button class=" text-lg" on:click={closePresentModal}>&times;</button>
						</div>

						<form
							use:enhance
							action="?/addCurrentAffliation"
							method="POST"
							enctype="multipart/form-data"
							on:submit={() => {
								closePresentModal();
							}}
						>
							<div class="flex flex-col space-y-6">
								<label class="label text-left mb-3">
									<span>Institute</span>

									<input
										class="input"
										type="text"
										id="PresentInstitute"
										name="PresentInstitute"
										bind:value={PresentInstitute}
										placeholder="Enter The name of the Institute"
									/>
								</label>
								<label class="label text-left mb-3">
									<span>Position</span>

									<input
										class="input"
										type="text"
										id="PresentPosition"
										name="PresentPosition"
										bind:value={PresentPosition}
										placeholder="Enter your Position if the Institute"
									/>
								</label>
								<label class="label text-left mb-3">
									<span>From</span>

									<input
										class="input"
										type="number"
										id="PresentFrom"
										name="PresentFrom"
										bind:value={PresentFrom}
										placeholder="From year"
									/>
								</label>

								<label class="label text-left mb-3">
									<span>Photo (optional)</span>

									<input
										class="file-input file-input-bordered w-full"
										type="file"
										id="PresentImage"
										name="PresentImage"
										bind:value={PresentImage}
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
			{#if showskillsModal}
				<div
					class="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 transition-opacity backdrop-blur-sm"
				>
					<div class="bg-blue-200 p-6 rounded-lg shadow-lg max-w-md w-full m-4">
						<div class="flex justify-between items-center mb-4">
							<h2 class="text-2xl font-bold">Add a new Skill</h2>
							<button class=" text-lg" on:click={closeskillsModal}>&times;</button>
						</div>

						<form
							use:enhance
							action="?/addSkill"
							method="POST"
							on:submit={() => {
								closeskillsModal();
							}}
						>
							<div class="flex flex-col space-y-6">
								<label class="label text-left mb-3">
									<span>Skill Name</span>

									<input
										class="input"
										type="text"
										id="skillsbody"
										name="skillsbody"
										bind:value={skillsbody}
										placeholder="Enter The name of the Skill"
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
			{#if showCerticicatesModal}
				<div
					class="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 transition-opacity backdrop-blur-sm"
				>
					<div class="bg-blue-200 p-6 rounded-lg shadow-lg max-w-md w-full m-4">
						<div class="flex justify-between items-center mb-4">
							<h2 class="text-2xl font-bold">Add a new Certificate</h2>
							<button class=" text-lg" on:click={closecerticicatesModal}>&times;</button>
						</div>

						<form
							use:enhance
							action="?/addCertificate"
							method="POST"
							enctype="multipart/form-data"
							on:submit={() => {
								closecerticicatesModal();
							}}
						>
							<div class="flex flex-col space-y-6">
								<label class="label text-left mb-3">
									<span>Name</span>

									<input
										class="input"
										type="text"
										id="certicicatesName"
										name="certicicatesName"
										bind:value={certicicatesName}
										placeholder="Enter The name of the Certificate"
									/>
								</label>
								<label class="label text-left mb-3">
									<span>Organization</span>

									<input
										class="input"
										type="text"
										id="certicicatesIssuer"
										name="certicicatesIssuer"
										bind:value={certicicatesIssuer}
										placeholder="Enter Issuer Organization"
									/>
								</label>
								<label class="label text-left mb-3">
									<span>Received</span>

									<input
										class="input"
										type="number"
										id="certicicatesReceived"
										name="certicicatesReceived"
										bind:value={certicicatesReceived}
										placeholder="Reception Year"
									/>
								</label>
								<label class="label text-left mb-3">
									<span>Link</span>

									<input
										class="input"
										type="text"
										id="certicicatesLink"
										name="certicicatesLink"
										bind:value={certicicatesLink}
										placeholder="Enter Issuer Organization"
									/>
								</label>

								<label class="label text-left mb-3">
									<span>Photo (optional)</span>

									<input
										class="file-input file-input-bordered w-full"
										type="file"
										id="certicicatesImage"
										name="certicicatesImage"
										bind:value={certicicatesImage}
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
