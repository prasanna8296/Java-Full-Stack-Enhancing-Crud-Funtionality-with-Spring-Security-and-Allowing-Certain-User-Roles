import axios from 'axios';

const AUTH_API_BASE_URL='http://localhost:8080/api/auth';

export const registerUser=(user) =>axios.post(`${AUTH_API_BASE_URL}/register`,user);

export const loginUser=(credentials) =>axios.post(`${AUTH_API_BASE_URL}/login`,credentials);