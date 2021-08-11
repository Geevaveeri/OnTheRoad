import React from 'react';
import { Link } from 'react-router-dom';

// imports from Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
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


const RoadtripList = ({ user }) => {

    const roadtrips = user.roadtrips;

    const classes = useStyles();

    if (!roadtrips || !roadtrips.length) {
        return (
            <h3>No Roadtrips Yet!</h3>
        )
    }

    return (
        <div>
            <>
                <Grid 
                    className='roadtripList'
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
                                {roadtrips.map(trip => (
                                    <Grid key={trip._id} item xs={4}>
                                        <h3>{trip.name}</h3>
                                        <br></br>
                                        <p>{trip.destination}</p>

                                    </Grid>

                                ))}
                            </div>
                        </div>
                    </Box>
                </Grid>
            </>
        </div>
    )
};

export default RoadtripList;