import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:7010',
  headers: {
    'Content-type': 'application/json',
  },
});
