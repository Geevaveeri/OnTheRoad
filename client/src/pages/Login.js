import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN_USER } from '../utils/mutations'
import { Input } from '@material-ui/core';

import Auth from '../utils/auth';

const Login = props => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN_USER);

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
            const { data } = await login({
                variables: { ...formState }
            });

            Auth.login(data.login.token);
        } catch (error) {
            console.error(error);
        }

        setFormState({
            email: '',
            password: ''
        });
    };

    return (
        <section>
            <div>
                <h4>
                    Login
                </h4>
                <form onSubmit={handleFormSubmit}>
                    <Input 
                        className=''
                        placeholder='Email Address'
                        name='email'
                        type='email'
                        id='email'
                        value={formState.email}
                        onChange={handleChange}
                    />
                    <Input 
                        className=''
                        placeholder='********'
                        name='password'
                        type='password'
                        id='password'
                        value={formState.password}
                        onChange={handleChange}
                    />
                    <button className='' type='submit'>
                        Login
                    </button>
                </form>

                {error && <div>Login failed, please check your email and password!</div>}
            </div>
        </section>
    );
};

export default Login;