import { useState, useEffect, Fragment } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Graphs from './components/Graphs';
import Reader from './components/Reader';
import PIDtable from './components/PIDtable';
import ListButton from './components/ListButton';
import InsertButton from './components/InsertButton';

function App() {

  // Estado para almacenar las máquinas que estarán en el select 
  const [machine, setMachine] = useState([])

  useEffect(() => {
    const getMachines = () => {
      const requestInit = {
        Method: 'GET',
        Header: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
      }

      fetch('http://34.94.205.206:9000/api', requestInit)
        .then(res => res.json())
        .then(res => setMachine(res))
    }
    getMachines()
  }, [])

  // Estado para almacenar la información de una máquina
  const [data, setData] = useState([])

  // Estado para almacenar los procesos
  const [procesos, setProcesos] = useState([])

  return (
    <Fragment>
      <div className="App">
        <Routes>
          <Route path='/' element={<Reader />}>
            <Route path='historico' element={
              <div className='contenedor'>
                <br/><br/><br/>
                <ListButton
                  Maquinas={machine}
                  Data={data}
                  SetData={setData}
                  Procesos={procesos}
                  SetProcesos={setProcesos} />
                <Graphs
                  Data={data} />
              </div>
            } />
            <Route path='/' element={
              <div className='contenedor'>
                <br/><br/><br/>
                <ListButton
                  Maquinas={machine}
                  Data={data}
                  SetData={setData}
                  Procesos={procesos}
                  SetProcesos={setProcesos} />
                <Graphs
                  Data={data} />
                <InsertButton />
                <PIDtable
                  Procesos={procesos} />
              </div>
            } />
          </Route>
        </Routes>
      </div>
    </Fragment>
  );
}

export default App;
