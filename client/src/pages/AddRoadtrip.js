import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_TRIP } from '../utils/mutations';
import { Input } from '@material-ui/core';

const AddRoadtrip = () => {
    const [formState, setFormState] = useState({ name: '' });
    const [addTrip, { error }] = useMutation(ADD_TRIP);

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
            const { data } = await addTrip({
                variables: { ...formState }
            });

            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className="addTrip">
            <div>
                <form onSubmit={handleFormSubmit}>
                    <Input
                        className=''
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