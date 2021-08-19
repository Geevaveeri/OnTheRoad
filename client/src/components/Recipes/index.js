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

import chefImg from '../../assets/images/chef.png';
const Recipes = () => {

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

    const classes = useStyles();

    // modal body

    const body = (
        <div className={classes.modal}>
            <h3>Uh oh!</h3>
            <br></br>
            <h4>What are you trying to do? This isn't a recipe app!</h4>
            <img id='chef-image' src={chefImg} alt='chef otter'></img>
                <br></br>
                <button className="submitBtn" onClick={handleClose}>
                    Exit
				</button>
        </div>
    );

    return (

        <div className='roadtripCard'>
            <h4>Recipes</h4>
            <div className={classes.root}>
                <Grid
                    container
                    justifyContent="center"
                    spacing={3}>
                    <Grid item xs={12} className='playlistItem'>
                        <button className='submitBtn'>
                            <Link onClick={handleOpen}>Add Recipe</Link>
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

export default Recipes;