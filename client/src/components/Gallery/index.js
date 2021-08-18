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

import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
// import DeleteIcon from '@material-ui/icons/Delete';

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
        imageRoot: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
        },
        imageList: {
            flexWrap: 'nowrap',
            transform: 'translate(0)',
        },
        title: {
            color: theme.palette.primary.lighter,
          },
        titleBar: {
            background:
                'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
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
            <div className={classes.imageRoot}>
                <ImageList className={classes.imageList} cols={2.5}>
                    {images.map((item) => (
                        <ImageListItem key={item._id}>
                            <img src={item.url} alt='uploaded by user' />
                            <ImageListItemBar
                                title={item.title}
                                classes={{
                                    root: classes.titleBar
                                }}
                                actionIcon={
                                        <button className='smallBtn' id={item._id} onClick={handleDeleteImage}>Delete</button>
                                }
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </div>
            <CloudinaryUploadWidget roadtripId={roadtripId} />
        </div>
    );
};

export default Gallery;