import React from 'react';
import axios from 'axios';

const LogoutButton: React.FC = () => {
    /**
     * Logout the user and reload the page
     */
    const logout = async () => {
        try {
            await axios.post('http://localhost:3001/api/auth/logout');
            window.location.reload();
        } catch (error: any) {
            if (error?.response?.status === 500) return alert('An error occurred during logout.');
            else console.error(error?.response?.data);
        }
    }
    return (
        <button onClick={logout}>Logout</button>
    );
}

export default LogoutButton;