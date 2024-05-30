export default function clearCookiesLocalStorage() {
  localStorage.removeItem('token');
  localStorage.removeItem('logout-timer');
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
}