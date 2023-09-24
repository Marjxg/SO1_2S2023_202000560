import '../styles/ListButton.css'

function ListButton ( props ) {

    function handleSubmit(e) {
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

        fetch('http://34.94.205.206:9000/api/machine', requestInit)
        .then(res => res.json())
        .then(res => props.SetData(res))

        fetch('http://34.94.205.206:9000/api/process', requestInit)
        .then(res => res.json())
        .then(res => props.SetProcesos(res))
    }

    return (
        <form method="POST" onSubmit={handleSubmit}>
        <div id='list-button'>
            <select id='choices' name='choices'>
            <option value="0" disabled="yes"> Seleccione una opción </option>
            { props.Maquinas.map( maquina => (
                <option key={maquina.nombre_maquina} value={maquina.nombre_maquina}>{maquina.nombre_maquina}</option>
            ))}
            </select>
            <button type='submit' className='button-select'> Seleccionar </button>
        </div> 
        </form>
    );
}

export default ListButton;