<script>
	// @ts-nocheck
	import { makeDiff, cleanupSemantic } from '@sanity/diff-match-patch';
	import { enhance } from '$app/forms';
	import Themeswitcher from '$lib/themeswitcher.svelte';
	import JSZip from 'jszip';
	import DirectoryStructure from '$lib/DirectoryStructure.svelte';

	export let data;
	let title;
	let description;
	let showaddmodal = false;
	function addclassmodal() {
		showaddmodal = true;
	}

	function closeclassmodal() {
		showaddmodal = false;
	}

	let { session, supabase, userNow, projects } = data;
	$: ({ session, supabase, userNow, projects } = data);
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
	function navigateToPeer() {
		window.open(`/protected/peer`, '_self');
	}

	function prettyHTML(diffs) {
		var html = [];
		var pattern_amp = /&/g;
		var pattern_lt = /</g;
		var pattern_gt = />/g;
		var pattern_para = /\n/g;
		for (var x = 0; x < diffs.length; x++) {
			var op = diffs[x][0]; // Operation (insert, delete, equal)
			var data = diffs[x][1]; // Text of change.
			var text = data
				.replace(pattern_amp, '&amp;')
				.replace(pattern_lt, '&lt;')
				.replace(pattern_gt, '&gt;')
				// .replace(pattern_para, '&para;<br>');
			switch (op) {
				case 1:
					html[x] = '<ins style="background:#e6ffe6;">' + text + '</ins>';
					break;
				case -1:
					html[x] = '<del style="background:#ffe6e6;">' + text + '</del>';
					break;
				case 0:
					html[x] = '<span>' + text + '</span>';
					break;
			}
		}
		return html.join('');
	}

	//New Stuff
	let diffResults = [];
	let tree1 = [];
	let tree2 = [];

	async function getDirectoryStructure(files) {
		const directory = {};
		for (const file of files) {
			const pathComponents = file.content.name.split('/');
			let currentDir = directory;
			for (let i = 0; i < pathComponents.length; i++) {
				const component = pathComponents[i];
				if (!(component in currentDir)) {
					currentDir[component] = i === pathComponents.length - 1 ? file.name : {};
				}
				currentDir = currentDir[component];
			}
		}
		return directory;
	}

	function compareAndPrintDifferences(folder1, folder2, path) {
		for (const item in folder1) {
			const fullPath = path + '/' + item;
			if (!(item in folder2)) {
				console.log('Removed:', fullPath);
			} else if (typeof folder1[item] === 'object' && typeof folder2[item] === 'object') {
				compareAndPrintDifferences(folder1[item], folder2[item], fullPath);
			}
			// else if (typeof folder1[item] !== 'object' && folder1[item] === folder2[item]) {
			// 	console.log('Same: ' + fullPath);
			// }
		}
		for (const item in folder2) {
			const fullPath = path + '/' + item;
			if (!(item in folder1)) {
				console.log('Added:', fullPath);
			}
		}
	}

	function compareAndStoreMatchingFiles(files1, files2, matchingFiles1, matchingFiles2) {
		for (let i = 0; i < files1.length; i++) {
			for (let j = 0; j < files2.length; j++) {
				if (files1[i].content.name == files2[j].content.name) {
					matchingFiles1.push(files1[i]);
					matchingFiles2.push(files2[j]);
				}
			}
		}
	}

	async function realUpload() {
		const input = document.getElementById('uploadForm').querySelector('input[type=file]');
		const files = input.files;

		// console.log(files)
		const firstFileRelativePath = files[0].webkitRelativePath;
		const pathComponents = firstFileRelativePath.split('/');
		const rootFolderName = pathComponents[0];

		console.log(rootFolderName);

		const zip = new JSZip();

		// Add each file to the zip
		for (const file of files) {
			zip.file(file.webkitRelativePath, file);
		}

		// Generate the zip file
		const content = await zip.generateAsync({ type: 'blob' });

		const { data: res, error: err } = await supabase.storage
			.from('test')
			.upload(rootFolderName, content, {
				cacheControl: '3600',
				upsert: false
			});

		console.log(res);
		console.log(err);
	}

	async function realDownload() {
		//First Download
		const { data: res1, error: err1 } = await supabase.storage.from('test').download('bg');

		const zip1 = new JSZip();
		const unzipped1 = await zip1.loadAsync(res1);

		const files1 = [];
		unzipped1.forEach((_, zipEntry) => {
			const filename = getFilenameFromPath(zipEntry.name);
			if (filename.length > 0) {
				files1.push({ filename, content: zipEntry });
			}
		});

		console.log(files1);

		const folder1 = await getDirectoryStructure(files1);
		tree1 = [];
		printDirectoryTree(files1, '', 1);

		//Second Download
		const { data: res2, error: err2 } = await supabase.storage.from('test').download('bg_');

		const zip2 = new JSZip();
		const unzipped2 = await zip2.loadAsync(res2);

		const files2 = [];
		unzipped2.forEach((_, zipEntry) => {
			const filename = getFilenameFromPath(zipEntry.name);
			if (filename.length > 0) {
				files2.push({ filename, content: zipEntry });
			}
		});

		console.log(files2);

		const folder2 = await getDirectoryStructure(files2);
		tree2 = [];
		printDirectoryTree(files2, '', 2);

		// console.log(tree1);
		// console.log(tree2);

		//Compare & Print
		console.log('Differences:');
		compareAndPrintDifferences(folder1, folder2, '', '');

		console.log('Matching Files');
		let matchingFiles1 = [];
		let matchingFiles2 = [];

		// console.log(input1.files)
		compareAndStoreMatchingFiles(files1, files2, matchingFiles1, matchingFiles2);

		console.log('Matching Files from Folder 1:', matchingFiles1);
		console.log('Matching Files from Folder 2:', matchingFiles2);

		diffResults = [];

		for (let i = 0; i < matchingFiles1.length; i++) {
			let x = await matchingFiles1[i].content.async('string');
			let y = await matchingFiles2[i].content.async('string');

			let diff = makeDiff(x, y);
			diff = cleanupSemantic(diff);
			diff = prettyHTML(diff);

			let tmp = {
				name: matchingFiles1[i].filename,
				content: diff
			};

			diffResults = [...diffResults, tmp];
		}

		console.log(tree1);
		console.log(tree2);
	}

	function printDirectoryTree(files, indent, id) {
		const fileMap = {};
		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			const pathComponents = file.content.name.split('/');
			let currentDir = fileMap;
			for (let j = 0; j < pathComponents.length; j++) {
				const component = pathComponents[j];
				if (!(component in currentDir)) {
					currentDir[component] = {};
				}
				currentDir = currentDir[component];
			}
		}
		printDirectoryStructure(fileMap, indent, id);
	}

	function printDirectoryStructure(directory, indent, id) {
		for (const item in directory) {
			console.log(indent + item);
			if (id == 1) {
				tree1 = [...tree1, indent + item];
			} else {
				tree2 = [...tree2, indent + item];
			}
			if (Object.keys(directory[item]).length > 0) {
				printDirectoryStructure(directory[item], indent + '│	', id);
			}
		}
	}

	function getFilenameFromPath(path) {
		// Extract filename from the path
		return path.split('/').pop();
	}

	// function downloadFile(filename, content) {
	// 	const blob = new Blob([content]);
	// 	const url = URL.createObjectURL(blob);

	// 	const link = document.createElement('a');
	// 	link.href = url;
	// 	link.download = filename;
	// 	document.body.appendChild(link);
	// 	link.click();

	// 	// Clean up
	// 	URL.revokeObjectURL(url);
	// 	link.remove();
	// }
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
					<li class="flex items-center p-4 bg-red-400 cursor-default" on:click={navigateToProjects}>
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
			<button class="mt-6 btn btn-success" on:click={addclassmodal}> + Add a New Project </button>
			<div class="grid grid-cols-4 gap-12 mt-6">
				{#each projects as currProject}
					<div class="card w-96 bg-base-100 shadow-xl">
						<figure>
							<img
								src="https://img.freepik.com/free-vector/gradient-technology-devops-illustration_23-2149358047.jpg?w=1380&t=st=1708359467~exp=1708360067~hmac=42936fb6f4d8b29bf480839f6124a969a5c191e1ff647be7d70f8ad97b6136c6"
								alt="Shoes"
							/>
						</figure>
						<div class="card-body">
							<h2 class="card-title">{currProject.title}</h2>
							<p class="text-sm">{currProject.description}</p>
							<a href="/protected/project/{currProject.id}" class="btn btn-primary mt-3">
								Go Inside
							</a>
						</div>
					</div>
				{/each}
			</div>
			<!-- <form id="uploadForm" method="post" enctype="multipart/form-data">
				<input type="file" name="files[]" webkitdirectory multiple /><br />
			</form>
			<div>
				<button
					class="btn btn-outline mt-5"
					on:click={() => {
						realUpload();
					}}>Real Upload</button
				>
				<button
					class="btn btn-outline mt-5"
					on:click={() => {
						realDownload();
					}}
					>Real Download
				</button>
			</div>
			<DirectoryStructure directories={tree1} title="Tree1" />
			<DirectoryStructure directories={tree2} title="Tree2" />
			<div>
				{#each diffResults as x, index}
					<div class="card mt-5 shadow p-5 hover:shadow-xl">
						<p class="card-title">FileName: {x['name']}</p>
						<div class="card-body">
							<p>{@html x['content']}</p>
						</div>
					</div>
				{/each}
			</div> -->
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
							action="?/addProj"
							method="POST"
							on:submit={() => {
								closeclassmodal();
							}}
						>
							<div class="flex flex-col space-y-6">
								<label class="label text-left mb-3">
									<span>Project Title</span>

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
									<span>Description</span>
									<textarea
										class="textarea"
										rows="2"
										placeholder="Enter the description..."
										id="description"
										name="description"
										bind:value={description}
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
</style>
