# Frontend ♪♪♪ ヽ(ˇ∀ˇ )ゞ

## Running the Frontend

### Prerequisites:

- Have `Node.js` installed on your machine
    - Make sure to use a version that supports TypeScript 4 and up
    - Node.js can be downloaded
      from [the official Node.js website](https://nodejs.org/)
- You must include the frontend `.env` file in the `/frontend` directory in order to properly run _discOvery_

### Steps:

1. Make sure you are in the `/frontend` directory.
2. Run `npm install` in the terminal to ensure all the required packages are installed.
3. Run `npm run dev` in the terminal to run the frontend.
4. The frontend should now be hosted on http://localhost:5173/! For security and authentication reasons, please make sure this is on port 5173.

## Frontend Tests

These test the `SongCard` component using Vitest

### Steps:

1. Run `npm install` from the root of the frontend folder to install all the required testing dependencies
2. To run the test cases, run `npm test`

## Frontend Tech

- React w/ TypeScript
- Material UI
- Axios
- React Router

## Image Credits:

- [Stars background overlay](frontend/src/assets/stars_background.jpg) also used in
  the [discover page header](frontend/src/assets/discover_page_header.png): Free for use photo by Aleksandar Pasaric
  from [Pexels](https://www.pexels.com/photo/dark-starry-sky-1694000/)
- [CD image](frontend/src/assets/cd_image.png): Free for use image by JJuni
  from [Pixabay](https://pixabay.com/vectors/cd-computer-disk-saved-electronic-1169624/)
- All other files in the `frontend/assets` folder are created by Team Amber Antelopes using Figma and Piskel
