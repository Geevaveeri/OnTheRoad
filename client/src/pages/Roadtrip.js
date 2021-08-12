import React from 'react';
import { useParams, Link } from 'react-router-dom';

import { useQuery } from '@apollo/react-hooks';
import { SINGLE_TRIP } from '../utils/queries';

import { Grid } from '@material-ui/core';

import logo from '../assets/images/logo.png';

import Users from '../components/Users';
import Stops from '../components/Stops';

const SingleRoadtrip = params => {
    const { id: roadtripId } = useParams();

    const { loading, data } = useQuery(SINGLE_TRIP, {
        variables: { id: roadtripId }
    });


    if (loading) {
        return <div>Loading...</div>;
    }

    const roadtrip = data.roadtrip || {};

    return (
        <div className='dashboard'>
            <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="flex-start"
            >
                <div>

                    <Grid item xs={12} s={6}><h2>{roadtrip.name}</h2></Grid>
                    <h5>Playlist: {roadtrip.playlist}</h5>
                    {/* users */}
                    <Users
                        roadtripId={roadtrip._id}>
                    </Users>
                    {/* stops */}
                    <Stops
                        roadtripId={roadtrip._id}>
                    </Stops>
                    {/* expenses component */}
                    {/* gallery component */}
                    <div>
                        <img src={logo} alt='site logo'></img>
                    </div>
                </div>
            </Grid>

        </div>
    );
};

export default SingleRoadtrip;