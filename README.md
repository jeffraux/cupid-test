This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install dependencies:
```bash
npm install
# or
yarn install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## View on Vercel

Check out the project here: [link](https://link/)

# The Approach: ReactJS + NextJS

## Why NextJS?

Creating a production-ready app with NextJS is as simple as running a single command `npx create-next-app`. The NextJS framework has a built-in support for TypeScript and CSS/Sass. Its also very easy to scale a project using this framework since it already supports server-side rendering, automatic code splitting, and static site generation. Another plus is its file-system based routing which simplifies navigation.

## Folder Structure

The project aims to create a maintanable folder structure by segregating files into multiple folders. Having the right files in the correct folder helps organize the code and makes it relatively easier for developers to have an idea where things are.

```bash
/src/app/pages
```
Contains all the pages in the app. Takes advantage of the built-in file-system based routing.

```bash
/src/app/api
```
Contains all API related functions like GET, POST, etc.

```bash
/src/app/components
```
Directory of all components used in the app.

```bash
/src/app/types
```
Defines all types and interfaces used all throughout the app.