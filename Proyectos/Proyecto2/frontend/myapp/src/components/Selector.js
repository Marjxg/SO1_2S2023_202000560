import { useState } from 'react';
import BarsChart from './BarsChart';
import '../styles/Selector.css'

function Selector(props) {

    function handleSubmit(e) {

        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const value = Object.fromEntries(formData.entries());
        props.Socket.emit("Selections", JSON.stringify(value))
    }

    const [val, setVal] = useState([])

    props.Socket.on("Students", (data) => {
        setVal(data)
    })

    return (
        <div className='cols'>
            <div className='col1'>
                <form method="POST" onSubmit={handleSubmit}>
                    <div id='list-button'>
                        <select id='course' name='course'>
                            <option value="0" disabled="yes"> Seleccione una opción </option>
                            {props.Courses.map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                        <select id='year' name='year'>
                            <option value="0" disabled="yes"> Seleccione una opción </option>
                            {props.Years.map(a => (
                                <option key={a} value={a}>{a}</option>
                            ))}
                        </select>
                        <select id='semester' name='semester'>
                            <option value="0" disabled="yes"> Seleccione una opción </option>
                            {props.Semesters.map(s => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                        <button type='submit' className='button-submit'> Seleccionar </button>
                    </div>
                </form>
            </div>
            <div className='col2'>
            <h3> Cantidad Estudiantes por Curso</h3>
                <BarsChart
                    Type={3}
                    Data={val} />
            </div>
        </div>

    );

}

export default Selector;