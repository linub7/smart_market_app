import axios from 'axios';

export const BASE_URL = `http://10.0.2.2:5000/api/v1`;

const client = axios.create({
  baseURL: BASE_URL,
});

export default client;
