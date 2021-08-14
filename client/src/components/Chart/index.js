import React from 'react';
import { Doughnut } from 'react-chartjs-2'

const DoughnutChart = () => {
    return (
        <div>
            <h4>Expenses</h4>
            <Doughnut 
                data={{
                    labels: ['Sharni', 'Kota', 'Casey', 'Michelle'],
                    datasets: [
                        {
                          label: '$$ Contributed',
                          data: [12, 19, 3, 5],
                          backgroundColor: [
                            'rgba(255, 99, 132)',
                            'rgba(54, 162, 235)',
                            'rgba(255, 206, 86)',
                            'rgba(75, 192, 192)'
                          ],
                     
                          borderWidth: 1,
                        },
                      ],
                }}
                height={400}
                width={400}
                />
                <ul>
                    {/*place list of expenses here with users and comments*/}
                </ul>
        </div>
    )
}

export default DoughnutChart;