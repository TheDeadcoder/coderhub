<script lang="ts">
	// @ts-nocheck
	import Themeswitcher from '$lib/themeswitcher.svelte';
	import { enhance } from '$app/forms';
	import Footer from '$lib/footer.svelte';
	import BookCategory from '../../../lib/Book_category.svelte';
	import OverlayPdf from '$lib/OverlayPdf.svelte';
	import { isOverlayPdf } from '../../../stores/OverlayPdf';

	let currentTile: number = 1;

	export let data;

	let { session, supabase, book, tagsToBooksMap, userNow } = data;
	$: ({ session, supabase, book, tagsToBooksMap, userNow } = data);

	let title;
	let author;
	let edition;
	let content;
	let tags;
	let coverimg;

	let url = '';

	$: console.log(url);
	let showaddmodal = false;
	function addclassmodal() {
		console.log(showaddmodal);
		showaddmodal = true;
	}

	function closeclassmodal() {
		showaddmodal = false;
	}

	const handleSignOut = async () => {
		// console.log('logout start');
		await data.supabase.auth.signOut();
		// console.log('logout done');
		window.open('/login', '_self');
	};
</script>

<div>
	<div>
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
		</nav>
	</div>

	<button class="btn" on:click={addclassmodal}>
		<div class="flex flex-row items-center space-x-3 p-5">
			<img
				src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/plus-add-svgrepo-com.svg"
				alt="Dashboard Icon"
				class="h-5 mr-1 hover:rotate-12"
			/>
			<h1 class="text-lg">Add New Resource</h1>
		</div>
	</button>

	<div class="mt-9 ml-20 mr-20">
		{#each Object.entries(tagsToBooksMap) as [tag, books]}
			<BookCategory categoryName={tag} {books} bind:url></BookCategory>
		{/each}
		<!-- <BookCategory categoryName="Childrean" books={book} bind:url></BookCategory>
			<BookCategory categoryName="Science" books={book} bind:url></BookCategory> -->
	</div>

	{#if showaddmodal}
		<div
			class="fixed inset-0 bg-sky-200 bg-opacity-50 flex justify-center items-center z-50 transition-opacity"
		>
			<div class="bg-blue-200 p-6 rounded-lg shadow-lg max-w-md w-full m-4">
				<div class="flex justify-between items-center mb-4">
					<h2 class="text-2xl font-bold">Add a new Resource</h2>
					<button class=" text-lg" on:click={closeclassmodal}>&times;</button>
				</div>

				<form
					use:enhance
					action="?/upload"
					method="POST"
					on:submit={closeclassmodal}
					enctype="multipart/form-data"
				>
					<div class="space-y-6">
						<label class="label text-left mb-3">
							<span>Resource Title</span>

							<input
								class="input"
								type="text"
								id="title"
								name="title"
								bind:value={title}
								placeholder="Enter The Title of the Resource"
							/>
						</label>
						<label class="label text-left">
							<span>Resource authors</span>
							<input
								class="input"
								type="text"
								placeholder="Who are the authors... (separate by comma)"
								id="author"
								name="author"
								bind:value={author}
							/>
							<!-- <div class="mt-2 flex flex-wrap">
								{#each author as value, i}
									<div
										class="bg-blue-200 text-blue-700 rounded-full px-4 py-1 m-1 flex items-center"
									>
										{value}
										<button class="ml-2 text-red-500" on:click={() => removeValue(i, 'author')}
											>x</button
										>
									</div>
								{/each}
							</div> -->
						</label>
						<label class="label text-left mb-3">
							<span>Resource Edition</span>

							<input
								class="input"
								type="number"
								id="edition"
								name="edition"
								bind:value={edition}
								placeholder="What is the Edition"
							/>
						</label>
						<label class="label text-left">
							<span>Resource Tags</span>
							<input
								class="input"
								type="text"
								placeholder="What are the tags...(separate by comma)"
								id="tags"
								name="tags"
								bind:value={tags}
							/>
							<!-- <div class="mt-2 flex flex-wrap">
								{#each tags as value, i}
									<div
										class="bg-blue-200 text-blue-700 rounded-full px-4 py-1 m-1 flex items-center"
									>
										{value}
										<button class="ml-2 text-red-500" on:click={() => removeValue1(i, 'tags')}
											>x</button
										>
									</div>
								{/each}
							</div> -->
						</label>

						<label class="label text-left mb-3">
							<span>Resource Content</span>

							<input
								class="file-input file-input-bordered w-full"
								type="file"
								id="content"
								name="content"
								bind:value={content}
							/>
						</label>

						<label class="label text-left mb-3">
							<span>Cover Photo (optional)</span>

							<input
								class="file-input file-input-bordered w-full"
								type="file"
								id="coverimg"
								name="coverimg"
								bind:value={coverimg}
							/>
						</label>
						<button type="submit" class="btn btn-success text-xl font-semibold"> Submit </button>
					</div>
				</form>
			</div>
		</div>
	{/if}
	<!-- <pre>{JSON.stringify(book, null, 2)}</pre>
	<pre>{JSON.stringify(tagsToBooksMap, null, 2)}</pre> -->

	{#if $isOverlayPdf}
		<OverlayPdf {url} />
	{/if}
	<Footer />
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
