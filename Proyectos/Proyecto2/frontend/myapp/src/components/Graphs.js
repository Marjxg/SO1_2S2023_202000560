import PiesChart from './PiesChart';

function Graphs(props) {

    // GRÁFICA DE PASTEL
    let approved = 0;

    if (props.Data.length > 0) {
        if (Object.keys(props.Data[0]).length > 0) {
            approved = parseInt(props.Data[0].porcentaje_aprobacion);
        }
    }

    var datar = {
        labels: ['% Aprobado', '% Reprobado'],
        datasets: [
            {
                label: 'Porcentaje de aprobación',
                data: [approved, 100 - approved],
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

    return (
        <PiesChart
            Data={datar} />
    );
}

export default Graphs;