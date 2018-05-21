import axios from 'axios';

export const getCurrentUser = () => {
  const userId = localStorage.getItem('userId');
  if (userId) {
    return axios.get(`${process.env.REACT_APP_BASE_URL}/users/${userId}`)
      .then(response => response.data)
  } else {
    return Promise.resolve({error: 'Not logged in'})
  }
}
