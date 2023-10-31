import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

function BarsChart(props) {

    var options = {
        responsive: true,
        animation: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                min: 0,
                max: 100
            },
            x: {
                ticks: { color: 'rgba(0, 220, 195)' }
            }
        }
    };

    const arr1 = [];
    const arr2 = [];

    if (props.Type === 1){
        for (let i = 0; i < props.Data.length; i++) {
            arr1.push(props.Data[i].nombre);
            arr2.push(props.Data[i].promedio);
        }
    } else if (props.Type === 2){
        for (let i = 0; i < props.Data.length; i++) {
            arr1.push(props.Data[i].nombre_curso);
            arr2.push(props.Data[i].cantidad);
        }
    } else if (props.Type === 3){
        arr1.push(props.Data.selected)
        arr2.push(props.Data.val)
    } 

    var data = {

        labels: arr1,
        datasets: [
            {
                label: 'Graphs',
                data: arr2,
                backgroundColor: 'rgba(0, 220, 195, 0.5)'
            }
        ]
    };


    return <Bar data={data} options={options} />
}

export default BarsChart;