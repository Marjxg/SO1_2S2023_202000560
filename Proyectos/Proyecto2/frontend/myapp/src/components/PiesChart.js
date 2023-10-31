import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

var options = {
    responsive : false,
    maintainAspectRatio: false,
};

export default function Pies( props ) {
    return <Pie data={props.Data} options={options}/>
}