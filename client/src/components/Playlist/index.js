import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { useQuery, useMutation } from "@apollo/client";
import { SINGLE_TRIP } from "../../utils/queries";
import { ADD_PLAYLIST, DELETE_PLAYLIST } from "../../utils/mutations";

// material imports
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import Input from "@material-ui/core/Input";
import Link from '@material-ui/core/Link';

import spotifyImg from '../../assets/images/spotify_badge.svg';

const Playlist = params => {
    const { id: roadtripId } = useParams();

    // mutations and queries
    const { loading, data } = useQuery(SINGLE_TRIP, {
        variables: { 
                id: roadtripId
        },
    });

    const [deletePlaylist] = useMutation(DELETE_PLAYLIST);
    const [addPlaylist] = useMutation(ADD_PLAYLIST);

    // state for url

    const playlist = data.roadtrip.playlist;

    const [formState, setFormState] = useState({ url: '' });

    // modal open and close

    const [open, setOpen] = useState(false);

    const handleOpen = async event => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // material UI styles for modal and grid

    const useStyles = makeStyles(theme => ({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: "center",
            color: theme.palette.text.secondary,
            margin: 5,
        },
        modal: {
            width: 400,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            borderRadius: "12px",
        },
        modalParent: {
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
        },
        form: {
            minWidth: 350,
        },
    }));

    // delete expense

    const handleDelete = async event => {
        console.log(roadtripId)
        try {
            await deletePlaylist({
                variables: { 
                    _id: roadtripId },
            });

            window.location.reload(false);
        } catch (error) {
            console.error(error);
        }
    };

    // form changes

    const handleChange = event => {
        const { name, value } = event.target;

        setFormState({ ...formState, [name]: value });
    };

    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            await deletePlaylist({
                variables: {
                    _id: roadtripId
                }
            })
        }   catch (error) {
        console.log(error);
        }

        try {
            console.log(formState, roadtripId)
            await addPlaylist({
                variables: {
                    playlist: formState.url,
                    roadtripId: roadtripId,
                }
            });

            window.location.reload(false);
        } catch (error) {
            console.log(error);
        }
    };

    const classes = useStyles();

    if (loading) {
        return <div>Loading...</div>;
    }

    // modal body

    const body = (
        <div className={classes.modal}>
            <form className={classes.form} onSubmit={handleFormSubmit}>
                <Input
                    className="modalInput"
                    id="url"
                    name="url"
                    placeholder="Playlist URL"
                    onChange={handleChange}
                />
                <br></br>
                <button className="submitBtn" type="submit">
                    Add
				</button>
            </form>
        </div>
    );

    return (

        <div className='roadtripCard'>
            <h4>Playlist</h4>
            <div className={classes.root}>
                <Grid
                    container
                    justifyContent="center"
                    spacing={3}>
                    <Grid item xs={12} className='playlistItem'>
                        <div className='playlistItem' key={roadtripId}>
                            {playlist && 
                                <>
                                <Grid item xs={12} sm={12}>
                                    <Paper className={classes.paper}>
                                        <Link to={playlist}><img src={spotifyImg}></img></Link>
                                        <br></br>
                                        <button onClick={handleDelete} className='smallBtn'>Remove Playlist</button>
                                    </Paper>
                                </Grid>
                                </>
                            }
                        </div>
                        <button className='submitBtn'>
                            <Link onClick={handleOpen}>Add Playlist</Link>
                        </button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            className={classes.modalParent}
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                        >
                            {body}
                        </Modal>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Playlist;