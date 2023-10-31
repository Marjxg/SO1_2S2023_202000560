import '../styles/DataTable.css'

function DataTable(props) {
    return (
        <div className='DataTable'>
            <h2>Datos almacenados</h2>
            <table>
                <thead>
                    <tr>
                        <th> Carnet </th>
                        <th> Nombre </th>
                        <th> Curso </th>
                        <th> Nota </th>
                        <th> Semestre </th>
                        <th> Año </th>
                    </tr>
                </thead>
                <tbody>
                    {props.Data.map(data => (
                        <tr hey={data.carnet}>
                            <td> {data.carnet} </td>
                            <td> {data.nombre} </td>
                            <td> {data.nombre_curso} </td>
                            <td> {data.nota} </td>
                            <td> {data.semestre} </td>
                            <td> {data.año} </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DataTable;