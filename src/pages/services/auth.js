import jwt from 'jsonwebtoken';

export const TOKEN_KEY = "app-token";
export const TOKEN_KEY_USER = "app-user";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getTokenUser = () => localStorage.getItem(TOKEN_KEY_USER);
export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};
export const isTokenExpired = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  try {
    const date = new Date(0);
    const decoded = jwt.decode(token);
    date.setUTCSeconds(decoded.exp);
    //     const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)
    // const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date)
    // const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)
    // const hh = date.getHours()
    // const mm = new Intl.DateTimeFormat('en', { minute: '2-digit' }).format(date)
    // const ss = new Intl.DateTimeFormat('en', { second: '2-digit' }).format(date)


    //     return `${da}-${mo}-${ye} ${hh}:${mm}:${ss}`;
    return date.valueOf() > new Date().valueOf();
  } catch (err) {
    return false;
  }
};