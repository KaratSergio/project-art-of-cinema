import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: '6167a2fbe619d64566c427d4bc6ed1cb',
  },
});

export const fetchData = async (url, params) => {
  try {
    const response = await instance.get(url, { params });
    return response.data;
  } catch (error) {
    console.error(`Error fatching data from ${url}:`, error);
    throw new Error('Failed to fetch data');
  }
};
