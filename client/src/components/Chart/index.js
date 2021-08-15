import React from 'react';
import { Doughnut } from 'react-chartjs-2'

const DoughnutChart = () => {
    return (
        <div>
            <Doughnut 
                data={{
                    labels: ['Sharni', 'Kota', 'Casey', 'Michelle'],
                    datasets: [
                        {
                          label: '$$ spent',
                          data: [12, 19, 3, 5],
                          backgroundColor: [
                            'rgba(255, 99, 132)',
                            'rgba(54, 162, 235)',
                            'rgba(255, 206, 86)',
                            'rgba(75, 192, 192)',
                            'rgba(153, 102, 255)',
                            'rgba(255, 159, 64)',
                          ],
                          borderWidth: 1,
                        },
                      ],
                }}
                height={200}
                width={200}
                />
        </div>
    )
}

export default DoughnutChart;