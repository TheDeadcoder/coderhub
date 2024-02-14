<script>
	import Theme from '$lib/themeswitcher.svelte';
	import Navbar from '$lib/navbarLanding.svelte';
</script>

<main class="bg-[#fdf6f1]">
	<section>
		<Navbar />
	</section>
	<section class="mt-[7%] mb-32">
		<div class="flex justify-center mx-auto space-x-40 max-w-7xl">
			<div class="flex flex-col w-1/2 z-[2]">
				<h1 class="text-5xl font-bold font-heading mb-1">Reimagine your DEV Life with us</h1>

				<p class="text-l font-semibold mb-9 w-4/5 mt-4">
					Stay with Coderhub ecosystem and save you precious time. Increase your productivity.
					Communicate and collaborate with the community
				</p>
				<a
					href="/login"
					target="_self"
					class="font-bold text-xl p-4 bg-[#77B8De] rounded-xl shadow-md hover:bg-[#619ecf] hover:text-[21px] hover:shadow-lg w-1/2 text-center"
				>
					Get Started For Free
				</a>
			</div>
			<div class="relative flex items-center justify-center w-1/2 z-[2]">
				<img
					src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/imagecoding.gif?t=2024-02-14T11%3A09%3A57.444Z"
					width="90%"
					height="70%"
					alt="Pixi Logo"
					class="absolute -bottom-32"
				/>
				<img
					src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/Other%2015.png"
					class="absolute left-0 -top-10"
					width={200}
					height={200}
					alt="Other 15"
				/>
				<img
					src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/vscode-svgrepo-com.svg"
					class="absolute right-0 -top-1"
					width={185}
					height={185}
					alt="Other 15"
				/>
				<img
					src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/f3ebee30-bd9b-43f0-80cf-aca4982ca152.png"
					class="absolute -left-0 -bottom-56 -rotate-12"
					width={185}
					height={185}
					alt="Other 15"
				/>

				<svg
					class="absolute -right-0 -bottom-12 w-20 h-20 -rotate-12"
					version="1"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 48 48"
					enable-background="new 0 0 48 48"
				>
					<path
						fill="#4CAF50"
						d="M8,12h22c2.2,0,4,1.8,4,4v16c0,2.2-1.8,4-4,4H8c-2.2,0-4-1.8-4-4V16C4,13.8,5.8,12,8,12z"
					/>
					<polygon fill="#388E3C" points="44,35 34,29 34,19 44,13" />
				</svg>

				<!-- <img
				src="https://upload.wikimedia.org/wikipedia/commons/e/ee/Icons8_flat_video_call.svg"
				class="absolute -left-36 -bottom-96"
				width={427}
				height={427}
				alt="Badrun 4"
			/> -->

				<img
					src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/Other%2004.png"
					class="absolute -bottom-60 right-0"
					width={180}
					height={180}
					alt="Other 04"
				/>
			</div>
		</div>
	</section>
	<section class="py-20 max-w-screen-lg mx-auto mt-72">
		<div class="flex justify-center text-center">
			<div class="flex flex-col space-y-3">
				<h2 class="text-4xl font-bold font-heading">All-in-one platform</h2>
				<p>A complete Development Package in your hand</p>
			</div>
		</div>
		<div class="grid grid-cols-3 gap-12 mt-20">
			<div
				class="flex flex-col p-4 space-y-3 hover:shadow-2xl transition duration-300 cursor-pointer"
			>
				<div class="flex space-x-3">
					<img
						src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/code-svgrepo-com.svg"
						class="transform transition duration-300 hover:rotate-12"
						alt="title"
						width={25}
						height={25}
					/>
					<h5 class="font-bold font-heading">Code Management</h5>
				</div>
				<p>
					Projects from diverse fields.Track changes and contributions seamlessly for different
					project types
				</p>
			</div>
			<div
				class="flex flex-col p-4 space-y-3 hover:shadow-2xl transition duration-300 cursor-pointer"
			>
				<div class="flex space-x-3">
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/connection-network-internet-seo-svgrepo-com.svg"
						class="transform transition duration-300 hover:rotate-12"
						alt="title"
						width={30}
						height={30}
					/>
					<h5 class="font-bold font-heading">Communicate</h5>
				</div>
				<p>Communicate & Collaborate with groups and achieve goals. Shared editor, Group chat</p>
			</div>

			<div
				class="flex flex-col p-4 space-y-3 hover:shadow-2xl transition duration-300 cursor-pointer"
			>
				<div class="flex space-x-3">
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/teacher%20(1).svg"
						class="transform transition duration-300 hover:rotate-12"
						alt="title"
						height={30}
						width={30}
					/>
					<h5 class="font-bold font-heading">Mentorship</h5>
				</div>
				<p>Get in touch with any Microcourse. Learn Anything with our interactive live class</p>
			</div>
			<div
				class="flex flex-col p-4 space-y-3 hover:shadow-2xl transition duration-300 cursor-pointer"
			>
				<div class="flex space-x-3">
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/robot.svg"
						class="transform transition duration-300 hover:rotate-12"
						alt="title"
						height={30}
						width={30}
					/>
					<h5 class="font-bold font-heading">AI Chatbot</h5>
				</div>
				<p>Get help from your personal AI assistant</p>
			</div>
			<div
				class="flex flex-col p-4 space-y-3 hover:shadow-2xl transition duration-300 cursor-pointer"
			>
				<div class="flex space-x-3">
					<img
						src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/share-1099-svgrepo-com.svg"
						class="transform transition duration-300 hover:rotate-12"
						alt="title"
						height={30}
						width={30}
					/>
					<h5 class="font-bold font-heading">Resource Sharing</h5>
				</div>
				<p>Resources are shared to bridge the gap between people from different disciplines</p>
			</div>

			<div
				class="flex flex-col p-4 space-y-3 hover:shadow-2xl transition duration-300 cursor-pointer"
			>
				<div class="flex space-x-3">
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/analysis-svgrepo-com.svg"
						class="transform transition duration-300 hover:rotate-12"
						alt="title"
						height={30}
						width={30}
					/>
					<h5 class="font-bold font-heading">Analysis</h5>
				</div>
				<p>Analyse your Progress & Take steps from Recommendations</p>
			</div>
		</div>
		<div class="flex justify-center mt-12 space-x-8">
			<a
				href="https://www.youtube.com/"
				class="font-bold text-xl p-4 bg-[#77B8De] rounded-xl shadow-md hover:bg-[#619ecf] hover:text-[21px] hover:shadow-lg w-1/3 text-center"
			>
				Get Demo
			</a>
			<a
				href="/login"
				target="_self"
				class="font-bold text-xl p-4 bg-[#cf9261] rounded-xl shadow-md hover:bg-[#FFB26D] hover:text-[21px] hover:shadow-lg w-1/3 text-center"
			>
				Get Started
			</a>
		</div>
	</section>
</main>

<main>
	<nav></nav>
</main>
