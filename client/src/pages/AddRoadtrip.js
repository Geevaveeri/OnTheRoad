import React, { useState } from 'react';

import { Input } from '@material-ui/core';

import { useMutation } from '@apollo/react-hooks';
import { ADD_TRIP } from '../utils/mutations';

const AddRoadtrip = () => {
    const [formState, setFormState] = useState({ name: '' });
    const [addTrip, {error}] = useMutation(ADD_TRIP);

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

          addTrip(data.setFormState.name);
    
        } catch (error) {
          console.error(error);
        }
      };

    return (
        <section className="addTrip">
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
                    {/* <Input
                        placeholder='Destination'
                        name='destination'
                        type='destination'
                        id='destination'
                        value={formState.destination}
                        onChange={handleChange}
                    />
                    <br></br> */}
                    <button className='addTripBtn' type='submit'>
                        Add Trip
                    </button>
                </form>

                {error && <div>Add trip failed, please try again!</div>}
            </div>
        </section>
    );
};

export default AddRoadtrip;
