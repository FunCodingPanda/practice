import axios from 'axios';

export const getCurrentUser = () => {
  // Check local storage to see if logged in
  const userId = localStorage.getItem('userId');
  if (userId) {
    return axios.get(`http://localhost:3000/users/${userId}`)
      .then(response => response.data)
  } else {
    return Promise.resolve({error: 'Not logged in'})
  }
}
