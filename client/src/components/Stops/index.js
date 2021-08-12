import React from 'react';
import { useParams, Link } from 'react-router-dom';

import { useQuery } from '@apollo/react-hooks';
import { SINGLE_TRIP } from '../../utils/queries';

import { Grid } from '@material-ui/core';

const Stops = params => {
    const { id: roadtripId } = useParams();

    const { loading, data } = useQuery(SINGLE_TRIP, {
        variables: { id: roadtripId }
    });


    if (loading) {
        return <div>Loading...</div>;
    }

    const stops = data.roadtrip.stops || {};

    return (
        <div>
            <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="flex-start"
            >
                <div>
                    <div className='roadtripCard stopList'>
                        <h4>Stops</h4>
                        {stops && stops.map(stop => (
                            <div className='stopItem' key={stop._id}>
                                <p>{stop.lat}</p>
                                <p>{stop.lon}</p>
                                <p>{stop.name}</p>
                                <p>{stop.address}</p>
                                <button className='deleteBtn'>Remove Stop
                                </button>
                            </div>
                        ))}
                        <button className='submitBtn'>
                            <Link to={`/roadtrip/:id/addFriend`}>Add Stop</Link>
                        </button>
                    </div>

                </div>
            </Grid>

        </div>
    );
};

export default Stops;