import React, {useState} from "react";
import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";

const LoginPage: React.FC = () => {
    //by default, show the login form and hide the registration form
    const [showRegistration, setShowRegistration] = useState(false);
    const [showLogin, setShowLogin] = useState(true);

    /**
     * Hide the login form and show the registration form when the user clicks the "Register instead" button
     */
    const handleRegisterClick = () => {
        setShowRegistration(true);
        setShowLogin(false);
    }

    /**
     * Hide the registration form and show the login form when the user clicks the "Login instead" button
     */
    const handleLoginClick = () => {
        setShowRegistration(false);
        setShowLogin(true);
    }

    return (
        <div>
            <h2>Please login or register to continue</h2>
            {showRegistration && <RegistrationForm/>}
            {showLogin && <LoginForm/>}

            {showLogin && <button onClick={handleRegisterClick}>Register instead</button>}
            {showRegistration && <button onClick={handleLoginClick}>Login instead</button>}
        </div>
    );
}

export default LoginPage;