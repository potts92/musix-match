import React, {useEffect, useState} from 'react';
import './App.css';
import LoginPage from "./components/LoginPage";
import LogoutButton from "./components/LogoutButton";
import axios from "axios";

//todo: move this to its own file and add session look in to determine if already logged in
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    useEffect(() => {
        const checkSession = async () => {
            try {
                const username = (await axios.get('http://localhost:3001/api/auth/check-session')) || '';
                setStates(username.data);
            } catch (error: any) {
                setStates('');
                if (error?.response?.status === 400) {
                    console.error(error?.response?.data);
                } else if (error?.response?.status === 500) {
                    return alert(`An error occurred during session check: ${JSON.stringify(error)}`);
                } else {
                    console.error(error?.response?.data);
                }
            }
        }

        checkSession();
    }, []);

    /**
     * Set the username and isLoggedIn states
     * @param username
     */
    const setStates = (username: string) => {
        setUsername(username);
        setIsLoggedIn(!!username);
    }

    return (
        <div>
            <h1>Welcome to MusixMatch {username} {isLoggedIn && <LogoutButton/>}</h1>
            <div>
                {!isLoggedIn && <LoginPage/>}
            </div>
        </div>
    );
}

export default App;
