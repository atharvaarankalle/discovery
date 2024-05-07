/**
 * @function isAuthTokenExpired
 *
 * @returns a boolean, true if the auth token has expired, false if it has not
 */

export const isAuthTokenExpired = () => {
  const authTokenValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="));

  if (!authTokenValue) {
    return true; // could not find the auth token
  }

  const expiryDateString = authTokenValue.split("=")[1];
  const expiryDate = new Date(expiryDateString);

  // compare the expiry date-time with the date-time now
  return expiryDate.getTime() < Date.now();
};

// // Usage example
// const cookieName = "authToken";
// if (isAuthTokenExpired(cookieName)) {
//   console.log("Cookie has expired");
// } else {
//   console.log("Cookie is still valid");
// }
