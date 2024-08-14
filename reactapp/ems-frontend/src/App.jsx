import './App.css';
import EmployeeComponent from './component/EmployeeComponent';
import HeaderComponent from './component/HeaderComponent';
import ListEmployeeComponent from './component/ListEmployeeComponent';
import LoginPage from './component/LoginPage';
import RegisterPage from './component/RegisterPage';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

function App() {

  const isAuthenticated = () => {
    return !!localStorage.getItem('token'); // Check if token exists
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={isAuthenticated() ? <Navigate to="/employees" /> : <Navigate to="/login" />} />
        <Route path='/login' element={!isAuthenticated() ? <LoginPage /> : <Navigate to="/employees" />} />
        <Route path='/register' element={!isAuthenticated() ? <RegisterPage /> : <Navigate to="/employees" />} />
        <Route path='/employees' element={isAuthenticated() ? (
          <>
            <HeaderComponent />
            <ListEmployeeComponent />
          </>
        ) : <Navigate to="/login" />} />
        <Route path='/add-employee' element={isAuthenticated() ? (
          <>
            <HeaderComponent />
            <EmployeeComponent />
          </>
        ) : <Navigate to="/login" />} />
        <Route path='/edit-employee/:id' element={isAuthenticated() ? (
          <>
            <HeaderComponent />
            <EmployeeComponent />
          </>
        ) : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
