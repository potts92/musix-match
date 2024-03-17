import React, {useState} from 'react'
import axios from 'axios';

const LoginForm: React.FC = () => {
    const [inputs, setInputs] = useState({
        username: '',
        password: '',
    }); //form inputs

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/api/auth/login', inputs);
            window.location.reload();
        } catch (error: any) {
            if (error?.response?.status === 400) {
                return alert(error?.response?.data);
            } else if (error?.response?.status === 500) {
                return alert('An error occurred during login.');
            } else {
                console.error(error?.response?.data);
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="Username" value={inputs.username} onChange={handleChange}
                   required/>
            <input type="password" name="password" placeholder="Password" value={inputs.password}
                   onChange={handleChange} required/>
            <button type="submit">Login</button>
        </form>
    );
}

export default LoginForm;