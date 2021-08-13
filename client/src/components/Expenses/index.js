import React, { useRef } from 'react';
import DoughnutChart from '../Chart';

import { useQuery, useMutation } from '@apollo/client';
import { SINGLE_TRIP } from '../../utils/queries';
import { ADD_EXPENSE, DELETE_EXPENSE } from '../../utils/mutations';

// material imports
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const Expenses = () => {

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

    const ref = useRef();

    return(
    <div className='roadtripCard'>
        <DoughnutChart/>
    </div>
    );
}

export default Expenses;