import React, {useEffect, useState} from "react";
import axios from "axios";
import LogoutButton from "./LogoutButton";
import LoginPage from "../Login/LoginPage";
import {Link} from "react-router-dom";
//todo: work out why alias isn't working
import {User} from "../../../../shared/types/users";
// import {User} from "@shared/types/users";

const HomePage: React.FC = () => {
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
                {isLoggedIn && <Link to={`/artists/${user?.country}`}>Check out the top charting artists for {user?.country}</Link>}
            </div>
        </div>
    );
}

export default HomePage;