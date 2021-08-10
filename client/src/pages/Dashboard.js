import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

// Material UI imports
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
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

    const logout = event => {
        event.preventDefault();
        Auth.logout();
    };

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

                                <Card className={classes.root}>
                                    <CardActionArea>
                                        <div>
                                            <img src={logo.default}></img>
                                        </div>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                New to On The Road?
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                Join and create your first road trip today!
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Grid item xs={12}>
                                            <Link to="/signup">Sign Up</Link>
                                        </Grid>
                                    </CardActions>
                                </Card>
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