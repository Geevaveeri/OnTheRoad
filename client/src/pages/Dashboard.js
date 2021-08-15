import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

import RoadtripList from '../components/RoadtripList';
import logo from '../assets/images/logo.png';

// queries and mutations
import { GET_ME } from '../utils/queries';
import { useQuery } from '@apollo/client';

const Dashboard = () => {
    const { loading, data } = useQuery(GET_ME);
const ref = useRef();
    const user = data?.me || {};

    return (
        <div className='dashboard'>


            {Auth.loggedIn() ? (
                <>
                    <div>
                        <div>
                            <h1>Welcome, {user.username}!</h1>
                            <div>
                                {loading ? (
                                    <div>Loading...</div>
                                ) : (
                                        <div>
                                            <RoadtripList
                                                user={user}>
                                            </RoadtripList>
                                        </div>
                                    )}
                            </div>
                        </div>
                        <div className='submitBtn'>
                                <Link to="/addTrip">Add New Roadtrip</Link>
                        </div>
                    </div>
                </>
            ) : (
                    <>
                        <div>
                            <div>
                                <div>
                                    <img src={logo} alt='site logo'></img>
                                </div>
                                <h2>New to On The Road?</h2>
                                <p>Join and create your first road trip today!</p>
                            </div>
                            <div className='submitBtn'>
                                    <Link to="/signup">Sign Up</Link>
                            </div>
                        </div>
                    </>
                )}
        </div>
    );
};

export default Dashboard;

// ** NOT LOGGED IN **
// Welcome/About
// Sign Up

// ** LOGGED IN **
// My Roadtrips
    // Add a New Roadtrip
// My Profile
    // edit my profile