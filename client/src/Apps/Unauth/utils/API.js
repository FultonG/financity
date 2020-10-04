import axios from 'axios';

const API = {
  signup: (endpoint, data) => axios.post(`/${endpoint}/create`, data)
}

export default API;