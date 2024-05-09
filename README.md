# Motivation

We aim to make a strong community where you can share your project experience with others. You can write blogs, comment, do skill based search. We try to implement the best solution for your project management, commit controls. We try to develop a learning platform where you can teach people essential skills. In productivity app, we have chatbot, planner and what not

## Features
> Community and Blogging <br>
> Skill-based partner search <br>
> Collaborative code editor <br>
> video chatting <br>
> AI chatbot <br>
> Project management <br>


# Set Up and Usage

## Cloning the project

If you're seeing this, you've probably already done this step. Congrats!

```bash
git clone https://github.com/TheDeadcoder/coderhub.git
```

## Developing

Once you've cloned the project, install dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open

# or choose pnpm. Have some mercy on your disk
pnpm run dev
```

## Building

To create a production version of your app:

```bash
npm run build

# or choose pnpm.
pnpm run build
```

You can preview the production build with `npm run preview`.

## Environment File

> To use the app, create a .env file with following entities:
```bash
PUBLIC_SUPABASE_URL="*******************************************"
PUBLIC_SUPABASE_ANON_KEY="*******************************************"
OPENAI_KEY="*******************************************"
PUBLIC_APP_ID="*******************************************"
APP_CERTIFICATE="*******************************************"
```