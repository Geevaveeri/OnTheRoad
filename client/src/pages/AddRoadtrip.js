import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_TRIP } from '../utils/mutations';
import { Input } from '@material-ui/core';

const AddRoadtrip = () => {
    const [formState, setFormState] = useState({ name: '' });

    const [addRoadtrip, { error }] = useMutation(ADD_TRIP);

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
            const { data } = await addRoadtrip({
                variables: { ...formState }
            });

            console.log(data);
            window.location.replace('/')
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className="login">
            <div>
                <form onSubmit={handleFormSubmit}>
                    <Input
                        placeholder='Trip Name'
                        name='name'
                        type='name'
                        id='name'
                        value={formState.name}
                        onChange={handleChange}
                    />
                    <br></br>
                    <button className='submitBtn' type='submit'>
                        Create
                    </button>
                </form>

                {error && <div>Add trip failed, please try again!</div>}
            </div>
        </section>
    );
};

export default AddRoadtrip;