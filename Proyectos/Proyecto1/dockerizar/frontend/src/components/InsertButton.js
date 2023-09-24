import '../styles/InsertButton.css'

function InsertButton( {Titulo, Pid, SetPID} ) {

    /* Captura el evento del cambio en el componente */
    const handleChange = e => {
        SetPID({
            ...Pid,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        /* Validar campos vacíos */
        if (Pid.pid === ''){
            alert("Debe llenar el campo")
            return
        }

        /* Consulta */
        const requestInit = {
            Method: 'POST',
            Bodyy: JSON.stringify(Pid),
            Header: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
        }

        fetch('http://localhost:8080/get_pid', requestInit)
        .then(res => res.json())
        .then(res => console.log(res))

        /* Reiniciar estado del componente */
        SetPID({
            "pid": ""
        })
    }
    return (
        <div id='insert-button'>
            <label htmlFor='input-text'> { Titulo } </label>
            <input name="pid" onChange={handleChange} className='text-area' id='input-text'>
            </input>
            <button onClick={ handleSubmit } type="submit" className='button-kill'> Kill </button>
        </div> 
    );
}

export default InsertButton;