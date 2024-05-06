This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

`Node: v18.17.0`

`npm: v9.6.7`

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

Run the test suite:

```bash
npm run test
# or
yarn test
# or
npm run test:watch
# or
yarn test:watch
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

# The Approach: ReactJS + NextJS

## Why NextJS?

Creating a production-ready app with NextJS is as simple as running a single command `npx create-next-app`. The NextJS framework has a built-in support for TypeScript and CSS/Sass. It is also very easy to scale a project using this framework since it already supports server-side rendering, automatic code splitting, and static site generation. Another plus is its file-system based routing which simplifies navigation.

## Folder Structure

The project aims to create a maintainable folder structure by segregating files into multiple folders. Having the right files in the correct folder helps organize the code and makes it relatively easier for developers to have an idea where things are.

```bash
/src/app/page.tsx
```
Landing page for the app.

```bash
/src/app/__tests__
```
Contains all the tests for the app.

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

## How the app works

Kept it simple to just display all the fields in one line. The dropdown fields also functions as a search filter for ease of use.

The app will automatically fetch the list of countries. Selecting a country will call the API for fetching its states. Clicking the search button will call an API to get the Country-State geolocation, once the API retrieves the latitude and longitude, a Google Map web widget will display and center itself based on the geolocation.

Note: The Google Map web widget has gestures disabled to reduce the number of API calls to the Google Map API because I'm only using their free plan.

The Google Map API Key is included in the `.env.local` file for exam purposes, so the app can utilize Google Maps wherever it is being run. This API Key will be removed once the frontend exam is done.
