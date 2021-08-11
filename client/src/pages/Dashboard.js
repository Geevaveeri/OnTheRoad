import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

// Material UI imports
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import RoadtripList from '../components/RoadtripList';

import logo from '../assets/images/logo.png';

// queries and mutations
import { GET_ME } from '../utils/queries';
import { useQuery } from '@apollo/react-hooks';

const useStyles = makeStyles({
    root: {
        maxWidth: 500
    },
});

const Dashboard = () => {
    const { loading, data } = useQuery(GET_ME);

    const user = data?.me || {};

    const classes = useStyles();

    return (
        <div className='dashboard'>
            {Auth.loggedIn() ? (
                <>
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        style={{ minHeight: '100vh' }}
                    >
                        <Box>
                            <div className={classes.root}>
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
                                    <Grid item xs={12}>
                                        <Link to="/addTrip">Add New Roadtrip</Link>
                                    </Grid>
                                </div>
                            </div>
                        </Box>
                    </Grid>
                </>
            ) : (
                    <>
                        <Grid
                            container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                            style={{ minHeight: '100vh' }}
                        >
                            <Box className='newSignUp'>

                                <div className={classes.root}>
                                    <div>
                                        <div>
                                            <img src={logo} alt='site logo'></img>
                                        </div>
                                        <div>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                New to On The Road?
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                Join and create your first road trip today!
                                            </Typography>
                                        </div>
                                    </div>
                                    <div className='submitBtn'>
                                        <Grid item xs={12}>
                                            <Link to="/signup">Sign Up</Link>
                                        </Grid>
                                    </div>
                                </div>
                            </Box>
                        </Grid>
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