import axios from 'axios';

export const getCurrentUser = () => {
  const userId = localStorage.getItem('userId');
  if (userId) {
    return axios.get(`http://localhost:3000/users/${userId}`)
      .then(response => response.data)
  } else {
    return Promise.resolve({error: 'Not logged in'})
  }
}
