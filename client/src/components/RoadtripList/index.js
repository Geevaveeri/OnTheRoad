import React from 'react';

import { useMutation } from '@apollo/react-hooks';
import { DELETE_TRIP } from '../../utils/mutations';

const RoadtripList = ({ user }) => {
    const roadtrips = user.roadtrips;
    console.log(roadtrips);

    const [deleteRoadTrip] = useMutation(DELETE_TRIP);

    const handleClick = async (event) => {
        try {
            await deleteRoadTrip({
                variables: { id: event.target.id }
            });
        } catch (error) {
            console.error(error);
        }
    };

    if (!roadtrips || !roadtrips.length) {
        return (
            <h3>No Roadtrips Yet!</h3>
        )
    }

    return (
        <div className='roadtripList'>
            <>
                <section>
                    <div>
                        <div>
                            <h3>
                                My Roadtrips
                                </h3>
                            {roadtrips.map(trip => (
                                <div className='roadtripItem' key={trip._id}>
                                    <h4>{trip.name}</h4>
                                    <p>{trip.users}</p>
                                    <button id={trip._id} onClick={handleClick} className="deleteBtn">Delete</button>
                                </div>

                            ))}
                        </div>
                    </div>
                </section>
            </>
        </div>
    )
};

export default RoadtripList;