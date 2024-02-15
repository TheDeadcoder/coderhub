<script lang="ts">
	import type { ChatCompletionRequestMessageRoleEnum } from 'openai';

	import { date } from 'zod';
	export let type: ChatCompletionRequestMessageRoleEnum;
	export let message: string;

	let gpticon =
		'https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/chatgpt-icon.svg';
	let usericon =
		'https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/defaultuser.png';
</script>

{#if type === 'user'}
	<div class="chat chat-end">
		<div class="chat-image avatar">
			<div class="w-10 rounded-full">
				<img alt="Tailwind CSS chat bubble component" src={usericon} />
			</div>
		</div>
		<div class="chat-header">
			Me
			<time class="text-xs opacity-50">{new Date().getHours}:{new Date().getMinutes()}</time>
		</div>
		<div class="chat-bubble">{message}</div>
		<div class="chat-footer opacity-50">Delievered</div>
	</div>
{:else}
	<div class="chat chat-start">
		<div class="chat-image avatar">
			<div class="w-10 rounded-full">
				<img alt="Tailwind CSS chat bubble component" src={gpticon} />
			</div>
		</div>
		<div class="chat-header">
			BOT
			<time class="text-xs opacity-50">{new Date().getHours()}:{new Date().getMinutes()}</time>
		</div>
		<div class="chat-bubble">{message}</div>
		<div class="chat-footer opacity-50">Delivered</div>
	</div>
{/if}
