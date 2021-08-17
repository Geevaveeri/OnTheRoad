import React from 'react';
import { useParams, Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { SINGLE_TRIP } from '../../utils/queries';

// material imports
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import spotifyImg from '../../assets/images/spotify_badge.svg'

const Playlist = params => {
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

    const playlist = data.roadtrip.playlist || {};

    return (

        <div className='roadtripCard'>
            <h4>Playlist</h4>
            <div className={classes.root}>
                <Grid
                    container
                    justifyContent="center"
                    spacing={3}>
                    <Grid item xs={12} className='playlistItem'>
                            <div className='playlistItem' key={playlist._id}>
                                <Grid item xs={12} sm={12}>
                                    <Paper className={classes.paper}>
                                        <Link to={playlist}><img src={spotifyImg}></img></Link>
                                        <br></br>
                                        <button className='smallBtn'>Remove Playlist</button>
                                    </Paper>
                                </Grid>
                            </div>
                        <button className='submitBtn'>
                            <Link to={`/roadtrip/:id/addPlaylist`}>Add Playlist</Link>
                        </button>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Playlist;