import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/employees';

// Get the token from localStorage
const getAuthHeader = () => {
  return { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } };
}

export const listEmployees =() => {
    return axios.get(REST_API_BASE_URL, getAuthHeader());
}

export const createEmployee =(employee) =>axios.post(REST_API_BASE_URL, employee, getAuthHeader());

export const getEmployee=(employeeId)=>axios.get(`${REST_API_BASE_URL}/${employeeId}`, getAuthHeader());

export const updateEmployee=(employeeId, employee) =>axios.put(`${REST_API_BASE_URL}/${employeeId}`, employee, getAuthHeader());

export const deleteEmployee = async (id) => {
    try {
        const response = await axios.delete(`/api/employees/${id}`);
        return response.status === 204; // No Content status code
    } catch (error) {
        console.error('Error deleting employee:', error);
        return false;
    }
};

