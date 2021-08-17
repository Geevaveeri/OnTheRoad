import React from 'react';
import { Doughnut } from 'react-chartjs-2'

const DoughnutChart = ({ data, labels }) => {
    return (
        <div>
            <Doughnut 
                data={{
                    labels: labels,
                    datasets: [
                        {
                          label: '$$ spent',
                          data: data,
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