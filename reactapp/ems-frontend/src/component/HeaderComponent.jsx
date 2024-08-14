import React from 'react';

const HeaderComponent = () => {
    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear token
        window.location.href = '/login'; // Redirect to login page
    };

    return (
        <header>
            <nav className="navbar navbar-dark bg-dark ">
                <a className="navbar-brand " href="#">
                    Employee Management System
                </a>
                <ul className="navbar-nav ml-auto" style={{ paddingRight: '2rem' }}> {/* Adds space between right corner and logout */}
                    <li className="nav-item">
                        <button 
                            onClick={handleLogout} 
                            className="nav-link btn btn-link text-white"
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default HeaderComponent;
