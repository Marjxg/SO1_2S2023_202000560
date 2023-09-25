Marjorie Gissell Reyes Franco

Carné: 202000560

Proyecto 1 - Laboratorio de Sistemas Operativos 1

# Base de datos
Se utilizó el lenguaje MySQL para crear la base de datos. Primero se creó un script para la creación de la base de datos, de las tablas y las claves foráneas. Luego, se creó un Dockerfile para elaborar la imagen en base al script y a la imagen MySQL.
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

## Docker Compose
```
FROM mysql:5.7
COPY ./db-script.sql /docker-entrypoint-initdb.d/
```

# Docker Compose
Se realizó un login a la cuenta de Docker HUB para realizar un push de las imaǵenes creadas. Dentro de la MV en GCP se instaló docker engine y docker compose para realizar un docker pull de las imágenes.

![imagen](https://github.com/Marjxg/SO1_2S2023_202000560/assets/78390305/b46b7775-330b-434d-92a6-409347646050)
![imagen](https://github.com/Marjxg/SO1_2S2023_202000560/assets/78390305/5ced7a7c-4b9c-477a-a679-8d18b142f754)


Dentro de la MV se realizó un archivo .yml para realizar el docker compose de los 3 servicios (Node JS, React y MySQL).

![imagen](https://github.com/Marjxg/SO1_2S2023_202000560/assets/78390305/b52ef5b3-f38a-4e86-9791-bbf90c2e7079)


# Google Cloud Platform
