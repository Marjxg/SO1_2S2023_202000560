import '../styles/Graphs.css';
import PiesChart from './PiesChart';

function Graphs( props ) {
    let ram = 0;
    let cpu = 0;
    
    if (props.Data.length > 0){
        if (Object.keys(props.Data[0]).length > 0){
            ram = parseInt(props.Data[0].ram);
            cpu = parseInt(props.Data[0].cpu);
        }
    }

    var datar = {
        labels: ['% Usado', '% No usado'],
        datasets: [
            {
                label: 'Porcentaje de uso',
                data: [ram, 100-ram],
                backgroundColor: [
                    'rgba(120, 120, 120, 1)',
                    'rgba(210, 210, 210, 1)',
                ],
                borderColor: [
                    'rgba(120, 120, 120, 1)',
                    'rgba(210, 210, 210, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    var datac = {
        labels: ['% Usado', '% No usado'],
        datasets: [
            {
                label: 'Porcentaje de uso',
                data: [cpu, 100-cpu],
                backgroundColor: [
                    'rgba(120, 120, 120, 1)',
                    'rgba(210, 210, 210, 1)',
                ],
                borderColor: [
                    'rgba(120, 120, 120, 1)',
                    'rgba(210, 210, 210, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return(
        <div className='columns'>
            <div className='column1'>
                <h2> Memoria RAM </h2>
                <PiesChart
                Data={datar}/>
            </div>
            <div className='column2'>
                <h2> CPU </h2>
                <PiesChart
                Data={datac}/>
            </div>
        </div>
    );
}

export default Graphs;