import React from 'react';
import { useParams, Link } from 'react-router-dom';

import { useQuery } from '@apollo/react-hooks';
import { SINGLE_TRIP } from '../../utils/queries';

// material imports
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const Gallery = params => {
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

    const images = data.roadtrip.images || [];

    return (

        <div className='roadtripCard'>
            <h4>Gallery</h4>
            <div className={classes.root}>
                <Grid
                    container
                    justifyContent="center"
                    spacing={3}>
                    <Grid item xs={12} className='galleryList'>
                        {images && images.map(image => (
                            <div className='galleryItem' key={image._id}>
                                <Grid item xs={6} sm={3}>
                                    <Paper className={classes.paper}>{image._id}
                                        <img src={image.url} alt={image.alt}/>
                                        <p>posted by: {image.username}</p>
                                        <button className='smallBtn'>Delete Image</button>
                                    </Paper>
                                </Grid>
                            </div>
                        ))}
                        <button className='submitBtn'>
                            <Link to={`/roadtrip/:id/upload`}>Upload</Link>
                        </button>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Gallery;