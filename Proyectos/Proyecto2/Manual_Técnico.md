# Manual Técnico

## Base de datoss Redis
Se utilizó Redis para la persistencia de la información de las calificaciones, esta base de datos recolecta notas, nombres, cursos, semestres y años, la información la provee una API en PYthon.
Algunos comandos útiles:
~~~
dbsize //Para obtener el tamaño de la base de datos
flushall //Para borrar la base de datos
set(campo, clave)
keys *
~~~
## Base de datos MySQL
Se utilizó el lenguaje MySQL para la persistencia de la información de las calificaciones, esta base de datos recolecta notas, nombres, cursos, semestres y años, la información la provee una API en PYthon.

Primero, se creó un script tanto para la creación de la base de datos, como de las tablas y las claves foráneas. 
### Tabla alumno:
**Campos**
* Nombre Alumno
* Carnet

### Tabla calificaciones:
**Campos**
* Curso
* Nota
* Año
* Semestre
* Carnet

## Node JS - Backend
### Creación
Crear un proyecto npm e instalar la librería express
```
npm init -y
npm install express
```
Para manejar cambios sin tener que reiniciar el servidor se utilizó nodemon
```
npm install nodemon --save-dev
```
Dentro de script, en package.json agregar lo siguiente:
```
"start":"nodemon server.js"
"main":"server.js"
```
Comando para correr
```
npm run start
```
Para la conexión con la base de datos
```
npm i mysql express-myconnection
```
En el archivo server.js se estableció el puerto 9000, la conexión con la base de datos, un acceso libre de intercambio de recursos de origen cruzado CORS y una ruta principal para comprobar el correcto funcionamiento del servidor.
En el archivo routes.js se establecieron las siguientes rutas:
GET http://34.160.168.57/api/getData -> Para retornar toda la calificaciones
GET http://34.160.168.57/api/getCourses -> Para retornar todos los cursos
GET http://34.160.168.57/api/getYears -> Para retornar todos los años
GET http://34.160.168.57/api/getSemesters -> Para retornar todos los semestres

### Dockerfile
Se utilizó un dockerfile para crear la imagen del backend en Node JS para luego utilizar esta imagen como servicio dentro de kubernetes
```
FROM node:18
WORKDIR /myapp
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "run", "start"]
```

## React - Frontend
### Vista funcional
![Captura de pantalla de 2023-10-31 18-22-48](https://github.com/Marjxg/SO1_2S2023_202000560/assets/78390305/dffb731f-3a43-4fbe-8a16-b7413827da6b)
![Captura de pantalla de 2023-10-31 18-31-57](https://github.com/Marjxg/SO1_2S2023_202000560/assets/78390305/3ed8f3ae-aaf3-46e5-bc04-243a2f37aca8)
![Captura de pantalla de 2023-10-31 18-32-18](https://github.com/Marjxg/SO1_2S2023_202000560/assets/78390305/b5a2d447-1c7c-4edb-9927-c0f1ad39e90e)

### Creación
```
npx create-react-app my-app //Crear react app
```
### Componentes utilizados
* BarsChart -> Para crear la gráfica de barras
* PiesChart -> Para crear la gráfica de pastel
* Graphs -> Para instanciar las gráficas
* PageHeader -> Para el header de la página
* DataTable -> Para crear la tabla con la información de la base de datos
* Container -> Para estructurar las columnas
* Selector -> Para los selects de información y los botones

### Variables de estado
* scores -> almacenan todas las notas
* courses -> almacenan todos los cursos
* years -> almacenan todos los años
* semesters -> almacenan todos los semestres
* average -> almacen los mejores promedio
* mostStudents -> almacena los cursos con más estudiantes
* approved -> almacena el porcentaje de aprobación

### Sincronización de componentes
Se utilizó el hook useEffect de react para sincronizar el componente Select con los nombres de los cursos, semestres y años que provee el servidor.

### Gráficas
Se utilizó la librería Chart JS para la elaboración de gráficas.
```
yarn add chart.js react-chartjs-2
```

### Handle Submit 
Se utiliza para manejar el fetch hacia la API encargada de buscar toda la información.
Se utiliza el método POST y el curso, año y semestre ingresado por el usuario en formato JSON como cuerpo.

### Correr la app
```
npm start
```
### Dockerfile
Se utilizó un dockerfile para crear la imagen del frontend en React para luego utilizar esta imagen como servicio dentro de kubernetes
```
FROM node:20.6.0
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

