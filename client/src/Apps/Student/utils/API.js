import axios from 'axios';

const API = {
  getUserInformation: (username) => axios.get(`/student/get/${username}`),
  getCareers: () => axios.get('/job/get')
}

export default API;