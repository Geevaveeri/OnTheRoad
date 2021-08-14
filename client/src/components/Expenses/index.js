import React from 'react';
import DoughnutChart from '../Chart';
import { useParams } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/client';
import { SINGLE_TRIP } from '../../utils/queries';
import { ADD_EXPENSE, DELETE_EXPENSE } from '../../utils/mutations';

// material imports
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const Expenses = (params) => {

    // const { id: roadtripId } = useParams();

    // const { loading, data } = useQuery(SINGLE_TRIP, {
    //     variables: { id: roadtripId }
    // });

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

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    // const expenses = data.roadtrip.expenses || [];

    //console.log(expenses);

    return(
    <div className='roadtripCard'>
        <DoughnutChart />
    </div>
    );
}

export default Expenses;