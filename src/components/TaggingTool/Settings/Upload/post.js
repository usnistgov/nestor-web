import axios from 'axios';
export const upload = (endpoint, data) => {
    return axios.post(endpoint, data, {})
  };
  