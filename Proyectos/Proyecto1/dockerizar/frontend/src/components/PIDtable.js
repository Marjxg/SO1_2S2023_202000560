import '../styles/PIDtable.css'

function PIDtable(props) {
    return (
        <div className='pidTable'>
            <table>
                <thead>
                    <tr>
                        <th> PID </th>
                        <th> Nombre </th>
                        <th> Usuario </th>
                        <th> Estado </th>
                        <th> % RAM </th>
                    </tr>
                </thead>
                <tbody>
                    {props.Procesos.map(proceso => (
                        <tr hey={proceso.pid}>
                            <td> {proceso.pid} </td>
                            <td> {proceso.nombre_p} </td>
                            <td> {proceso.usuario_p} </td>
                            <td> {proceso.estado_p} </td>
                            <td> {proceso.ram_p} </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PIDtable;