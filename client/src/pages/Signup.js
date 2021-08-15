import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutations';
import { Input } from '@material-ui/core';

import logo from '../assets/images/logo.png';

import Auth from '../utils/auth';

const Signup = () => {
    const [formState, setFormState] = useState({ username: '', email: '', password: '' });
    const [createUser, { error }] = useMutation(CREATE_USER);

    const handleChange = event => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value
        });
    };

    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            const { data } = await createUser({
                variables: { ...formState }
            });

            console.log(data);

            Auth.login(data.createUser.token);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className='signup'>
            <div>
                <form onSubmit={handleFormSubmit}>
                    <Input
                        placeholder='Username'
                        name='username'
                        type='username'
                        id='username'
                        value={formState.username}
                        onChange={handleChange}
                    />
                    <br></br>
                    <Input
                        placeholder='Email Address'
                        name='email'
                        type='email'
                        id='email'
                        value={formState.email}
                        onChange={handleChange}
                    />
                    <br></br>
                    <Input
                        placeholder='********'
                        name='password'
                        type='password'
                        id='password'
                        value={formState.password}
                        onChange={handleChange}
                    />
                    <br></br>
                    <button className='submitBtn' type='submit'>
                        Sign Up
                    </button>
                </form>
                <img src={logo} alt='site logo'></img>

                {error && <div>Signup failed, please try again!</div>}
            </div>
        </section>
    );
};

export default Signup;