import axios from 'axios';

const API = {
  getUserInformation: (username) => axios.get(`/student/get/${username}`),
  getCareers: () => axios.get('/job/get'),
  setCareer: (data) => axios.post('/student/set_job', data)
}

export default API;