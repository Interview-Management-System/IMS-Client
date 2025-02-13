import {
    ArcElement,
    BarElement,
    CategoryScale,
    ChartData,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip
} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { Col, Row } from 'react-bootstrap'
import { Bar, Line, Pie } from 'react-chartjs-2'

ChartJS.register(Tooltip, Legend, ChartDataLabels, Filler, CategoryScale, LinearScale) // chart options
ChartJS.register(PointElement, ArcElement, BarElement, LineElement) // Chart name register

function DashboardComponnet() {
    const lineChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                tension: 0.1,
                fill: true,
                pointRadius: 4,
                borderColor: '#3498db',
                backgroundColor: 'rgba(104, 142, 255, 0.3)',
                pointBackgroundColor: 'rgba(66, 159, 235, 0.98)',
                data: [0, 10000, 15000, 10000, 20000, 11000, 14000, 14300, 21000, 24000, 10000, 20333]
            }
        ]
    } as ChartData<'line', number[], string>

    const pieChartData = {
        labels: ['Passed', 'Failed'],
        datasets: [
            {
                data: [400, 300],
                backgroundColor: ['rgba(54, 185, 204,1)', 'rgba(231, 74, 59, 1)']
            }
        ]
    } as ChartData<'pie', number[], string>

    const options1 = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            datalabels: {
                color: 'white',
                font: {
                    size: 19,
                    weight: 'bolder'
                },
                formatter: (value: number, context: any) => {
                    const total = context.dataset.data.reduce((acc: number, val: number) => acc + val, 0)
                    const percentage = ((value / total) * 100).toFixed(1)
                    return `${percentage}%` // Display as percentage
                }
            },
            title: {
                font: {
                    size: 50, // Make title larger
                    weight: 'bolder'
                }
            }
        }
    }

    const barCharData = {
        labels: ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'], // X-axis labels
        datasets: [
            {
                label: 'Earnings', // Label for the bars
                data: [12000, 19000, 15000, 22000, 30000, 25000], // Y-axis data
                backgroundColor: 'rgba(34, 137, 205, 0.7)', // Blue color for bars
                borderColor: 'rgba(52, 152, 219, 1)', // Darker blue border
                borderWidth: 1 // Border width
            }
        ]
    } as ChartData<'bar', (number | [number, number] | null)[], unknown>

    return (
        <>
            <Row>
                <Col xl={8} lg={7} className='d-flex flex-column'>
                    <div className='card shadow mb-3 flex-grow-1'>
                        <div className='card-header py-3'>
                            <h6 className='m-0 font-weight-bold text-primary'>
                                Candidates employeed in year ...
                            </h6>
                        </div>

                        <div className='card-body flex-grow-1'>
                            <Line
                                data={lineChartData}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            display: false
                                        },
                                        tooltip: {
                                            mode: 'index',
                                            intersect: false,
                                            callbacks: {
                                                label: context =>
                                                    `Month ${context.label}: $${context.formattedValue}`
                                            }
                                        }
                                    },
                                    interaction: {
                                        mode: 'index',
                                        intersect: false
                                    },
                                    elements: {
                                        line: {
                                            tension: 0.4 // Smooth curve
                                        },
                                        point: {
                                            radius: 4
                                        }
                                    },
                                    scales: {
                                        y: {
                                            ticks: {
                                                stepSize: 5000, // Controls the gap between Y-axis labels
                                                callback: value => `$${value.toLocaleString()}` // Format as currency
                                            },
                                            min: 0, // Set minimum value
                                            max: 30000 // Set maximum value
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div>
                </Col>

                <Col xl={4} lg={5} className='d-flex flex-column'>
                    <div className='card shadow mb-3 flex-grow-1'>
                        <div className='card-header py-3'>
                            <h6 className='m-0 font-weight-bold text-primary'>
                                Passed and failed candidates
                            </h6>
                        </div>

                        <div className='card-body flex-grow-1'>
                            <Pie data={pieChartData} options={options1 as any} />
                        </div>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col xl={8} lg={7} className='d-flex flex-column'>
                    <div className='card shadow mb-3 flex-grow-1'>
                        <div className='card-header py-3'>
                            <h6 className='m-0 font-weight-bold text-primary'>
                                Candidates employeed in year ...
                            </h6>
                        </div>

                        <div className='card-body flex-grow-1'>
                            <Bar
                                data={barCharData}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            display: false // Hide the legend
                                        },
                                        title: {
                                            display: true,
                                            text: 'Bar Chart', // Chart title
                                            font: {
                                                size: 20,
                                                weight: 'bold'
                                            }
                                        },
                                        tooltip: {
                                            callbacks: {
                                                label: context => {
                                                    const label = context.dataset.label || ''
                                                    const value = context.formattedValue
                                                    return `${context.label}: ${value}` // Show label and value
                                                }
                                            }
                                        }
                                    },
                                    scales: {
                                        x: {
                                            grid: {
                                                display: false // Hide x-axis gridlines
                                            },
                                            ticks: {
                                                font: {
                                                    size: 12 // Smaller x-axis tick font size
                                                }
                                            }
                                        },
                                        y: {
                                            beginAtZero: true,
                                            ticks: {
                                                callback: value => {
                                                    return '$' + value
                                                },
                                                stepSize: 5000, // Step size for y-axis ticks
                                                font: {
                                                    size: 12 // Smaller y-axis tick font size
                                                }
                                            }
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default DashboardComponnet
