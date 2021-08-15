import React from 'react';
import { useParams, Link } from 'react-router-dom';
import DoughnutChart from '../Chart';

import { useQuery } from '@apollo/client';
import { SINGLE_TRIP } from '../../utils/queries';
import { ADD_EXPENSE, DELETE_EXPENSE } from '../../utils/mutations';

// material imports
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const Expenses = params => {

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

    const expenses = data.roadtrip.expenses || [];

    return(
    <div className='roadtripCard'>
        <h4>Expenses</h4>
        <DoughnutChart/>
        <Grid item xs={12}>
            {expenses && expenses.map(expense => (
                <div key={expense._id}>
                    <Grid item xs={6} sm={3}>
                        <Paper className={classes.paper}>{expense.username}
                            <button className='smallBtn'>Edit</button>
                        </Paper>
                    </Grid>
                </div>
            ))}
            <button className='submitBtn'>
                <Link to={`/roadtrip/:id/addExpense`}>Add User</Link>
            </button>
        </Grid>
    </div>
    );
}

export default Expenses;