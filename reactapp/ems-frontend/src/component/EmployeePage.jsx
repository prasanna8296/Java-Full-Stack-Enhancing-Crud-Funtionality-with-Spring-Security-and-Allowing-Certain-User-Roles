import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext'; // Custom context for authentication

const EmployeePage = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = useAuth(); // Retrieve token from context

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('/api/employees', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setEmployees(response.data);
            } catch (err) {
                setError('Failed to fetch employees.');
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, [token]);

    const handleDelete = async (employeeId) => {
        try {
            await axios.delete(`/api/employees/${employeeId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setEmployees(employees.filter(emp => emp.id !== employeeId));
        } catch (err) {
            if (err.response && err.response.status === 403) {
                setError('You are not authorized to delete this employee.');
            } else {
                setError('Failed to delete employee.');
            }
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Employee List</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>
                                <button onClick={() => handleDelete(employee.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeePage;
