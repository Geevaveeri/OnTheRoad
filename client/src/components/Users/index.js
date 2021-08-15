import React from 'react';
import { useParams, Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { SINGLE_TRIP } from '../../utils/queries';

// material imports
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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
    }));

    const classes = useStyles();


    if (loading) {
        return <div>Loading...</div>;
    }

    const users = data.roadtrip.users || [];

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
                                        <button className='smallBtn'>Remove User</button>
                                    </Paper>
                                </Grid>
                            </div>
                        ))}
                        <button className='submitBtn'>
                            <Link to={`/roadtrip/:id/addUser`}>Add User</Link>
                        </button>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Users;