import '../styles/Reader.css'
import { Outlet, Link } from 'react-router-dom'

function Reader() {
    return (
        <header id='main-header'>
            <a id='title-header'>
                <span className='site-name'> PROYECTO 1 </span>
                <span className='course-name'> SISTEMAS OPERATIVOS 1 </span>
            </a>
            <nav>
                <ul>
                    <li> <Link to='/'> Tiempo real </Link> </li>
                    <li> <Link to='/historico'> Histórico </Link> </li>
                </ul>
            </nav>
            <Outlet/>
        </header>

    );
}

export default Reader;