import React, {useEffect, useState} from 'react';
import './App.css';
import LoginPage from "./components/LoginPage";
import LogoutButton from "./components/LogoutButton";
import axios from "axios";
// import {User} from "@shared/types/users";
import {User} from "../../shared/types/users"; //todo: work out why alias isn't working

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const checkSession = async () => {
            try {
                const user: User = (await axios.get('http://localhost:3001/api/auth/get-user'))?.data;
                setStates(user);
            } catch (error: any) {
                setStates({} as User);
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
     * @param user
     */
    const setStates = (user: User) => {
        const username = user?.username;
        setUser(user ?? null);
        setUsername(username);
        setIsLoggedIn(!!username);
    }

    return (
        <div>
            <h1>Welcome to MusixMatch {isLoggedIn && <LogoutButton/>}</h1>
            <div>
                {!isLoggedIn && <LoginPage/>}
                {isLoggedIn && <h2>You are logged in as {username}</h2>}
                {isLoggedIn && <h3>The top songs in your country ({user?.country}) are</h3>}
            </div>
        </div>
    );
}

export default App;
