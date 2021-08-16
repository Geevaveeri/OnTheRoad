import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/client';
import { SINGLE_TRIP } from '../../utils/queries';
import { ADD_USER, REMOVE_USER } from '../../utils/mutations';

// material imports
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';

const Users = params => {
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
        modal: {
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        modalParent: {
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
        }
    }));

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [searchValue, setSearchValue] = useState({ username: '' });
    const [addUser, { error }] = useMutation(ADD_USER);
    const [removeUser] = useMutation(REMOVE_USER);

    const handleChange = event => {
        const { name, value } = event.target;

        setSearchValue({ ...searchValue, [name]: value })
    }

    const handleUserSearch = async () => {
        try {
            await addUser({
                variables: { username: searchValue.username, _id: roadtripId }
            })

            window.location.reload(false);
        }
        catch (error) {
            console.log(error);
        }

    }

    const handleRemoveUser = async event => {
        try {
            await removeUser({
                variables: { userId: event.target.id, _id: roadtripId }
            })

            window.location.reload(false);
        }
        catch (err) {
            console.log(err);
        }
    }

    const classes = useStyles();


    if (loading) {
        return <div>Loading...</div>;
    }

    const users = data.roadtrip.users || [];

    const body = (
        <div className={classes.modal}>
            <div>
                <TextField id="username" name="username" label="Search User" onChange={handleChange} />
                <br></br>
                <button className='submitBtn' onClick={handleUserSearch}>Search User</button>
            </div>

        </div>
    )

    return (

        <div className='roadtripCard'>
            <h4>Users</h4>
            <div className={classes.root}>
                <Grid
                    container
                    justifyContent="center"
                    spacing={3}>
                    <Grid item xs={12} className='userList'>
                        {users && users.map(user => (
                            <div className='userItem' key={user._id}>
                                <Grid item xs={6} sm={3}>
                                    <Paper className={classes.paper}>{user.username}
                                        <button className='smallBtn' id={user._id} onClick={handleRemoveUser}>Remove User</button>
                                    </Paper>
                                </Grid>
                            </div>
                        ))}
                        <button
                            type="button"
                            className='submitBtn'
                            onClick={handleOpen}>
                            Add User
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

export default Users;