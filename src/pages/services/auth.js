

export const TOKEN_KEY = "app-token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// export const isTokenExpired = () => {
//   const token = localStorage.getItem("TOKEN_KEY");
//   try {
//     const date = new Date(0);
//     const decoded = decode(token);
//     date.setUTCSeconds(decoded.exp);
//     return date.valueOf() > new Date().valueOf();
//   } catch (err) {
//     return false;
//   }
// };