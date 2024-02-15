<script lang="ts">
	import Themeswitcher from '$lib/themeswitcher.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import { z } from 'zod';

	export let data: PageData;

	const userSchema = z.object({
		email: z
			.string({ required_error: 'Email is required' })
			.min(1, { message: 'Email is required' })
			.max(256, { message: 'Email must be less than 256 characters' })
			.email({ message: 'Email must be a valid email address' }),
		password: z
			.string({ required_error: 'Password is required' })
			.min(8, { message: 'Password must be at least 8 characters' })
			.max(32, { message: 'Password must be less than 32 characters' })
			.regex(new RegExp('.*[A-Z].*'), 'Password must contain at least one uppercase character')
			.regex(new RegExp('.*[a-z].*'), 'Password must contain at least one lowercase character')
			.regex(new RegExp('.*\\d.*'), 'Password must contain at least one number')
			.regex(
				new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
				'Password must contain at least one special character'
			)
			.trim()
	});

	const { form, errors, enhance, constraints, message } = superForm(data.form, {
		validators: userSchema
	});

	let isLoading = false;
	async function onSubmit() {
		isLoading = true;
		setTimeout(() => {
			isLoading = false;
		}, 10000);
	}
</script>

<nav class="flex justify-between mx-6 p-6 z-[5]">
	<img
		src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/coderhublogo.png"
		class="transform transition duration-300 hover:scale-105"
		alt="title"
		width={150}
	/>
	<div class="flex flex-row space-x-4">
		<a class="link link-hover link-info mt-4" href="/login" target="_self" rel="noreferrer">
			Get Started
		</a>
		<a class="link link-hover link-info mt-4" href="/about" target="_blank" rel="noreferrer">
			About us
		</a>
		<Themeswitcher />
	</div>
</nav>
<div class="card lg:card-side bg-base-100 shadow-xl ml-14 mr-14 mt-10">
	{#if isLoading}
		<div class="toast toast-top toast-end">
			<div class="alert alert-info">
				<span>Please check your mail for confirmation</span>
			</div>
		</div>{/if}
	<div class="grid grid-cols-2 gap-12">
		<figure>
			<img
				src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/68747470733a2f2f696d616765732e73717561726573706163652d63646e2e636f6d2f636f6e74656e742f76312f3537363966633430316236333162616231616464623261622f313534313538303631313632342d5445363451474b524a4738535741495553374e532f6b653.gif"
				alt="Album"
			/>
		</figure>
		<div class="card-body">
			<h2 class="card-title text-2xl font-extrabold">Sign Up to CoderHub</h2>
			<form
				use:enhance
				action="?/login"
				method="post"
				class="mt-6"
				on:submit={() => {
					onSubmit();
				}}
			>
				{#if $message}
					<div
						class="text-red-500 border-red-500 border-2 bg-red-100 py-2 px-2 rounded-sm text-base"
					>
						{$message}
					</div>
				{/if}
				<h1 class="font-bold mt-6">Enter Email</h1>
				<label for="email" class="input input-bordered flex items-center gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 16 16"
						fill="currentColor"
						class="w-4 h-4 opacity-70"
						><path
							d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"
						/><path
							d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"
						/></svg
					>
					<input
						type="text"
						placeholder="name@domain.com"
						name="email"
						id="email"
						disabled={isLoading}
						bind:value={$form.email}
						class="grow {$errors.email ? 'border-red-500' : null}"
					/>
					{#if $errors.email}
						<small class="text-red-500">{$errors.email[0]}</small>
					{/if}
				</label>
				<h1 class="font-bold mt-4">Enter Password</h1>
				<label for="password" class="input input-bordered flex items-center gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 16 16"
						fill="currentColor"
						class="w-4 h-4 opacity-70"
						><path
							fill-rule="evenodd"
							d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
							clip-rule="evenodd"
						/></svg
					>
					<input
						type="password"
						class="grow {$errors.password ? 'border-red-500' : null}"
						name="password"
						id="password"
						disabled={isLoading}
						bind:value={$form.password}
					/>
					{#if $errors.password}
						<small class="text-red-500">{$errors.password[0]}</small>
					{/if}
				</label>
				<button type="submit" class="btn btn-accent mt-8 w-full" disabled={isLoading}>
					{#if isLoading}
						<span class="loading loading-spinner loading-xs"></span>
					{/if}
					Sign Up
				</button>
			</form>
		</div>
	</div>
</div>
