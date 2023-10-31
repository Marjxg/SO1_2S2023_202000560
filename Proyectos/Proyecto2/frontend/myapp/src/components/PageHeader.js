import '../styles/PageHeader.css'
import { Outlet, Link } from 'react-router-dom'

function PageHeader() {
    return (
        <header id='main-header'>
            <a id='title-header'>
                <span className='site-name'> PROYECTO 2 </span>
                <span className='course-name'> SISTEMAS OPERATIVOS 1 </span>
            </a>
            <nav>
                <ul>
                    <li> <Link to='/'> Estático </Link> </li>
                    <li> <Link to='/TiempoReal'> Tiempo Real </Link> </li>
                </ul>
            </nav>
            <Outlet/>
        </header>

    );
}

export default PageHeader;