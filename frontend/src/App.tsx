import React, { useState } from 'react';
import './App.css';
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";

function App() {
    const [showRegistration, setShowRegistration] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const handleRegisterClick = () => {
        setShowRegistration(true);
        setShowLogin(false);
    }

    const handleLoginClick = () => {
        setShowRegistration(false);
        setShowLogin(true);
    }

    return (
        <div>
            <p>Please login or register to continue</p>
            <button onClick={handleRegisterClick}>Register</button>
            <button onClick={handleLoginClick}>Login</button>

            {showRegistration && <RegistrationForm />}
            {showLogin && <LoginForm />}
        </div>
    );
}

export default App;
