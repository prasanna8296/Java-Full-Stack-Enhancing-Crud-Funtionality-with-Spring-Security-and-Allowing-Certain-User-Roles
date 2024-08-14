import axios from 'axios';

const AUTH_API_BASE_URL = 'http://localhost:8080/api/auth'; // Replace with your actual API base URL

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${AUTH_API_BASE_URL}/login`, { username, password });
    const { token, role } = response.data; // Ensure `role` is included in response data

    // Save token and role in localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', role);
// Example: After successful login
localStorage.setItem('role', response.data.role);  // Ensure 'role' is the correct key and value

    return { token, role }; // Return token and role
  } catch (error) {
    console.error('Login failed', error);
    throw new Error('Authentication failed');
  }
};

export const registerUser = async (username, email, password) => {
  try {
    await axios.post(`${AUTH_API_BASE_URL}/register`, { username, email, password });
  } catch (error) {
    console.error(error);
    throw new Error('Registration failed');
  }
};

export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userRole');
};
