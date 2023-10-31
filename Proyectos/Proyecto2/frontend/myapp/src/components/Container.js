import '../styles/Container.css'
import BarsChart from './BarsChart';
import Graphs from './Graphs';

function Container(props) {

    function handleSubmit1(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const value = Object.fromEntries(formData.entries());

        // Consulta 
        const requestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(value)
        }

        fetch('http://34.160.168.57/api/approved', requestInit)
            .then(res => res.json())
            .then(res => props.SetApproved(res))
    }

    function handleSubmit2(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const value = Object.fromEntries(formData.entries());

        // Consulta 
        const requestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(value)
        }

        fetch('http://34.160.168.57/api/average', requestInit)
            .then(res => res.json())
            .then(res => props.SetAverage(res))
    }

    function handleSubmit3(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const value = Object.fromEntries(formData.entries());

        // Consulta 
        const requestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(value)
        }

        fetch('http://34.160.168.57/api/mostStudents', requestInit)
            .then(res => res.json())
            .then(res => props.SetMostStudents(res))
    }

    return (
        <div className='columns'>
            <div className='column1'>
                <h2> Porcentaje de aprobación </h2>

                <form method="POST" onSubmit={handleSubmit1}>
                    <div id='list-button'>
                        <select id='course' name='course'>
                            <option value="0" disabled="yes"> Seleccione una opción </option>
                            {props.Courses.map(c => (
                                <option key={c.nombre_curso} value={c.nombre_curso}>{c.nombre_curso}</option>
                            ))}
                        </select>
                        <select id='year' name='year'>
                            <option value="0" disabled="yes"> Seleccione una opción </option>
                            {props.Years.map(a => (
                                <option key={parseInt(a.año)} value={parseInt(a.año)}>{parseInt(a.año)}</option>
                            ))}
                        </select>
                        <select id='semester' name='semester'>
                            <option value="0" disabled="yes"> Seleccione una opción </option>
                            {props.Semesters.map(s => (
                                <option key={s.semestre} value={s.semestre}>{s.semestre}</option>
                            ))}
                        </select>
                        <button type='submit' className='button-submit'> Seleccionar </button>
                    </div>
                </form>
                <Graphs
                    Data={props.Approved} />
            </div>
            <div className='column2'>
                <h2> Mejor Promedio </h2>


                <form method="POST" onSubmit={handleSubmit2}>
                    <div id='list-button'>
                        <select id='year' name='year'>
                            <option value="0" disabled="yes"> Seleccione una opción </option>
                            {props.Years.map(a => (
                                <option key={parseInt(a.año)} value={parseInt(a.año)}>{parseInt(a.año)}</option>
                            ))}
                        </select>
                        <select id='semester' name='semester'>
                            <option value="0" disabled="yes"> Seleccione una opción </option>
                            {props.Semesters.map(s => (
                                <option key={s.semestre} value={s.semestre}>{s.semestre}</option>
                            ))}
                        </select>
                        <button type='submit' className='button-submit'> Seleccionar </button>
                    </div>
                </form>

                <BarsChart
                    Data={props.Average}
                    Type={1} />

            </div>
            <div className='column3'>
                <h2> Cantidad Estudiantes </h2>

                <form method="POST" onSubmit={handleSubmit3}>
                    <div id='list-button'>
                        <select id='year' name='year'>
                            <option value="0" disabled="yes"> Seleccione una opción </option>
                            {props.Years.map(a => (
                                <option key={parseInt(a.año)} value={parseInt(a.año)}>{parseInt(a.año)}</option>
                            ))}
                        </select>
                        <select id='semester' name='semester'>
                            <option value="0" disabled="yes"> Seleccione una opción </option>
                            {props.Semesters.map(s => (
                                <option key={s.semestre} value={s.semestre}>{s.semestre}</option>
                            ))}
                        </select>
                        <button type='submit' className='button-submit'> Seleccionar </button>
                    </div>
                </form>

                <BarsChart
                    Data={props.MostStudents}
                    Type={2} />

            </div>
        </div>);

}
export default Container;