Marjorie Gissell Reyes Franco

Carné: 202000560

Proyecto 1 - Laboratorio de Sistemas Operativos 1

# Base de datos
Se utilizó el lenguaje MySQL para la persistencia de la información de las máquinas monitoreadas, esta base de datos recolecta porcentajes de uso de RAM y CPU, así como información clave de procesos, la información la provee el backend en Node JS.

Primero, se creó un script tanto para la creación de la base de datos, como de las tablas y las claves foráneas. Luego, se creó un Dockerfile para elaborar la imagen en base al script y a la imagen MySQL, finalmente se agregó la imagen como servicio al Docker-Compose.
## Tablas
### Tabla máquina:
**Campos**
* Nombre Máquina
* IP
* Llave foránea a porcentajes

### Tabla porcentaje:
**Campos**
* % RAM utilizado
* % CPU utilizado

### Tabla proceso:
**Campos**
* PID
* Nombre del proceso
* Usuario que ejecutó el proceso
* Estado del proceso
* % RAM del proceso
* Llave foránea al proceso

## Modelo de base de datos
![image](https://github.com/Marjxg/SO1_2S2023_202000560/assets/78390305/7580dfe9-5cba-4b3d-95b8-9de95e0c3d8c)


## Dockerfile
```
FROM mysql:5.7
COPY ./db-script.sql /docker-entrypoint-initdb.d/
```

# Node JS - Backend
## Creación
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
* http://backend/api/:9000: Realiza SELECT QUERY de las máquinas existentes en la base de datos
* http://backend/api/modules:9000: Realizar un INSERT QUERY con información de las máquinas
* http://backend/api/procesess:9000: Realizar un INSERT QUERY con información de los procesos
* http://backend/api/machine:9000: Realizar un SELECT QUERY para obtener información de porcentajes
* http://backend/api/process:9000:  Realizar un SELECT QUERY para obtener información de procesos
## Dockerfile
Se utilizó un dockerfile para crear la imagen del backend en Node JS para luego utilizar esta imagen como servicio dentro de docker-compose
```
FROM node:18
WORKDIR /myapp
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "run", "start"]
```

# React - Frontend
## Vista principal
![image](https://github.com/Marjxg/SO1_2S2023_202000560/assets/78390305/f7dcf118-82c4-4275-8603-8ecdbaf645fc)

## Vista funcional
![image](https://github.com/Marjxg/SO1_2S2023_202000560/assets/78390305/d0b4cfcc-a755-459e-979d-cb9894673fe6)

## Creación
```
npx create-react-app my-app //Crear react app
```
### Componentes utilizados
* Reader -> Encabezado de página
* ListButton -> que contiene el select para listar las máquinas existentes y un botón para seleccionarla
* Graphs -> para mostrar las gráficas por medio de la librería Chart JS
* InsertButton -> contiene el Insert para ingresar el PID y un botón para seleccionarlo
* PIDtable-> para listar en una tabla los procesos de la máquina

### Variables de estado
* machine -> almacena todas las máquinas recolectadas
* data -> almacena porcentajes de uso de una sola máquina
* procesos -> almacena los procesos de una sola máquina

### Sincronización de componentes
Se utilizó el hook useEffect de react para sincronizar el componente Select con los nombres de las máquinas que provee el servidor.

### Gráficas
Se utilizó la librería Chart JS para la elaboración de gráficas.
```
yarn add chart.js react-chartjs-2
```

### Handle Machine Submit
Se utiliza para manejar el fetch hacia la API encargada de validar el nombre de la máquina y retornar información sobre ella.
Se utiliza el método POST y el nombre de la máquina en formato JSON como cuerpo.

### Handle Input Change
Captura el evento del cambio en el componente. Es decir, captura lo que se ingresa o se elimina del componente input en el que se ingresa un PID.

### Handle Submit 
Se utiliza para manejar el fetch hacia la API encargada de buscar el proceso con dicho PID. 
Se utiliza el método POST y el PID del proceso ingresado por el usuario en formato JSON como cuerpo.

### Correr la app
```
npm start
```
## Dockerfile
Se utilizó un dockerfile para crear la imagen del frontend en React para luego utilizar esta imagen como servicio dentro de docker-compose
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

  
# Docker Compose
Se realizó un login a la cuenta de Docker HUB para realizar un push de las imaǵenes creadas. Dentro de la MV en GCP se instaló docker engine y docker compose para realizar un docker pull de las imágenes.

![imagen](https://github.com/Marjxg/SO1_2S2023_202000560/assets/78390305/b46b7775-330b-434d-92a6-409347646050)

Dentro del docker compose se definió un volumen para la persistencia de información de la base de datos

![imagen](https://github.com/Marjxg/SO1_2S2023_202000560/assets/78390305/5ced7a7c-4b9c-477a-a679-8d18b142f754)


Dentro de la MV se realizó un archivo .yml para realizar el docker compose de los 3 servicios (Node JS, React y MySQL).

![imagen](https://github.com/Marjxg/SO1_2S2023_202000560/assets/78390305/b52ef5b3-f38a-4e86-9791-bbf90c2e7079)

# Modulos
Un módulo de Kernel es un archivo con extensión .ko que se almacenan en la ubicación /lib/modules/versión_del_kernel, este contiene código objeto que se extiene hasta el núcleo del Siste Operativo. En este caso los módulos RAM y CPU son programas que recolectan información de la máquina basados en los procesos en ejecución.
Para la creación de módulos Kernel se requirió del uso de C y Make, asimismo es importante resaltar el uso de linux-headers-5.15.0-1042-gcp.
## Makefile
Se utilizó la herramienta make para automatizar la creación de ejecutables y la compilación de los mismos, los comandos utilizados fueron los siguientes:
```
make all //Para compilar
make clean //Para borrar archivos compilados
```
## Modulo RAM
Recolecta el porcentaje de RAM utilizado por la máquina.
```
insmod ram.c //Para insertar el módulo RAM
rmmod ram.c //Para borrar el módulo RAM
```
![image](https://github.com/Marjxg/SO1_2S2023_202000560/assets/78390305/bf1f5d79-d7a4-4c57-8bec-c1f0b281fdfb)

## Modulo CPU
Recolecta el porcentaje de CPU utilizado por la máquina, así como información clave sobre los procesos de la máquina.
```
insmod cpu.c //Para insertar el módulo CPU
rmmod cpu.c //Para borrar el módulo CPU
```
![image](https://github.com/Marjxg/SO1_2S2023_202000560/assets/78390305/7c5e7cf0-df9c-46e3-b5e5-fc87c8456bfa)

### Posibles problemas con headers
```
sudo apt update && sudo apt upgrade
sudo apt remove --purge linux-headers-*
sudo apt autoremove && sudo apt autoclean
sudo apt install linux-headers-generic
sudo apt install linux-headers-5.15.0-1042-gcp
```

# Google Cloud Platform
