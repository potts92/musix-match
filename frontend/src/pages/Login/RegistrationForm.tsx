import React, { useState, useMemo } from 'react'
import axios from 'axios';
import Select from 'react-select';
import CountryList from 'react-select-country-list';

const RegistrationForm: React.FC = () => {
    const [inputs, setInputs] = useState({
        name: '',
        username: '',
        password: '',
    }); //form inputs
    const [country, setCountry] = useState(''); //selected country
    const options = useMemo(() => CountryList().getData(), []); //country list

    /**
     * Handles input change
     * @param e
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    };

    /**
     * Handles country change
     * @param option
     */
    const handleCountryChange = (option: any) => {
        setCountry(option.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const payload = { ...inputs, country };
            await axios.post('http://localhost:3001/api/auth/register', payload);
            window.location.reload();
        } catch (error: any) {
            if(error?.response?.status === 400) {
                return alert(error?.response?.data);
            } else if(error?.response?.status === 500) {
                return alert('An error occurred during registration.');
            } else {
                console.error(error?.response?.data);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" value={inputs.name} onChange={handleChange} required />
            <input type="text" name="username" placeholder="Username" value={inputs.username} onChange={handleChange} required />
            <Select options={options} onChange={handleCountryChange} />
            <input type="password" name="password" placeholder="Password" value={inputs.password} onChange={handleChange} required />
            <button type="submit">Register</button>
        </form>
    );
};

export default RegistrationForm;