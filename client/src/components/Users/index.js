import React from 'react';
import { useParams, Link } from 'react-router-dom';

import { useQuery } from '@apollo/react-hooks';
import { SINGLE_TRIP } from '../../utils/queries';

import { Grid } from '@material-ui/core';

const Users = params => {
    const { id: roadtripId } = useParams();

    const { loading, data } = useQuery(SINGLE_TRIP, {
        variables: { id: roadtripId }
    });


    if (loading) {
        return <div>Loading...</div>;
    }

    const users = data.roadtrip.users || {};

    return (
        <div>
            <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="flex-start"
            >
                <div>
                    <div className='roadtripCard userList'>
                        <h4>Users</h4>
                        {users && users.map(user => (
                            <div className='userItem' key={user._id}>
                                <p>{user.username}</p>
                                <button className='deleteBtn'>Remove User
                                </button>
                            </div>
                        ))}
                        <button className='submitBtn'>
                            <Link to={`/roadtrip/:id/addFriend`}>Add User</Link>
                        </button>
                    </div>

                </div>
            </Grid>

        </div>
    );
};

export default Users;