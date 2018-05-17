import axios from 'axios';

/**
 * This function installs some axios "middleware" (which is technically
 * called an interceptor), which applies a function every time a request
 * is sent.
 * In this case, it will add the "Authorization: Bearer ${token}" header
 * to every request, if the token is available in local storage.
 */
export const installAuthInterceptor = () => {
  axios.interceptors.request.use(config => {
    const auth = localStorage.getItem('auth');

    // Make sure to only add headers for our backend
    if (auth && config.url.match(/localhost/)) {
      const { access_token } = JSON.parse(auth);
      config.headers.Authorization = `Bearer ${access_token}`;
    }

    return config;
  }, err => {
    return Promise.reject(err);
  });
};

// Referencing https://gist.github.com/srph/38f67a10e991b6cb2d83
// If I didn't have this function, I would have to do something like this
// with every request:
//
//   axios.post('/api/whatever', { 'Auth': `Bearer ${token}`}, payload).then(
//     ...
//   )
//
// Instead, I am able to do this instead:
//
//   axios.post('/api/whatever', payload).then(
//     ...
//   )
//
