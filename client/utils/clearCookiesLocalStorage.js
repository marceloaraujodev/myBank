export default function clearCookiesLocalStorage() {
  localStorage.removeItem('token');
  localStorage.removeItem('logout-timer');
  // // when httpOnly: true the backend alone removes the cookie line below not need it if using httpONly true
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
}