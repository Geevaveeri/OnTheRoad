import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import DoughnutChart from '../Chart';

import { useQuery } from '@apollo/client';
import { SINGLE_TRIP } from '../../utils/queries';
//import { ADD_EXPENSE, DELETE_EXPENSE } from '../../utils/mutations';

// material imports
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';


const Expenses = params => {

    const { id: roadtripId } = useParams();

    const { loading, data } = useQuery(SINGLE_TRIP, {
        variables: { id: roadtripId }
    });

    const expenses = data.roadtrip.expenses || [];
    const users = data.roadtrip.users.map(user => user.username);
    const individualExpense = data.roadtrip.users.map(user => {
        const oneCost = expenses.filter(expense => expense.username === user).reduce((total, expense) => {return total + expense.cost}, 0);
        return oneCost;
    })

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

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


    return(
    <div className='roadtripCard'>
        <h4>Expenses</h4>
        <DoughnutChart data={individualExpense} labels={users}/>

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
            <button 
                className='submitBtn'
                >
                Add Expense
            </button>
        </Grid> 
    </div>
    );
}

export default Expenses;