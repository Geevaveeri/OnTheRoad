import React from 'react';
import { useParams, Link } from 'react-router-dom';

import { useQuery } from '@apollo/react-hooks';
import { SINGLE_TRIP } from '../utils/queries';

import { Grid } from '@material-ui/core';

import logo from '../assets/images/logo.png';

import Users from '../components/Users';
import Stops from '../components/Stops';
import Playlist from '../components/Playlist';
import Expenses from '../components/Expenses';
import Gallery from '../components/Gallery';

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
            <h1>{roadtrip.name}</h1>

            <Playlist
                roadtripId={roadtrip._id}>
            </Playlist>

            <Users
                roadtripId={roadtrip._id}>
            </Users>

            <Stops
                roadtripId={roadtrip._id}>
            </Stops>

            <Gallery
                roadtripId={roadtrip._id}>
            </Gallery>

            <Expenses
                roadtripId={roadtrip._id}>
            </Expenses>
            <div>
                <img src={logo} alt='site logo'></img>
            </div>

        </div>
    );
};

export default SingleRoadtrip;