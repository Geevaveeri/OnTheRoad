import React, { useRef } from 'react';
import DoughnutChart from '../Chart';

import { useQuery, useMutation } from '@apollo/client';
import { SINGLE_TRIP } from '../../utils/queries';
import { ADD_EXPENSE, DELETE_EXPENSE } from '../../utils/mutations';


const Expenses = () => {
    const ref = useRef();

    return(
    <div>
        <DoughnutChart/>
    </div>
    );
}

export default Expenses;