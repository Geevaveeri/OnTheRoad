import React from 'react';
import { useParams, Link } from 'react-router-dom';

import { useQuery } from '@apollo/react-hooks';
import { SINGLE_TRIP } from '../../utils/queries';

// material imports
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const Stops = params => {
    const { id: roadtripId } = useParams();

    const { loading, data } = useQuery(SINGLE_TRIP, {
        variables: { id: roadtripId }
    });

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }));

    const classes = useStyles();


    if (loading) {
        return <div>Loading...</div>;
    }

    const stops = data.roadtrip.stops || [];

    return (

        <div className='roadtripCard'>
            <h4>Stops</h4>
            <div className={classes.root}>
                <Grid
                    container
                    justifyContent="center"
                    spacing={3}>
                    <Grid item xs={12} className='userList'>
                        {stops && stops.map(stop => (
                            <div className='userItem' key={stop._id}>
                                <Grid item xs={6} sm={3}>
                                    <Paper className={classes.paper}>{stop.username}
                                        <button className='smallBtn'>Remove Stop</button>
                                    </Paper>
                                </Grid>
                            </div>
                        ))}
                        <button className='submitBtn'>
                            <Link to={`/roadtrip/:id/addStop`}>Add Stop</Link>
                        </button>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Stops;