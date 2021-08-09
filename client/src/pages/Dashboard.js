import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

const Dashboard = () => {
    const logout = event => {
        event.preventDefault();
        Auth.logout();
    };

    return (
        <div>

            <header>
                <div>
                    {Auth.loggedIn() ? (
                        <>
                            <h1>
                                Welcome to On The Road!
                            </h1>
                            <Link to="/roadtrips">
                                My Roadtrips
                            </Link>
                            <Link to="/profile">
                                My Profile
                            </Link>
                        </>
                    ) : (
                            <>
                                <h1>Join your first road trip today!</h1>
                                <Link to="/signup">Sign Up</Link>
                            </>
                        )}
                </div>
            </header>
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