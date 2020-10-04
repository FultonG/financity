import axios from 'axios';

const API = {
  getUserInformation: (username) => axios.get(`/student/get/${username}`),
  getCareers: () => axios.get('/job/get'),
  setCareer: (data) => axios.post('/student/set_job', data),
  getProperties: (classCode) => axios.get(`/realtor/house/${classCode}/10`),
  buyProperty: (data) => axios.post('/student/buy_house', data),
  getQuestion: (questionId) => axios.get(`/question/get/${questionId}`),
  submitAnswer: (data) => axios.post('/student/complete_question', data)
}

export default API;