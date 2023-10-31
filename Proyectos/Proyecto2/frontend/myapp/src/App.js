import { useState, useEffect, Fragment } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import PageHeader from './components/PageHeader';
import DataTable from './components/DataTable';
import Container from './components/Container';
import io from "socket.io-client"
import Selector from './components/Selector';

const socketio = io('http://localhost:9000');

function App() {
  

  // Estado para almacenar los datos que estarán en la tabla
  const [scores, setScores] = useState([])
  const [courses, setCourses] = useState([])
  const [years, setYears] = useState([])
  const [semesters, setSemesters] = useState([])
  const [average, setAverage] = useState([])
  const [mostStudents, setMostStudents] = useState([])
  const [approved, setApproved] = useState([])
  const [quantity, setQuantity] = useState([])
  const [allCourses, setAllC] = useState([])
  const [allYears, setAllY] = useState([])
  const [allSemesters, setAllS] = useState([])

  useEffect(() => {
    socketio.on('quantity', (data) =>{
      setQuantity(data);
    });
    socketio.on('allCourses', (data) =>{
      setAllC(data);
    });
    socketio.on('allYears', (data) =>{
      setAllY(data);
    });
    socketio.on('allSemesters', (data) =>{
      setAllS(data);
    });
  }, []);

  useEffect(() => {
    const getScores = async () => {
      const requestInit = {
        Method: 'GET', //Podría de method con minúscula
        Headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' } //podría ser headers con minúscula
      }
  
      try {
        const response = await fetch('http://34.160.168.57/api/getData', requestInit);
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        setScores(data);
      } catch (error) {
        console.error('No se pudo obtener la data:', error);
      }
    }

    const getCourses = async () => {
      const requestInit = {
        Method: 'GET', //Podría de method con minúscula
        Headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' } //podría ser headers con minúscula
      }
  
      try {
        const response = await fetch('http://34.160.168.57/api/getCourses', requestInit);
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('No se pudo obtener la data:', error);
      }
    }

    const getYears = async () => {
      const requestInit = {
        Method: 'GET', //Podría de method con minúscula
        Headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' } //podría ser headers con minúscula
      }
  
      try {
        const response = await fetch('http://34.160.168.57/api/getYears', requestInit);
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        setYears(data);
      } catch (error) {
        console.error('No se pudo obtener la data:', error);
      }
    }

    const getSemesters = async () => {
      const requestInit = {
        Method: 'GET', //Podría de method con minúscula
        Headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' } //podría ser headers con minúscula
      }
  
      try {
        const response = await fetch('http://34.160.168.57/api/getSemesters', requestInit);
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        setSemesters(data);
      } catch (error) {
        console.error('No se pudo obtener la data:', error);
      }
    }

    getScores();
    getCourses();
    getYears();
    getSemesters();
  }, []);

  return (
    <Fragment>
      <div className="App">
        <Routes>
          <Route path='/' element={<PageHeader />}>
            <Route path='TiempoReal' element={
              <div className='contenedor'>
                <br /><br /><br />

                <h3>
                  Cantidad de datos:
                </h3>
                <h2> {quantity} registros </h2>
                <Selector
                Courses={allCourses}
                Years={allYears}
                Semesters={allSemesters}
                Socket={socketio}/>
              </div>
            } />
            <Route path='/' element={
              <div className='contenedor'>
                <br /><br /><br />
                <DataTable
                  Data={scores} />
                <Container
                  Courses = {courses}
                  Years = {years}
                  Semesters = {semesters} 
                  SetAverage = {setAverage}
                  SetMostStudents = {setMostStudents}
                  SetApproved = {setApproved}
                  Average = {average}
                  Approved = {approved}
                  MostStudents = {mostStudents}/>
              </div>
            } />
          </Route>
        </Routes>
      </div>
    </Fragment>
  );
}

export default App;