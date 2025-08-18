import axios from "axios"

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
}) 

export const getAuthHeaders = ()=>{
  const token = localStorage.getItem('token');
  return {
    Authorization: `Bearer ${token}`,
  };
}

export default api;