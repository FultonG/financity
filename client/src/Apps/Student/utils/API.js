import axios from 'axios';

const API = {
  getUserInformation: (username) => axios.get(`/student/get/${username}`),
  getCareers: () => axios.get('/job/get'),
  setCareer: (data) => axios.post('/student/set_job', data),
  getProperties: (classCode) => axios.get(`/realtor/house/${classCode}/10`),
  buyProperty: (data) => axios.post('/student/buy_house', data),
  getQuestion: (questionId) => axios.get(`/question/get/${questionId}`),
  submitAnswer: (data) => axios.post('/student/complete_question', data),
  getStocks: () => axios.get('/stock/default'),
  buyStock: (data) => axios.post('/student/buy_stock', data),
  getStockHistoricalData: (symbol, fromDate, toDate) => axios.get(`stock/history/${symbol}/${fromDate}/${toDate}`),
  getStockDetails: (ticker) => axios.get(`/stock/info/${ticker}`)
}

export default API;