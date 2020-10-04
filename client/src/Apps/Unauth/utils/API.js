import axios from 'axios';

const API = {
  signup: (endpoint, data) => axios.post(`/${endpoint}/create`, data),
  login: (endpoint, data) => axios.post(`/${endpoint}/login`, data)
}

export default API;