import React from 'react';
import { useParams, Link } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/client';
import { SINGLE_TRIP } from '../../utils/queries';
import { DELETE_IMAGE } from '../../utils/mutations';

import CloudinaryUploadWidget from '../../utils/CloudinaryUploadWidget';

// material imports
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const Gallery = params => {
    const { id: roadtripId } = useParams();

    const { loading, data } = useQuery(SINGLE_TRIP, {
        variables: { id: roadtripId }
    });

    const [deleteImage] = useMutation(DELETE_IMAGE);

    const handleDeleteImage = async event => {
        try {
            await deleteImage({
                variables: {
                    _id: roadtripId,
                    imageId: event.target.id
                }
            })

            // window.location.reload(false);
        }
        catch (err) {
            console.log(err);
        }
    }

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
                                    <Paper className={classes.paper}>
                                        <img src={image.url} alt={image.alt} />
                                        <p>posted by: {image.username}</p>
                                        <button className='smallBtn' id={image._id} onClick={handleDeleteImage}>Delete Image</button>
                                    </Paper>
                                </Grid>
                            </div>
                        ))}
                        {/* <button className='submitBtn'>
                            <Link to={`/roadtrip/:id/upload`}>Upload</Link>
                        </button> */}
                        <CloudinaryUploadWidget roadtripId={roadtripId} />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Gallery;