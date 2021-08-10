import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

import logo from '../../assets/images/logo.png';

// imports from Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 300,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});


const RoadtripList = ({ roadtrips }) => {
    const classes = useStyles();

    if (!roadtrips.length) {
        return (
            <h3>No Roadtrips Yet!</h3>
        )
    }

    return (
        <div>
            <>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '100vh' }}
                >
                    <Box className='newSignUp'>

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
                            <div className='signupBtn'>
                                <Grid item xs={12}>
                                    <Link to="/signup">Sign Up</Link>
                                </Grid>
                            </div>
                        </div>
                    </Box>
                </Grid>
            </>
        </div>
    )
}

export default RoadtripList;