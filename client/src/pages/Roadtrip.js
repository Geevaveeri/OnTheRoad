import React from 'react';
import { useParams, Link } from 'react-router-dom';

import { useQuery } from '@apollo/react-hooks';
import { SINGLE_TRIP } from '../utils/queries';

import { Grid } from '@material-ui/core';

import logo from '../assets/images/logo.png';

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
                    <div>
                        <img src={logo} alt='site logo'></img>
                    </div>
                    <Grid item xs={12} s={6}><h2>{roadtrip.name}</h2></Grid>
                    <div className='userList'>
                        <h4>Users</h4>
                        {roadtrip.users && roadtrip.users.map(user => (
                            <div className='userItem' key={user._id}>
                                <p>{user.username}</p>
                                <button className='deleteBtn'>Remove User
                                </button>
                            </div>
                        ))}
                        <button className='submitBtn'>
                            <Link to={`/roadtrip/:id/addFriend`}>Add User</Link>
                        </button>
                    </div>
                    <div className='stopList'>
                        {roadtrip.stops.map(stop => (
                            <div className='stopItem' key={stop._id}>
                                <p>{stop.lat}</p>
                                <p>{stop.lon}</p>
                                <p>{stop.name}</p>
                                <p>{stop.address}</p>
                                <button className='deleteBtn'>Delete Stop
                                </button>
                            </div>

                        ))}
                        <button className='submitBtn'>
                            <Link to={`/roadtrip/:id/addStop`}>Add Stop</Link>
                        </button>
                    </div>
                    <div className='expensesList'>
                        {roadtrip.expenses.map(user => (
                            <div className='userItem' key={user._id}>
                                <p>{user.username}</p>
                                <button className='deleteBtn'>Delete Expense
                                </button>
                            </div>

                        ))}
                        <button className='submitBtn'>
                            <Link to={`/roadtrip/:id/addFriend`}>Add Expense</Link>
                        </button>
                    </div>

                </div>
            </Grid>

        </div>
    );
};

export default SingleRoadtrip;