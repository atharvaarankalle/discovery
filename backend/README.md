# Backend (ˇ▽ˇ)ノ♪♬♫

## Running the Backend

### Prerequisites:

- Have `Node.js` installed on your machine
    - Make sure to use a version that supports TypeScript 4 and up
    - Node.js can be downloaded
      from [the official Node.js website](https://nodejs.org/)
- You must include the backend `.env` file in the `/backend` directory in order to properly run _discOvery_

### Steps:

1. Make sure you are in the `/backend` directory.
2. Run `npm install` in the terminal to ensure all the required packages are installed.
3. Run `npm run dev` or `npm start` in the terminal to run the backend.
4. The backend should now be hosted on port 3000!

## Running Backend Tests

These test the express API endpoints and mongoose schemas.

### Steps:

1. Run `npm install` from the root of the backend folder to install all the required testing dependencies
2. To run all test cases, run `npm test`
3. To run test cases in a specific file, run `npm test -- filename` (for example: `npm test -- PromptSchema.test.js`)

## Backend Tech

- Node.js w/ TypeScript
- Express
- MongoDB
- OpenAI
- Spotify API
- Axios