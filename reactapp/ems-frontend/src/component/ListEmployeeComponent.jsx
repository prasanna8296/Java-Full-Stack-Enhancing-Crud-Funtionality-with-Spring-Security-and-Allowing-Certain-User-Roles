import React, { useState, useEffect } from 'react';
import { deleteEmployee, listEmployees } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Retrieve the user's role from localStorage
  const userRole = localStorage.getItem('role');  // Ensure this is correctly set

  useEffect(() => {
    getAllEmployees();
  }, []);

  const getAllEmployees = () => {
    listEmployees()
      .then((response) => setEmployees(response.data))
      .catch((error) => {
        setError('Failed to fetch employee data');
        console.error(error);
      });
  };

  const addNewEmployee = () => navigate('/add-employee');
  const updateEmployee = (id) => navigate(`/edit-employee/${id}`);
  const removeEmployee = (id) => {
    // Check if userRole is admin before attempting to delete
    if (userRole === 'admin') {
      deleteEmployee(id)
        .then(() => getAllEmployees())
        .catch((error) => {
          console.error(error);
          setError('Failed to delete employee');
        });
    } else {
      alert('You do not have permission to delete employees.');
    }
  };

  return (
    <div className='container'>
      <h2 className='text-center'>List Of Employees</h2>
      {userRole === 'admin' && (
        <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>
      )}
      {error && <div className='alert alert-danger'>{error}</div>}
      <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.firstname}</td>
                <td>{employee.lastname}</td>
                <td>{employee.email}</td>
                <td>
                  <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Update</button>
                  <button
                    className='btn btn-danger'
                    onClick={() => removeEmployee(employee.id)}
                    style={{ marginLeft: '10px' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='5'>No employees found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployeeComponent;
