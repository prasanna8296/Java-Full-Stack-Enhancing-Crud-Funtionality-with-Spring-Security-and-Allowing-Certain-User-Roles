import React, { useEffect, useState } from 'react';
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeComponent = () => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({ firstname: '', lastname: '', email: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setFirstName(response.data.firstname);
          setLastName(response.data.lastname);
          setEmail(response.data.email);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  const saveOrUpdateEmployee = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const employee = { firstname, lastname, email };
      if (id) {
        updateEmployee(id, employee)
          .then(() => navigate('/employees'))
          .catch((error) => console.error(error));
      } else {
        createEmployee(employee)
          .then(() => navigate('/employees'))
          .catch((error) => console.error(error));
      }
    }
  };

  const validateForm = () => {
    let valid = true;
    const errorsCopy = { ...errors };

    if (!firstname.trim()) {
      errorsCopy.firstname = 'First name is required';
      valid = false;
    } else {
      errorsCopy.firstname = '';
    }

    if (!lastname.trim()) {
      errorsCopy.lastname = 'Last name is required';
      valid = false;
    } else {
      errorsCopy.lastname = '';
    }

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      errorsCopy.email = 'Valid email is required';
      valid = false;
    } else {
      errorsCopy.email = '';
    }

    setErrors(errorsCopy);
    return valid;
  };

  const pageTitle = () => id ? <h2 className='text-center'>Update Employee</h2> : <h2 className='text-center'>Add Employee</h2>;

  return (
    <div className='container'>
      <br />
      <br />
      <div className='row'>
        <div className='card col-md-6 offset-md-3'>
          {pageTitle()}
          <div className='card-body'>
            <form onSubmit={saveOrUpdateEmployee}>
              <div className='form-group mb-2'>
                <label className='form-label'>First Name:</label>
                <input
                  type='text'
                  placeholder='Enter Employee First Name'
                  name='firstname'
                  value={firstname}
                  className={`form-control ${errors.firstname ? 'is-invalid' : ''}`}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstname && <div className='invalid-feedback'>{errors.firstname}</div>}
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'>Last Name:</label>
                <input
                  type='text'
                  placeholder='Enter Employee Last Name'
                  name='lastname'
                  value={lastname}
                  className={`form-control ${errors.lastname ? 'is-invalid' : ''}`}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastname && <div className='invalid-feedback'>{errors.lastname}</div>}
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'>Email:</label>
                <input
                  type='text'
                  placeholder='Enter Employee Email'
                  name='email'
                  value={email}
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
              </div>
              <button type='submit' className='btn btn-success'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
