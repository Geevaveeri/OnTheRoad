import React, { useMemo } from 'react';

const RoadtripList = ({ user }) => {
    const roadtrips = user.roadtrips;

    if (!roadtrips || !roadtrips.length) {
        return (
            <h3>No Roadtrips Yet!</h3>
        )
    }

    return (
        <div>
            <>
                <section>
                    <div>
                        <div>
                            <h3>
                                My Roadtrips
                            </h3>
                            {roadtrips.map(trip => (
                                <div className='roadtripItem' key={trip._id}>
                                    <h3>{trip.name}</h3>
                                    <br></br>
                                    <p>{trip.destination}</p>
                                    <button class="submitBtn">Open</button>
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