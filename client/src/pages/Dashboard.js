import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

// Material UI imports
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const logo = require('../assets/images/logo.png');

const useStyles = makeStyles({
    root: {
        maxWidth: 500
    },
});

const Dashboard = () => {
    const classes = useStyles();

    return (
        <div className='dashboard'>
            {Auth.loggedIn() ? (
                <>
                    <h1>Welcome to On The Road!</h1>
                    <Link to="/roadtrips">
                        My Roadtrips
                            </Link>
                </>
            ) : (
                    <>
                        <Grid
                            container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justify="center"
                            style={{ minHeight: '100vh' }}
                        >
                            <Box class='newSignUp'>

                                <div className={classes.root}>
                                    <div>
                                        <div>
                                            <img src={logo.default} alt='site logo'></img>
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
                                    <div class='signupBtn'>
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