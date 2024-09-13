import axios from 'axios';
export const API_SERVER_URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`;

// Create axios instance
const request = axios.create({
  baseURL: API_SERVER_URL,
  withCredentials: true,
});

// Post request Call
export const postRequest = async ({endpoint, payload}) => {
  const response = await request.post(`${API_SERVER_URL}${endpoint}`, payload);

  return response;
};

// Get request Call
export const getRequest = async ({endpoint}) => {
  const response = await request.get(`${API_SERVER_URL}${endpoint}`);

  return response;
};

// Put request Call
export const putRequest = async ({endpoint, payload}) => {
  const response = await request.put(`${API_SERVER_URL}${endpoint}`, payload);

  return response;
};

// Patch request Call
export const patchRequest = async ({endpoint, payload}) => {
  const response = await request.patch(`${API_SERVER_URL}${endpoint}`, payload);

  return response;
};

// Delete Request Call
export const deleteRequest = async ({endpoint}) => {
  const response = await request.delete(`${API_SERVER_URL}${endpoint}`);

  return response;
};
