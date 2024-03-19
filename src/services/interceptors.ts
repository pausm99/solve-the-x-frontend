import AuthService from './authService';
import router from '../router';

export function configureResponseInterceptor() {
  const originalFetch = window.fetch;

  window.fetch = async function (url, options = {}) {
    const response = await originalFetch(url, options);

    if (response.status === 403) {
      AuthService.removeToken();
      router.push('/login');
    }

    const authorizationHeader = response.headers.get('Authorization');

    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1];
      AuthService.setToken(token);
    }

    return response;
  };
}

export function configureRequestInterceptor() {
  const originalFetch = window.fetch;

  window.fetch = async function (url, options = {}) {

    const token = AuthService.getToken();

    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return originalFetch(url, options);
  };
}
